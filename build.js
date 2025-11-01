#!/usr/bin/env node

/**
 * Build Script for Loja Africana Rosa SPA
 * Watches source files and rebuilds dist on changes
 * Supports hot-reload in development
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const SPA_SOURCE_DIR = path.join(__dirname, 'apps/web-shop/src/spa');
const DIST_DIR = path.join(__dirname, 'apps/web-shop/dist');
const APP_HTML_SRC = path.join(SPA_SOURCE_DIR, 'app.html');
const APP_HTML_DIST = path.join(DIST_DIR, 'app.html');
const INDEX_HTML_SRC = path.join(SPA_SOURCE_DIR, 'index.html');
const INDEX_HTML_DIST = path.join(DIST_DIR, 'index.html');

let buildInProgress = false;
let pendingBuild = false;

/**
 * Build function - copies source files to dist
 */
async function build() {
  if (buildInProgress) {
    pendingBuild = true;
    return;
  }

  buildInProgress = true;
  try {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] Building SPA...`);

    // Ensure dist directory exists
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    // Copy app.html if source exists
    if (fs.existsSync(APP_HTML_SRC)) {
      fs.copyFileSync(APP_HTML_SRC, APP_HTML_DIST);
      console.log(`[${timestamp}] ✓ Built app.html`);
    }

    // Copy index.html if source exists
    if (fs.existsSync(INDEX_HTML_SRC)) {
      fs.copyFileSync(INDEX_HTML_SRC, INDEX_HTML_DIST);
      console.log(`[${timestamp}] ✓ Built index.html`);
    }

    console.log(`[${timestamp}] Build complete!`);
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Build error:`, error);
  } finally {
    buildInProgress = false;

    // If there were pending builds, run again
    if (pendingBuild) {
      pendingBuild = false;
      build();
    }
  }
}

/**
 * Watch for file changes in development mode
 */
function watchFiles() {
  console.log('🔍 Watching for changes in apps/web-shop/src/spa/...');

  const watcher = chokidar.watch(SPA_SOURCE_DIR, {
    ignored: /(^|[\/\\])\.|node_modules/,
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 100
    }
  });

  watcher
    .on('change', (file) => {
      console.log(`📝 Changed: ${path.relative(process.cwd(), file)}`);
      build();
    })
    .on('add', (file) => {
      console.log(`✨ Added: ${path.relative(process.cwd(), file)}`);
      build();
    })
    .on('unlink', (file) => {
      console.log(`🗑️  Deleted: ${path.relative(process.cwd(), file)}`);
      build();
    })
    .on('error', (error) => {
      console.error('Watcher error:', error);
    });

  console.log('✅ File watcher ready!\n');
}

/**
 * Initialize SPA source files from existing dist if they don't exist
 */
function initializeSourceFiles() {
  console.log('🚀 Initializing SPA source files...\n');

  // Ensure source directory exists
  if (!fs.existsSync(SPA_SOURCE_DIR)) {
    fs.mkdirSync(SPA_SOURCE_DIR, { recursive: true });
  }

  // If source files don't exist, copy from dist
  if (!fs.existsSync(APP_HTML_SRC) && fs.existsSync(APP_HTML_DIST)) {
    console.log('📋 Initializing app.html from dist...');
    fs.copyFileSync(APP_HTML_DIST, APP_HTML_SRC);
    console.log('✓ app.html initialized\n');
  }

  if (!fs.existsSync(INDEX_HTML_SRC) && fs.existsSync(INDEX_HTML_DIST)) {
    console.log('📋 Initializing index.html from dist...');
    fs.copyFileSync(INDEX_HTML_DIST, INDEX_HTML_SRC);
    console.log('✓ index.html initialized\n');
  }
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2);
  const isWatchMode = args.includes('--watch') || process.env.WATCH === 'true';

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   Loja Africana Rosa - Build System    ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Initialize source files from dist if needed
  initializeSourceFiles();

  // Initial build
  build().then(() => {
    // Start watching if requested
    if (isWatchMode) {
      watchFiles();
    }
  });
}

// Run main
main();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Build process stopped');
  process.exit(0);
});
