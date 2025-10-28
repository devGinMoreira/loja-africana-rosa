// Comprehensive API Testing Script
const http = require('http');

const BASE_URL = 'http://localhost:3004/api';
let authToken = '';

const results = [];

// Helper function to make HTTP requests
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: data ? JSON.parse(data) : null,
            headers: res.headers,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers,
          });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`   Request error for ${method} ${url.toString()}: ${err.message}`);
      reject(err);
    });

    req.on('timeout', () => {
      console.error(`   Request timeout for ${method} ${url.toString()}`);
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Test definitions
async function runTests() {
  console.log('\n' + '='.repeat(80));
  console.log('BACKEND API TESTING SUITE');
  console.log('='.repeat(80) + '\n');

  // Test 1: Health Check
  try {
    console.log('1. Testing Health Check...');
    const healthRes = await makeRequest('GET', '/health');
    if (healthRes.status === 200 && healthRes.data.status === 'OK') {
      console.log('   SUCCESS: Health check passed');
      console.log(`   Status: ${healthRes.data.status}, Uptime: ${healthRes.data.uptime.toFixed(2)}s`);
      results.push({ name: 'Health Check', status: 'PASS' });
    } else {
      console.log('   FAILED: Health check');
      results.push({ name: 'Health Check', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Health Check', status: 'ERROR' });
  }

  // Test 2: Customer Login
  console.log('\n2. Testing Customer Login...');
  try {
    const loginRes = await makeRequest('POST', '/auth/login', {
      email: 'customer@example.com',
      password: 'Customer123!@',
    });
    if (loginRes.status === 200 && loginRes.data.accessToken) {
      authToken = loginRes.data.accessToken;
      console.log('   SUCCESS: Login successful');
      console.log(`   Token received for: ${loginRes.data.email}`);
      results.push({ name: 'Customer Login', status: 'PASS' });
    } else {
      console.log('   FAILED: Login failed');
      results.push({ name: 'Customer Login', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Customer Login', status: 'ERROR' });
  }

  // Test 3: Get All Products
  console.log('\n3. Testing Get All Products...');
  try {
    const productsRes = await makeRequest('GET', '/products?limit=5');
    if (productsRes.status === 200 && productsRes.data.data && Array.isArray(productsRes.data.data)) {
      console.log('   SUCCESS: Products retrieved');
      console.log(`   Found ${productsRes.data.pagination.total} total products`);
      console.log(`   Sample: ${productsRes.data.data[0]?.name}`);
      results.push({ name: 'Get Products', status: 'PASS' });
    } else {
      console.log('   FAILED: Get products');
      results.push({ name: 'Get Products', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Get Products', status: 'ERROR' });
  }

  // Test 4: Get User Profile
  console.log('\n4. Testing Get User Profile...');
  try {
    const usersRes = await makeRequest('GET', '/users');
    if (usersRes.status === 200 && Array.isArray(usersRes.data)) {
      console.log('   SUCCESS: User profile retrieved');
      console.log(`   Total users: ${usersRes.data.length}`);
      results.push({ name: 'Get User Profile', status: 'PASS' });
    } else {
      console.log('   FAILED: Get user profile');
      results.push({ name: 'Get User Profile', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Get User Profile', status: 'ERROR' });
  }

  // Test 5: Get Shopping Cart
  console.log('\n5. Testing Get Shopping Cart...');
  try {
    const cartRes = await makeRequest('GET', '/cart');
    if (cartRes.status === 200 && cartRes.data) {
      console.log('   SUCCESS: Cart retrieved');
      console.log(`   Cart items: ${cartRes.data.items?.length || 0}`);
      console.log(`   Subtotal: $${cartRes.data.subtotal?.toFixed(2) || '0.00'}`);
      results.push({ name: 'Get Cart', status: 'PASS' });
    } else {
      console.log('   FAILED: Get cart');
      results.push({ name: 'Get Cart', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Get Cart', status: 'ERROR' });
  }

  // Test 6: Get Featured Products
  console.log('\n6. Testing Get Featured Products...');
  try {
    const featuredRes = await makeRequest('GET', '/products/featured');
    if (featuredRes.status === 200 && Array.isArray(featuredRes.data)) {
      console.log('   SUCCESS: Featured products retrieved');
      console.log(`   Featured count: ${featuredRes.data.length}`);
      results.push({ name: 'Get Featured Products', status: 'PASS' });
    } else {
      console.log('   FAILED: Get featured products');
      results.push({ name: 'Get Featured Products', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Get Featured Products', status: 'ERROR' });
  }

  // Test 7: Get Top Sellers
  console.log('\n7. Testing Get Top Sellers...');
  try {
    const topRes = await makeRequest('GET', '/products/top-sellers');
    if (topRes.status === 200 && Array.isArray(topRes.data)) {
      console.log('   SUCCESS: Top sellers retrieved');
      console.log(`   Top sellers count: ${topRes.data.length}`);
      results.push({ name: 'Get Top Sellers', status: 'PASS' });
    } else {
      console.log('   FAILED: Get top sellers');
      results.push({ name: 'Get Top Sellers', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Get Top Sellers', status: 'ERROR' });
  }

  // Test 8: Get Product Categories
  console.log('\n8. Testing Get Product Categories...');
  try {
    const catRes = await makeRequest('GET', '/products/categories');
    if (catRes.status === 200 && Array.isArray(catRes.data)) {
      console.log('   SUCCESS: Categories retrieved');
      console.log(`   Categories: ${catRes.data.join(', ')}`);
      results.push({ name: 'Get Categories', status: 'PASS' });
    } else {
      console.log('   FAILED: Get categories');
      results.push({ name: 'Get Categories', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Get Categories', status: 'ERROR' });
  }

  // Test 9: Product Search
  console.log('\n9. Testing Product Search...');
  try {
    const searchRes = await makeRequest('GET', '/products?search=coffee');
    if (searchRes.status === 200 && searchRes.data.data) {
      console.log('   SUCCESS: Product search successful');
      console.log(`   Found ${searchRes.data.data.length} products matching "coffee"`);
      results.push({ name: 'Product Search', status: 'PASS' });
    } else {
      console.log('   FAILED: Product search');
      results.push({ name: 'Product Search', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Product Search', status: 'ERROR' });
  }

  // Test 10: Get User Orders
  console.log('\n10. Testing Get User Orders...');
  try {
    const ordersRes = await makeRequest('GET', '/orders');
    if (ordersRes.status === 200 && Array.isArray(ordersRes.data)) {
      console.log('   SUCCESS: Orders retrieved');
      console.log(`   Total orders: ${ordersRes.data.length}`);
      results.push({ name: 'Get Orders', status: 'PASS' });
    } else {
      console.log('   FAILED: Get orders');
      results.push({ name: 'Get Orders', status: 'FAIL' });
    }
  } catch (e) {
    console.log('   ERROR: ' + e.message);
    results.push({ name: 'Get Orders', status: 'ERROR' });
  }

  // Print Summary
  console.log('\n' + '='.repeat(80));
  console.log('TEST SUMMARY');
  console.log('='.repeat(80));
  console.table(results);

  const passed = results.filter((r) => r.status === 'PASS').length;
  const total = results.length;
  console.log(`\nTotal: ${passed}/${total} tests passed (${((passed / total) * 100).toFixed(1)}%)\n`);

  if (passed === total) {
    console.log('SUCCESS: ALL TESTS PASSED! API is working correctly.\n');
  } else {
    console.log('WARNING: Some tests failed. Check the API server.\n');
  }

  process.exit(passed === total ? 0 : 1);
}

// Run tests
runTests().catch((e) => {
  console.error('Test suite error:', e);
  process.exit(1);
});
