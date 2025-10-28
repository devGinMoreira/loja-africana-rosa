// Simple Test Server for API Testing
// This demonstrates the API endpoints without requiring full NestJS compilation

const http = require('http');
const url = require('url');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'test-secret-key-for-development-only-change-in-production';

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
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // Health Check
    if (pathname === '/api/health' && method === 'GET') {
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
    if (pathname === '/api/auth/login' && method === 'POST') {
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
    if (pathname === '/api/products' && method === 'GET') {
      const query = parsedUrl.query;
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
    if (pathname === '/api/products/featured' && method === 'GET') {
      const products = await prisma.product.findMany({
        where: { isFeatured: true },
        take: 6,
      });
      sendJSON(res, 200, products);
      return;
    }

    // Get Top Sellers
    if (pathname === '/api/products/top-sellers' && method === 'GET') {
      const products = await prisma.product.findMany({
        where: { isTopSeller: true },
        take: 6,
      });
      sendJSON(res, 200, products);
      return;
    }

    // Get Categories
    if (pathname === '/api/products/categories' && method === 'GET') {
      const products = await prisma.product.findMany({
        distinct: ['category'],
        select: { category: true },
      });
      sendJSON(res, 200, products.map((p) => p.category));
      return;
    }

    // Get Users (requires auth)
    if (pathname === '/api/users' && method === 'GET') {
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
    if (pathname === '/api/cart' && method === 'GET') {
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
    if (pathname === '/api/orders' && method === 'GET') {
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

const PORT = 3004;
server.listen(PORT, () => {
  console.log('\n' + '='.repeat(80));
  console.log('TEST API SERVER');
  console.log('='.repeat(80));
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📚 Test credentials:`);
  console.log(`   Admin: admin@loja-africana.com / Admin123!@`);
  console.log(`   Customer: customer@example.com / Customer123!@`);
  console.log(`\n📝 Run tests with: node api-test.js\n`);
});

process.on('SIGINT', async () => {
  console.log('\n\nShutting down...');
  await prisma.$disconnect();
  process.exit(0);
});
