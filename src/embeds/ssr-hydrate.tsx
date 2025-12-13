/** @jsxImportSource preact */
/**
 * SSR Hydration Script
 *
 * Usage:
 * 1. Fetch HTML from /api/widget/render
 * 2. Inject into container
 * 3. Include this script to hydrate
 *
 * <div id="feedback-widget"></div>
 * <script>
 *   fetch('http://localhost:3000/api/widget/render')
 *     .then(r => r.text())
 *     .then(html => {
 *       document.getElementById('feedback-widget').innerHTML = html;
 *     });
 * </script>
 * <script src="http://localhost:3000/widget-hydrate.js"></script>
 */

import { render } from 'preact';
import { Widget } from '../core/Widget';
import { WIDGET_STYLES } from '../core/styles';

function init() {
  // Inject styles
  if (!document.getElementById('fw-ssr-styles')) {
    const style = document.createElement('style');
    style.id = 'fw-ssr-styles';
    style.textContent = WIDGET_STYLES;
    document.head.appendChild(style);
  }

  // Find the SSR container
  const container = document.getElementById('feedback-widget') ||
                    document.getElementById('fw-ssr-widget')?.parentElement;

  if (container) {
    // Render (not hydrate) the interactive widget - replaces SSR content
    render(<Widget />, container);
  }
}

// Wait for DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // Small delay to ensure SSR content is injected
  setTimeout(init, 100);
}

// Export API
(window as any).FeedbackWidget = {
  version: '1.0.0',
  hydrate: (selector: string) => {
    const container = document.querySelector(selector);
    if (container) {
      render(<Widget />, container as HTMLElement);
    }
  }
};
