/** @jsxImportSource preact */
/**
 * Direct DOM Injection Embed
 *
 * Usage:
 * <div id="feedback-widget"></div>
 * <script src="http://localhost:3000/widget-inline.js"></script>
 *
 * Or auto-inject at script location:
 * <script src="http://localhost:3000/widget-inline.js"></script>
 */

import { render } from 'preact';
import { Widget } from '../core/Widget';
import { WIDGET_STYLES } from '../core/styles';

// Prefix all CSS classes to avoid conflicts
const SCOPED_STYLES = WIDGET_STYLES.replace(/\.fw-/g, '.fw-');

function injectWidget(container: HTMLElement) {
  // Inject scoped styles
  if (!document.getElementById('fw-inline-styles')) {
    const style = document.createElement('style');
    style.id = 'fw-inline-styles';
    style.textContent = SCOPED_STYLES;
    document.head.appendChild(style);
  }

  // Render widget using JSX
  render(<Widget />, container);
}

// Find container and inject
function init() {
  // Option 1: Look for existing container
  let container = document.getElementById('feedback-widget');

  // Option 2: Create container at script location
  if (!container) {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];

    container = document.createElement('div');
    container.id = 'feedback-widget';
    container.style.maxWidth = '512px';
    container.style.margin = '0 auto';

    if (currentScript.parentNode) {
      currentScript.parentNode.insertBefore(container, currentScript.nextSibling);
    } else {
      document.body.appendChild(container);
    }
  }

  injectWidget(container);
}

// Wait for DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for programmatic usage
(window as any).FeedbackWidget = {
  version: '1.0.0',
  mount: (selector: string) => {
    const container = document.querySelector(selector);
    if (container) {
      injectWidget(container as HTMLElement);
    } else {
      console.error(`FeedbackWidget: Container "${selector}" not found`);
    }
  },
  unmount: (selector: string) => {
    const container = document.querySelector(selector);
    if (container) {
      render(null, container as HTMLElement);
    }
  }
};
