/** @jsxImportSource preact */
/**
 * Popup/Modal Embed (Floating Button)
 *
 * Usage:
 * <script src="http://localhost:3000/widget-popup.js"></script>
 *
 * This creates a floating button in the bottom-right corner.
 * Clicking it opens/closes the feedback widget.
 */

import { render } from 'preact';
import { PopupWidget } from '../core/Widget';
import { WIDGET_STYLES } from '../core/styles';

function init() {
  // Inject styles
  if (!document.getElementById('fw-popup-styles')) {
    const style = document.createElement('style');
    style.id = 'fw-popup-styles';
    style.textContent = WIDGET_STYLES;
    document.head.appendChild(style);
  }

  // Create container
  const container = document.createElement('div');
  container.id = 'feedback-widget-popup';
  document.body.appendChild(container);

  // Render popup widget using JSX
  render(<PopupWidget />, container);
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
  open: () => {
    const event = new CustomEvent('fw-open');
    window.dispatchEvent(event);
  },
  close: () => {
    const event = new CustomEvent('fw-close');
    window.dispatchEvent(event);
  }
};
