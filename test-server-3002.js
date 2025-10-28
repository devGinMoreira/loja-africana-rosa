const http = require('http');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'test-secret-key';

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Helper to send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Simple middleware to verify token
function verifyToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  try {
    const token = authHeader.slice(7);
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // Health Check
    if (req.url === '/api/health' && req.method === 'GET') {
      sendJSON(res, 200, {
        status: 'OK',
        timestamp: Date.now(),
        uptime: process.uptime(),
        environment: 'test',
        version: '1.0.0',
      });
      return;
    }

    // Login
    if (req.url === '/api/auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!user) {
        sendJSON(res, 401, { statusCode: 401, message: 'Invalid credentials' });
        return;
      }

      const passwordValid = await bcrypt.compare(body.password, user.password);
      if (!passwordValid) {
        sendJSON(res, 401, { statusCode: 401, message: 'Invalid credentials' });
        return;
      }

      const accessToken = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: '24h',
      });

      sendJSON(res, 200, {
        accessToken,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
      return;
    }

    // Get Products
    if (req.url.startsWith('/api/products') && req.method === 'GET') {
      const queryMatch = req.url.match(/\?(.+)/);
      const query = {};
      if (queryMatch) {
        queryMatch[1].split('&').forEach((pair) => {
          const [key, val] = pair.split('=');
          query[key] = decodeURIComponent(val);
        });
      }

      const where = {};
      if (query.category) where.category = query.category;
      if (query.search) {
        where.OR = [
          { name: { contains: query.search, mode: 'insensitive' } },
          { description: { contains: query.search, mode: 'insensitive' } },
        ];
      }

      const limit = parseInt(query.limit || '10');
      const page = parseInt(query.page || '1');
      const skip = (page - 1) * limit;

      const products = await prisma.product.findMany({
        where,
        skip,
        take: limit,
      });

      const total = await prisma.product.count({ where });

      sendJSON(res, 200, {
        data: products,
        pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      });
      return;
    }

    // Get Featured Products
    if (req.url === '/api/products/featured' && req.method === 'GET') {
      const products = await prisma.product.findMany({
        where: { isFeatured: true },
        take: 6,
      });
      sendJSON(res, 200, products);
      return;
    }

    // Get Top Sellers
    if (req.url === '/api/products/top-sellers' && req.method === 'GET') {
      const products = await prisma.product.findMany({
        where: { isTopSeller: true },
        take: 6,
      });
      sendJSON(res, 200, products);
      return;
    }

    // Get Categories
    if (req.url === '/api/products/categories' && req.method === 'GET') {
      const products = await prisma.product.findMany({
        distinct: ['category'],
        select: { category: true },
      });
      sendJSON(res, 200, products.map((p) => p.category));
      return;
    }

    // Get Users (requires auth)
    if (req.url === '/api/users' && req.method === 'GET') {
      const user = verifyToken(req);
      if (!user) {
        sendJSON(res, 401, { statusCode: 401, message: 'Unauthorized' });
        return;
      }

      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      });
      sendJSON(res, 200, users);
      return;
    }

    // Get Cart (requires auth)
    if (req.url === '/api/cart' && req.method === 'GET') {
      const user = verifyToken(req);
      if (!user) {
        sendJSON(res, 401, { statusCode: 401, message: 'Unauthorized' });
        return;
      }

      let cart = await prisma.cart.findUnique({
        where: { userId: user.sub },
        include: { items: { include: { product: true } } },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId: user.sub },
          include: { items: { include: { product: true } } },
        });
      }

      const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      sendJSON(res, 200, { ...cart, subtotal, itemCount: cart.items.length });
      return;
    }

    // Get Orders (requires auth)
    if (req.url === '/api/orders' && req.method === 'GET') {
      const user = verifyToken(req);
      if (!user) {
        sendJSON(res, 401, { statusCode: 401, message: 'Unauthorized' });
        return;
      }

      const orders = await prisma.order.findMany({
        where: { userId: user.sub },
        include: { items: { include: { product: true } } },
      });
      sendJSON(res, 200, orders);
      return;
    }

    // 404
    sendJSON(res, 404, { statusCode: 404, message: 'Not Found' });
  } catch (error) {
    console.error('Server error:', error);
    sendJSON(res, 500, { statusCode: 500, message: 'Internal Server Error', error: error.message });
  }
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log('\nTEST API SERVER');
  console.log('='.repeat(50));
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Endpoint: http://localhost:${PORT}/api/health`);
});

process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await prisma.$disconnect();
  process.exit(0);
});
