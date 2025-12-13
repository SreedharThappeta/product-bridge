# Feedback Widget

An embeddable feedback widget with **5 different integration methods**. Collect user feedback, feature requests, show roadmaps and changelogs.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see the widget.

## 5 Embed Methods

### Method 1: iframe (Safest)
```html
<script src="http://localhost:3000/widget.js"></script>
```

### Method 2: Web Component (Shadow DOM)
```html
<script src="http://localhost:3000/widget-wc.js"></script>
<feedback-widget></feedback-widget>
```

### Method 3: Direct DOM (Fastest)
```html
<script src="http://localhost:3000/widget-inline.js"></script>
```

### Method 4: Popup (Floating Button)
```html
<script src="http://localhost:3000/widget-popup.js"></script>
```

### Method 5: SSR + Hydration (SEO-friendly)
```html
<div id="feedback-widget"></div>
<script>
  fetch('http://localhost:3000/api/widget/render')
    .then(r => r.text())
    .then(html => document.getElementById('feedback-widget').innerHTML = html);
</script>
<script src="http://localhost:3000/widget-hydrate.js"></script>
```

## Comparison

| Method | Script | Size | Isolation | Best For |
|--------|--------|------|-----------|----------|
| iframe | widget.js | ~2KB | Complete | Security-critical |
| Web Component | widget-wc.js | ~28KB | Shadow DOM | Modern sites |
| Direct DOM | widget-inline.js | ~28KB | CSS Prefixed | Performance |
| Popup | widget-popup.js | ~28KB | CSS Prefixed | Non-intrusive |
| SSR | widget-hydrate.js | ~28KB | CSS Prefixed | SEO |

## Widget Features

- **Feedback** - Submit bugs, suggestions, general feedback
- **Feature Requests** - Submit and vote on features
- **Roadmap** - View planned features by quarter
- **Changelog** - Version history and updates

## Pages

- `/` - Home with all embed methods
- `/widget` - Standalone widget
- `/demo` - Demo showing all methods
- `/demo/popup` - Popup widget demo
- `/api/widget/render` - SSR HTML endpoint

## Build

```bash
npm run build:embeds  # Build all embed scripts
npm run build         # Build Next.js + embeds
```

## Project Structure

```
widget/
├── app/                    # Next.js app
│   ├── widget/            # Standalone widget page
│   ├── demo/              # Demo pages
│   └── api/widget/render/ # SSR endpoint
├── src/
│   ├── core/              # Shared widget code
│   │   ├── Widget.tsx     # Main component (Preact)
│   │   ├── styles.ts      # CSS styles
│   │   ├── data.ts        # Dummy data
│   │   └── types.ts       # TypeScript types
│   └── embeds/            # Embed loaders
│       ├── iframe-loader.js
│       ├── webcomponent-loader.tsx
│       ├── inline-loader.tsx
│       ├── popup-loader.tsx
│       └── ssr-hydrate.tsx
├── public/                # Built embed scripts
│   ├── widget.js
│   ├── widget-wc.js
│   ├── widget-inline.js
│   ├── widget-popup.js
│   └── widget-hydrate.js
└── scripts/
    └── build-embeds.js    # Embed build script
```
