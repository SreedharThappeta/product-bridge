/** @jsxImportSource preact */
/**
 * Web Component + Shadow DOM Embed
 *
 * Usage:
 * <script src="http://localhost:3000/widget-wc.js"></script>
 * <feedback-widget></feedback-widget>
 */

import { render } from 'preact';
import { Widget } from '../core/Widget';
import { WIDGET_STYLES } from '../core/styles';

class FeedbackWidgetElement extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Inject styles into shadow DOM
    const style = document.createElement('style');
    style.textContent = WIDGET_STYLES;
    this.shadow.appendChild(style);

    // Create mount point
    const mountPoint = document.createElement('div');
    this.shadow.appendChild(mountPoint);

    // Render widget using JSX
    render(<Widget />, mountPoint);
  }

  disconnectedCallback() {
    // Cleanup
    render(null, this.shadow);
  }
}

// Register custom element
if (!customElements.get('feedback-widget')) {
  customElements.define('feedback-widget', FeedbackWidgetElement);
}

// Export for programmatic usage
(window as any).FeedbackWidget = {
  version: '1.0.0',
  init: () => {
    console.log('FeedbackWidget Web Component ready. Use <feedback-widget></feedback-widget>');
  }
};
