/**
 * Build script for all embed versions
 *
 * Usage: node scripts/build-embeds.js
 *
 * This bundles:
 * - widget-wc.js (Web Component + Shadow DOM)
 * - widget-inline.js (Direct DOM injection)
 * - widget-popup.js (Floating button popup)
 * - widget.js (iframe - just copy)
 */

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const publicDir = path.join(__dirname, '..', 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Common build options
const commonOptions = {
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['es2018'],
  format: 'iife',
  jsx: 'automatic',
  jsxImportSource: 'preact',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  alias: {
    'react': 'preact/compat',
    'react-dom': 'preact/compat',
  },
};

async function build() {
  console.log('Building embed scripts...\n');

  try {
    // Build Web Component version
    console.log('Building widget-wc.js (Web Component)...');
    await esbuild.build({
      ...commonOptions,
      entryPoints: [path.join(srcDir, 'embeds', 'webcomponent-loader.tsx')],
      outfile: path.join(publicDir, 'widget-wc.js'),
      globalName: 'FeedbackWidgetWC',
    });
    const wcSize = fs.statSync(path.join(publicDir, 'widget-wc.js')).size;
    console.log(`  ✓ widget-wc.js (${(wcSize / 1024).toFixed(1)} KB)\n`);

    // Build Inline version
    console.log('Building widget-inline.js (Direct DOM)...');
    await esbuild.build({
      ...commonOptions,
      entryPoints: [path.join(srcDir, 'embeds', 'inline-loader.tsx')],
      outfile: path.join(publicDir, 'widget-inline.js'),
      globalName: 'FeedbackWidgetInline',
    });
    const inlineSize = fs.statSync(path.join(publicDir, 'widget-inline.js')).size;
    console.log(`  ✓ widget-inline.js (${(inlineSize / 1024).toFixed(1)} KB)\n`);

    // Build Popup version
    console.log('Building widget-popup.js (Floating Button)...');
    await esbuild.build({
      ...commonOptions,
      entryPoints: [path.join(srcDir, 'embeds', 'popup-loader.tsx')],
      outfile: path.join(publicDir, 'widget-popup.js'),
      globalName: 'FeedbackWidgetPopup',
    });
    const popupSize = fs.statSync(path.join(publicDir, 'widget-popup.js')).size;
    console.log(`  ✓ widget-popup.js (${(popupSize / 1024).toFixed(1)} KB)\n`);

    // Build SSR Hydration version
    console.log('Building widget-hydrate.js (SSR Hydration)...');
    await esbuild.build({
      ...commonOptions,
      entryPoints: [path.join(srcDir, 'embeds', 'ssr-hydrate.tsx')],
      outfile: path.join(publicDir, 'widget-hydrate.js'),
      globalName: 'FeedbackWidgetHydrate',
    });
    const hydrateSize = fs.statSync(path.join(publicDir, 'widget-hydrate.js')).size;
    console.log(`  ✓ widget-hydrate.js (${(hydrateSize / 1024).toFixed(1)} KB)\n`);

    // Copy iframe loader (no bundling needed - it's vanilla JS)
    console.log('Copying widget.js (iframe)...');
    fs.copyFileSync(
      path.join(srcDir, 'embeds', 'iframe-loader.js'),
      path.join(publicDir, 'widget.js')
    );
    const iframeSize = fs.statSync(path.join(publicDir, 'widget.js')).size;
    console.log(`  ✓ widget.js (${(iframeSize / 1024).toFixed(1)} KB)\n`);

    console.log('All embed scripts built successfully!\n');
    console.log('Available embeds:');
    console.log('  • widget.js          - iframe (safest, most isolated)');
    console.log('  • widget-wc.js       - Web Component with Shadow DOM');
    console.log('  • widget-inline.js   - Direct DOM injection');
    console.log('  • widget-popup.js    - Floating button popup');
    console.log('  • widget-hydrate.js  - SSR hydration script');

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
