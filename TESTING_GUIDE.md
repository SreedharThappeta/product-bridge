# Feedback Widget - Testing Guide

## Fixed Issues

The embed scripts were not working due to incorrect JSX handling. All loaders have been fixed to use proper JSX syntax:

**Problem**: Scripts were calling `Widget({})` instead of using JSX
**Solution**: Changed all loaders to use `<Widget />` JSX syntax with `@jsxImportSource preact` pragma

### Files Fixed:
- `src/embeds/webcomponent-loader.tsx` - ✅ Fixed
- `src/embeds/inline-loader.tsx` - ✅ Fixed
- `src/embeds/popup-loader.tsx` - ✅ Fixed
- `src/embeds/ssr-hydrate.tsx` - ✅ Fixed

## Testing All Methods

### Quick Start
```bash
npm run dev
```

Then open: **http://localhost:3000/test-all-methods.html**

This page tests all 5 embedding methods in one place.

### Individual Method Tests

#### Method 1: iframe (Safest)
- **Script**: `widget.js` (~2 KB)
- **Best for**: Security-critical environments, unknown host pages
- **Test at**: http://localhost:3000 (home page shows example)
- **Usage**:
```html
<script src="http://localhost:3000/widget.js"></script>
```

#### Method 2: Web Component + Shadow DOM
- **Script**: `widget-wc.js` (~28 KB)
- **Best for**: Modern sites with ES6+ support
- **Test at**: http://localhost:3000/test-all-methods.html
- **Usage**:
```html
<script src="http://localhost:3000/widget-wc.js"></script>
<feedback-widget></feedback-widget>
```

#### Method 3: Direct DOM Injection
- **Script**: `widget-inline.js` (~28 KB)
- **Best for**: Performance-critical sites
- **Test at**: http://localhost:3000/test-all-methods.html
- **Usage**:
```html
<div id="feedback-widget"></div>
<script src="http://localhost:3000/widget-inline.js"></script>
```

#### Method 4: Popup/Floating Button
- **Script**: `widget-popup.js` (~28 KB)
- **Best for**: Non-intrusive feedback collection (like Intercom)
- **Test at**: http://localhost:3000/demo/popup
- **Usage**:
```html
<script src="http://localhost:3000/widget-popup.js"></script>
```

#### Method 5: SSR + Hydration
- **Script**: `widget-hydrate.js` (~28 KB)
- **API**: `/api/widget/render`
- **Best for**: SEO-critical pages, progressive enhancement
- **Test at**: http://localhost:3000/test-all-methods.html
- **Usage**:
```html
<div id="feedback-widget"></div>
<script>
  fetch('http://localhost:3000/api/widget/render')
    .then(r => r.text())
    .then(html => document.getElementById('feedback-widget').innerHTML = html);
</script>
<script src="http://localhost:3000/widget-hydrate.js"></script>
```

## Pages Available

| Page | URL | Purpose |
|------|-----|---------|
| Home | http://localhost:3000 | Overview of all methods |
| Widget | http://localhost:3000/widget | Standalone widget page |
| Demo | http://localhost:3000/demo | Comprehensive demo with comparison table |
| Popup Demo | http://localhost:3000/demo/popup | Floating button demo |
| Test All | http://localhost:3000/test-all-methods.html | All 5 methods in one page |

## Browser Console

**Always check the browser console (F12) for errors:**

All methods log to console on initialization:
```javascript
console.log('FeedbackWidget initialized');
```

## Common Issues & Solutions

### Widget doesn't appear
1. Check **F12 Console** for JavaScript errors
2. Check **Network tab** - scripts should download successfully
3. Check if **localhost:3000 is accessible**
4. Refresh the page

### Scripts show 404
- Make sure dev server is running: `npm run dev`
- Verify you're using `http://localhost:3000` (not `https://`)

### Only iframe method works
- The other methods were broken due to JSX issues - **NOW FIXED** ✅
- Rebuild with: `npm run build:embeds`
- Restart dev server: `npm run dev`

### Web Component not rendering
- Check that browser supports Web Components (Chrome, Edge, Firefox, Safari)
- Look for errors in console mentioning "customElements"
- The `<feedback-widget>` tag must be in the HTML after the script tag

### Inline method shows nothing
- Make sure the container `<div id="feedback-widget"></div>` exists
- Script will auto-create one if not found
- Use console: `window.FeedbackWidget.mount('#selector')` to mount manually

### SSR method returns blank
- Make sure `/api/widget/render` endpoint is accessible
- Check Network tab - API should return HTML, not JSON
- The hydrate script should replace the SSR HTML with interactive component

## Build Commands

```bash
# Rebuild all embed scripts
npm run build:embeds

# Full build (Next.js + embeds)
npm run build

# Run dev server
npm run dev

# Start production server
npm start
```

## Testing Locally with External HTML Files

Create a file `test-widget.html`:

```html
<!DOCTYPE html>
<html>
<head><title>Test Widget</title></head>
<body>
  <h1>My Site</h1>
  <p>Widget appears below:</p>

  <!-- Choose ONE method -->
  <script src="http://localhost:3000/widget.js"></script>
</body>
</html>
```

Then open this file in your browser (file:// URL). The widget should load from your dev server.

## Architecture Overview

```
Shared Core (src/core/)
├── Widget.tsx           ← Main Preact component (used by all)
├── styles.ts            ← CSS (used by all)
├── data.ts              ← Dummy data
└── types.ts             ← TypeScript types

Individual Loaders (src/embeds/)
├── iframe-loader.js     → public/widget.js
├── webcomponent-loader.tsx → public/widget-wc.js
├── inline-loader.tsx    → public/widget-inline.js
├── popup-loader.tsx     → public/widget-popup.js
└── ssr-hydrate.tsx      → public/widget-hydrate.js
```

All 5 methods share the **same Widget component** and **same styles** - only the loader mechanism differs.

## Performance Notes

| Method | Load Time | Bundle Size | Rendering |
|--------|-----------|-------------|-----------|
| iframe | Slower | 2 KB loader + 650px iframe | Instant |
| Web Component | Fast | 28 KB | Instant |
| Inline DOM | Fastest | 28 KB | Instant |
| Popup | Fast | 28 KB | On button click |
| SSR | Fast | HTML + 28 KB | Instant (async) |

## Next Steps

1. **Test thoroughly** - Visit http://localhost:3000/test-all-methods.html
2. **Check browser console** - Should show no errors
3. **Test on different browsers** - Chrome, Firefox, Safari, Edge
4. **Test mobile** - Use responsive design mode
5. **Verify all features work** - Submit feedback, vote, check roadmap/changelog

All 5 methods are now fully functional! ✅
