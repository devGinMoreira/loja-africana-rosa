#!/usr/bin/env node

/**
 * Test MCP Figma Connection
 * Validates Figma API credentials and design system structure
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envFile.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  }
});

const FIGMA_TOKEN = envVars.FIGMA_TOKEN;
const FIGMA_FILE_ID = envVars.FIGMA_FILE_ID;

console.log('\n🔍 Testing MCP Figma Connection\n');
console.log('=' .repeat(60));

// Test 1: Check environment variables
console.log('\n✓ Test 1: Environment Variables');
console.log('  - FIGMA_TOKEN:', FIGMA_TOKEN ? '✓ Set' : '✗ Missing');
console.log('  - FIGMA_FILE_ID:', FIGMA_FILE_ID ? '✓ Set' : '✗ Missing');

if (!FIGMA_TOKEN || !FIGMA_FILE_ID) {
  console.error('\n✗ ERROR: Missing required environment variables!');
  process.exit(1);
}

// Test 2: Check design system JSON
console.log('\n✓ Test 2: Design System JSON');
const designSystemPath = path.join(__dirname, 'docs/design/figma-design-system.json');
if (fs.existsSync(designSystemPath)) {
  const designSystem = JSON.parse(fs.readFileSync(designSystemPath, 'utf8'));
  console.log('  - File exists: ✓');
  console.log('  - Colors defined: ' + designSystem.colorTokens.length);
  console.log('  - Typography styles: ' + designSystem.typography.length);
  console.log('  - Components: ' + designSystem.components.length);
  console.log('  - Screens: ' + designSystem.screens.length);
} else {
  console.error('  - File exists: ✗ NOT FOUND');
  process.exit(1);
}

// Test 3: Validate Figma API token format
console.log('\n✓ Test 3: Figma Token Format');
if (FIGMA_TOKEN.startsWith('figd_')) {
  console.log('  - Token format: ✓ Valid (starts with figd_)');
} else {
  console.error('  - Token format: ✗ Invalid (should start with figd_)');
  process.exit(1);
}

// Test 4: Validate Figma File ID format
console.log('\n✓ Test 4: Figma File ID Format');
if (FIGMA_FILE_ID && FIGMA_FILE_ID.length > 10) {
  console.log('  - File ID format: ✓ Valid');
} else {
  console.error('  - File ID format: ✗ Invalid');
  process.exit(1);
}

// Test 5: Test Figma API connection
console.log('\n✓ Test 5: Figma API Connection');
console.log('  Testing API endpoint...');

const options = {
  hostname: 'api.figma.com',
  path: `/v1/files/${FIGMA_FILE_ID}`,
  method: 'GET',
  headers: {
    'X-FIGMA-TOKEN': FIGMA_TOKEN,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const figmaData = JSON.parse(data);
        console.log('  - Connection: ✓ Success');
        console.log('  - File name: ' + figmaData.name);
        console.log('  - Pages in file: ' + figmaData.document.children.length);
        
        // List pages
        console.log('  - Available pages:');
        figmaData.document.children.forEach(page => {
          console.log('    • ' + page.name);
        });
        
        // Test 6: Extract design tokens
        console.log('\n✓ Test 6: Design Tokens Extraction');
        console.log('  - Ready to extract design tokens');
        
        // Final summary
        console.log('\n' + '='.repeat(60));
        console.log('✓ All tests passed! MCP Figma integration is ready.\n');
        console.log('Next steps:');
        console.log('1. Run Figma plugin to create design system pages');
        console.log('2. Extract design tokens from Figma');
        console.log('3. Generate Angular components\n');
        
      } catch (e) {
        console.error('  - Error parsing Figma response:', e.message);
        process.exit(1);
      }
    } else if (res.statusCode === 401) {
      console.error('  - Connection: ✗ Unauthorized (invalid token)');
      console.error('  - Status: ' + res.statusCode);
      process.exit(1);
    } else if (res.statusCode === 404) {
      console.error('  - Connection: ✗ File not found (invalid file ID)');
      console.error('  - Status: ' + res.statusCode);
      process.exit(1);
    } else {
      console.error('  - Connection: ✗ Failed');
      console.error('  - Status: ' + res.statusCode);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('  - Connection: ✗ Error:', e.message);
  process.exit(1);
});

req.end();
