const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const startTime = Date.now();

// Mock products database
const mockProducts = [
  {
    id: '1',
    name: 'Arroz Africano Premium',
    categoryId: 'mercearia',
    price: 12.99,
    originalPrice: 15.99,
    discount: 18,
    isPromotion: true,
    image: 'https://via.placeholder.com/300x300?text=Arroz',
    description: 'Arroz de alta qualidade proveniente de Moçambique. Perfeito para pratos tradicionais africanos.',
    stock: 50,
    inStock: true,
    rating: 4.5,
    reviews: 23,
    sku: 'ARR-001',
    isTopSeller: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Peixe Fresco Salgado',
    categoryId: 'peixaria',
    price: 18.50,
    image: 'https://via.placeholder.com/300x300?text=Peixe',
    description: 'Peixe fresco salgado, importado diariamente. Ingrediente essencial na culinária africana.',
    stock: 30,
    inStock: true,
    rating: 4.8,
    reviews: 45,
    sku: 'PEI-001',
    isTopSeller: false,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Carne de Cabra Premium',
    categoryId: 'talho',
    price: 22.99,
    originalPrice: 24.99,
    discount: 8,
    isPromotion: true,
    image: 'https://via.placeholder.com/300x300?text=Carne',
    description: 'Carne de cabra de primeira qualidade, ideal para churrasco e receitas tradicionais.',
    stock: 20,
    inStock: true,
    rating: 4.7,
    reviews: 34,
    sku: 'CAR-001',
    isTopSeller: true,
    isFeatured: false
  },
  {
    id: '4',
    name: 'Óleo de Palma Orgânico',
    categoryId: 'mercearia',
    price: 16.75,
    image: 'https://via.placeholder.com/300x300?text=Óleo',
    description: 'Óleo de palma orgânico, essencial na gastronomia africana. Pressão a frio.',
    stock: 40,
    inStock: true,
    rating: 4.6,
    reviews: 28,
    sku: 'OLE-001',
    isTopSeller: false,
    isFeatured: true
  },
  {
    id: '5',
    name: 'Manteiga de Karité',
    categoryId: 'cosmeticos',
    price: 14.99,
    originalPrice: 18.99,
    discount: 21,
    isPromotion: true,
    image: 'https://via.placeholder.com/300x300?text=Manteiga',
    description: 'Manteiga de Karité pura, 100% natural. Perfeita para pele e cabelo.',
    stock: 35,
    inStock: true,
    rating: 4.9,
    reviews: 56,
    sku: 'MAN-001',
    isTopSeller: true,
    isFeatured: true
  },
  {
    id: '6',
    name: 'Sal Tradicional Africano',
    categoryId: 'mercearia',
    price: 8.99,
    image: 'https://via.placeholder.com/300x300?text=Sal',
    description: 'Sal marinho colhido tradicionalmente, sem aditivos químicos.',
    stock: 60,
    inStock: true,
    rating: 4.4,
    reviews: 19,
    sku: 'SAL-001',
    isTopSeller: false,
    isFeatured: false
  },
  {
    id: '7',
    name: 'Mel de Flores Selvagens',
    categoryId: 'mercearia',
    price: 24.50,
    image: 'https://via.placeholder.com/300x300?text=Mel',
    description: 'Mel puro de flores selvagens africanas. Propriedades medicinais comprovadas.',
    stock: 25,
    inStock: true,
    rating: 4.8,
    reviews: 41,
    sku: 'MEL-001',
    isTopSeller: true,
    isFeatured: true
  },
  {
    id: '8',
    name: 'Pasta de Amendoim Artesanal',
    categoryId: 'produtosCaboVerde',
    price: 11.99,
    originalPrice: 13.99,
    discount: 14,
    isPromotion: true,
    image: 'https://via.placeholder.com/300x300?text=Amendoim',
    description: 'Pasta de amendoim feita artesanalmente, sem glúten e sem conservantes.',
    stock: 45,
    inStock: true,
    rating: 4.7,
    reviews: 38,
    sku: 'AMA-001',
    isTopSeller: false,
    isFeatured: true
  },
  {
    id: '9',
    name: 'Banana Seca de Cabo Verde',
    categoryId: 'produtosCaboVerde',
    price: 9.99,
    image: 'https://via.placeholder.com/300x300?text=Banana',
    description: 'Banana seca tradicional de Cabo Verde. Snack saudável e energético.',
    stock: 50,
    inStock: true,
    rating: 4.5,
    reviews: 22,
    sku: 'BAN-001',
    isTopSeller: false,
    isFeatured: false
  },
  {
    id: '10',
    name: 'Inhame Fresco',
    categoryId: 'mercearia',
    price: 6.99,
    image: 'https://via.placeholder.com/300x300?text=Inhame',
    description: 'Inhame fresco importado semanalmente. Base essencial da culinária africana.',
    stock: 80,
    inStock: true,
    rating: 4.3,
    reviews: 16,
    sku: 'INH-001',
    isTopSeller: false,
    isFeatured: false
  },
  {
    id: '11',
    name: 'Café Etíope Premium',
    categoryId: 'mercearia',
    price: 28.99,
    originalPrice: 32.99,
    discount: 12,
    isPromotion: true,
    image: 'https://via.placeholder.com/300x300?text=Café',
    description: 'Café premium da Etiópia, berço do café. Moagem fina e aroma intenso.',
    stock: 30,
    inStock: true,
    rating: 4.9,
    reviews: 67,
    sku: 'CAF-001',
    isTopSeller: true,
    isFeatured: true
  },
  {
    id: '12',
    name: 'Couro Artesanal Genuíno',
    categoryId: 'outros',
    price: 35.99,
    image: 'https://via.placeholder.com/300x300?text=Couro',
    description: 'Cintos de couro genuíno confeccionados artesanalmente por artistas locais.',
    stock: 15,
    inStock: true,
    rating: 4.6,
    reviews: 24,
    sku: 'COU-001',
    isTopSeller: false,
    isFeatured: true
  }
];

// Parse query parameters
function parseQueryParams(queryString) {
  const params = {};
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  }
  return params;
}

const requestHandler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Health check
  if (pathname === '/health' && req.method === 'GET') {
    const uptime = (Date.now() - startTime) / 1000;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: Date.now(),
      uptime: uptime,
      environment: NODE_ENV,
      version: '1.0.0'
    }, null, 2));
    return;
  }

  // Products API endpoints
  if (pathname === '/api/products' && req.method === 'GET') {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 12;
    const minPrice = parseFloat(query.minPrice) || 0;
    const maxPrice = parseFloat(query.maxPrice) || 500;
    const searchQuery = query.searchQuery || '';
    const categories = query.categories ? query.categories.split(',') : [];
    const inStockOnly = query.inStockOnly === 'true';
    const onPromotion = query.onPromotion === 'true';
    const sortBy = query.sortBy || 'relevance';

    // Filter products
    let filtered = mockProducts.filter(product => {
      if (product.price < minPrice || product.price > maxPrice) return false;
      if (inStockOnly && !product.inStock) return false;
      if (onPromotion && !product.isPromotion) return false;
      if (categories.length > 0 && !categories.includes(product.categoryId)) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // relevance - keep original order
        break;
    }

    // Paginate
    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginatedProducts = filtered.slice(start, start + limit);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: paginatedProducts,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, null, 2));
    return;
  }

  // Product detail by ID
  if (pathname.match(/^\/api\/products\/\d+$/) && req.method === 'GET') {
    const productId = pathname.split('/').pop();
    const product = mockProducts.find(p => p.id === productId);

    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product, null, 2));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Product not found' }));
    }
    return;
  }

  // Design tokens
  if (pathname === '/api/design-tokens' && req.method === 'GET') {
    const designSystemPath = path.join(__dirname, 'docs/design/figma-design-system.json');
    if (fs.existsSync(designSystemPath)) {
      const designSystem = JSON.parse(fs.readFileSync(designSystemPath, 'utf8'));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(designSystem, null, 2));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Design system not found' }));
    }
    return;
  }

  // Design system HTML
  if (pathname === '/design-system' && req.method === 'GET') {
    const htmlPath = path.join(__dirname, 'apps/web-shop/src/design-system.html');
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }
  }

  // Serve static files from dist folder first
  if (pathname === '/' && req.method === 'GET') {
    const appPath = path.join(__dirname, 'apps/web-shop/dist/app.html');
    if (fs.existsSync(appPath)) {
      const html = fs.readFileSync(appPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }

    const indexPath = path.join(__dirname, 'apps/web-shop/dist/index.html');
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }
  }

  // Home page (fallback if dist doesn't exist)
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<head>
<title>Loja Africana Rosa</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb}
.container{max-width:1200px;margin:0 auto;padding:40px 20px}
header{background:linear-gradient(135deg,#B93B8F 0%,#8B2D6B 100%);color:white;padding:60px 20px;text-align:center;margin:-40px -20px 40px -20px}
h1{font-size:2.5em;margin:20px 0}
.status{display:inline-block;padding:8px 16px;background:#10B981;color:white;border-radius:4px;font-size:.9em;font-weight:600}
.card{background:white;padding:30px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb;box-shadow:0 1px 3px rgba(0,0,0,0.07)}
.card h2{color:#B93B8F;margin-bottom:15px}
.card p{color:#6b7280;line-height:1.6;margin:10px 0}
.btn{display:inline-block;background:#B93B8F;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin:10px 5px 10px 0}
.btn:hover{background:#8B2D6B}
.endpoints{background:#f3f4f6;padding:20px;border-radius:4px;margin:10px 0}
.endpoints p{font-family:monospace;font-size:.85em;color:#111827;margin:5px 0}
</style>
</head>
<body>
<header>
<h1>Loja Africana Rosa</h1>
<p>African Specialty Store - E-commerce Platform</p>
<span class="status">Running</span>
</header>
<div class="container">
<div class="card">
<h2>Welcome!</h2>
<p>Loja Africana Rosa is now running successfully.</p>
<div style="margin:20px 0">
<a href="/health" class="btn">Health Check</a>
<a href="/api/products" class="btn">API Products</a>
<a href="/api/design-tokens" class="btn">Design Tokens</a>
<a href="/design-system" class="btn">Design System</a>
</div>
</div>

<div class="card">
<h2>Available API Endpoints</h2>
<div class="endpoints">
<p><strong>GET /health</strong> - Server health check</p>
<p><strong>GET /api/products</strong> - Get all products with filters</p>
<p style="padding-left:20px">Query params: page, limit, minPrice, maxPrice, searchQuery, categories, inStockOnly, onPromotion, sortBy</p>
<p><strong>GET /api/products/:id</strong> - Get product detail by ID</p>
<p><strong>GET /api/design-tokens</strong> - Get design system tokens</p>
</div>
</div>

<div class="card">
<h2>Frontend Application</h2>
<p>The Angular frontend application (apps/web-shop) is integrated with this API server.</p>
<p>Available features:</p>
<ul style="margin-left:20px;margin-top:10px">
<li>Product catalog with advanced filters and search</li>
<li>Product details with reviews</li>
<li>Shopping cart with NgRx state management</li>
<li>User authentication and profile management</li>
<li>Internationalization (Portuguese/English)</li>
<li>Responsive design for all devices</li>
</ul>
</div>

<div class="card">
<p><strong>Developed by Ginquel Moreira</strong> - Limitless GMTech Solutions, Lda</p>
<p>Built with AI-Assisted Development using Claude Code</p>
</div>
</div>
</body>
</html>`);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found', path: pathname }));
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log('\n✓ Loja Africana Rosa Server Started');
  console.log('═══════════════════════════════════════════');
  console.log(`Port: ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log(`Uptime: http://localhost:${PORT}/health`);
  console.log(`API: http://localhost:${PORT}/api/products`);
  console.log('═══════════════════════════════════════════\n');
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
