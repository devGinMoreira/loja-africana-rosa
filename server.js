const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const startTime = Date.now();

const requestHandler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.url === '/health' && req.method === 'GET') {
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

  if (req.url === '/api/design-tokens' && req.method === 'GET') {
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

  if (req.url === '/design-system' && req.method === 'GET') {
    const htmlPath = path.join(__dirname, 'apps/web-shop/src/design-system.html');
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }
  }

  if (req.url === '/') {
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
<a href="/api/design-tokens" class="btn">Design Tokens</a>
<a href="/design-system" class="btn">Design System</a>
</div>
</div>
<div class="card">
<p>Developed by Ginquel Moreira - Limitless GMTech Solutions</p>
<p>Built with AI-Assisted Development using Claude Code</p>
</div>
</div>
</body>
</html>`);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found', path: req.url }));
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log('\nLoja Africana Rosa Server Started');
  console.log('Port:', PORT);
  console.log('Environment:', NODE_ENV);
  console.log('Health check: http://localhost:' + PORT + '/health\n');
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
