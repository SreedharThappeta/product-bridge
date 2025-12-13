/**
 * iframe Embed (Default, most isolated)
 *
 * Usage:
 * <script src="http://localhost:3000/widget.js"></script>
 *
 * This creates an iframe that loads the widget from the server.
 * Best for complete isolation and security.
 */

(function() {
  // Get the script's src to determine the base URL
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var scriptSrc = currentScript.src;
  var baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));

  // Create container
  var container = document.createElement('div');
  container.id = 'feedback-widget-container';
  container.style.cssText = 'width: 100%; max-width: 512px; margin: 0 auto;';

  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.src = baseUrl + '/widget';
  iframe.style.cssText = 'width: 100%; height: 650px; border: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);';
  iframe.setAttribute('title', 'Feedback Widget');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('allow', 'clipboard-write');

  container.appendChild(iframe);

  // Insert the widget after the script tag or append to body
  if (currentScript.parentNode) {
    currentScript.parentNode.insertBefore(container, currentScript.nextSibling);
  } else {
    document.body.appendChild(container);
  }

  // Listen for resize messages from iframe
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'FEEDBACK_WIDGET_RESIZE') {
      iframe.style.height = event.data.height + 'px';
    }
  });

  // Export API
  window.FeedbackWidget = {
    version: '1.0.0',
    getIframe: function() {
      return iframe;
    },
    postMessage: function(type, data) {
      iframe.contentWindow.postMessage({ type: type, data: data }, '*');
    }
  };
})();
