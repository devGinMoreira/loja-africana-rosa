const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
let passed = 0;
let failed = 0;

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: 5000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function runTests() {
  console.log('\n' + '='.repeat(70));
  console.log('Testing Loja Africana Rosa Application');
  console.log('='.repeat(70) + '\n');

  try {
    console.log('Test 1: Health Check Endpoint');
    const health = await makeRequest(BASE_URL + '/health');
    if (health.status === 200) {
      const data = JSON.parse(health.body);
      console.log('✓ Health check passed');
      console.log('  Status:', data.status);
      console.log('  Version:', data.version);
      console.log('  Uptime:', data.uptime.toFixed(2) + 's\n');
      passed++;
    } else {
      console.log('✗ Health check failed - Status:', health.status + '\n');
      failed++;
    }

    console.log('Test 2: Design Tokens API');
    const tokens = await makeRequest(BASE_URL + '/api/design-tokens');
    if (tokens.status === 200) {
      const data = JSON.parse(tokens.body);
      console.log('✓ Design tokens endpoint passed');
      console.log('  Colors:', data.colorTokens.length);
      console.log('  Typography:', data.typography.length);
      console.log('  Components:', data.components.length);
      console.log('  Screens:', data.screens.length + '\n');
      passed++;
    } else {
      console.log('✗ Design tokens failed - Status:', tokens.status + '\n');
      failed++;
    }

    console.log('Test 3: Design System HTML');
    const html = await makeRequest(BASE_URL + '/design-system');
    if (html.status === 200 && html.body.includes('DOCTYPE')) {
      console.log('✓ Design system HTML passed');
      console.log('  Size:', (html.body.length / 1024).toFixed(2) + ' KB\n');
      passed++;
    } else {
      console.log('✗ Design system HTML failed\n');
      failed++;
    }

    console.log('Test 4: Home Page');
    const home = await makeRequest(BASE_URL + '/');
    if (home.status === 200 && home.body.includes('Loja Africana Rosa')) {
      console.log('✓ Home page passed');
      console.log('  Size:', (home.body.length / 1024).toFixed(2) + ' KB\n');
      passed++;
    } else {
      console.log('✗ Home page failed\n');
      failed++;
    }

    console.log('Test 5: 404 Error Handling');
    const notfound = await makeRequest(BASE_URL + '/invalid-endpoint');
    if (notfound.status === 404) {
      console.log('✓ 404 error handling passed\n');
      passed++;
    } else {
      console.log('✗ 404 error handling failed\n');
      failed++;
    }

    console.log('Test 6: Project Files');
    const files = [
      'tailwind.config.js',
      'docs/design/figma-design-system.json',
      'package.json',
      'apps/web-shop/src/design-system.html'
    ];
    let allExist = true;
    files.forEach(f => {
      if (!fs.existsSync(path.join(__dirname, f))) {
        allExist = false;
        console.log('✗ Missing:', f);
      }
    });
    if (allExist) {
      console.log('✓ All project files present\n');
      passed++;
    } else {
      failed++;
    }

    console.log('Test 7: Configuration');
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
      const env = fs.readFileSync(envPath, 'utf8');
      if (env.includes('FIGMA_TOKEN') && env.includes('FIGMA_FILE_ID')) {
        console.log('✓ Configuration complete\n');
        passed++;
      } else {
        console.log('✗ Missing configuration\n');
        failed++;
      }
    } else {
      console.log('✗ .env.local not found\n');
      failed++;
    }

    console.log('='.repeat(70));
    console.log('\nRESULTS: ' + passed + ' passed, ' + failed + ' failed\n');
    
    if (failed === 0) {
      console.log('SUCCESS! Application is working perfectly!');
      console.log('Ready for deployment to Railway.\n');
      process.exit(0);
    } else {
      console.log('Some tests failed. Please review above.\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('Test error:', error.message);
    process.exit(1);
  }
}

runTests();
