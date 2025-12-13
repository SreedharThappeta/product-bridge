export const metadata = {
  title: 'Multi-Embed Widget Demo',
  description: 'Demo page showing all 5 embedding methods for the feedback widget',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Feedback Widget - All Embed Methods</h1>
          <a href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">5 Ways to Embed</h2>
          <p className="text-lg text-gray-600 mb-6">
            Choose the embedding method that works best for your use case. Each method has different trade-offs.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl mb-2">1</div>
              <h3 className="font-semibold text-gray-900">iframe</h3>
              <p className="text-sm text-gray-500">Safest, isolated</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl mb-2">2</div>
              <h3 className="font-semibold text-gray-900">Web Component</h3>
              <p className="text-sm text-gray-500">Shadow DOM</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl mb-2">3</div>
              <h3 className="font-semibold text-gray-900">Direct DOM</h3>
              <p className="text-sm text-gray-500">Fastest</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl mb-2">4</div>
              <h3 className="font-semibold text-gray-900">Popup</h3>
              <p className="text-sm text-gray-500">Floating button</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl mb-2">5</div>
              <h3 className="font-semibold text-gray-900">SSR</h3>
              <p className="text-sm text-gray-500">SEO friendly</p>
            </div>
          </div>
        </section>

        {/* Method 1: iframe */}
        <section className="mb-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Method 1: iframe (Current)</h3>
            <p className="text-gray-600">Complete isolation, no CSS conflicts, secure</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
              {`<script src="http://localhost:3000/widget.js"></script>`}
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-500 mb-4">Preview (using iframe):</p>
              <iframe
                src="/widget"
                className="w-full h-[600px] border-0 rounded-lg"
                title="iframe Widget"
              />
            </div>
          </div>
        </section>

        {/* Method 2: Web Component */}
        <section className="mb-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Method 2: Web Component + Shadow DOM</h3>
            <p className="text-gray-600">Native encapsulation, modern browsers, no style leaks</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
              <pre>{`<script src="http://localhost:3000/widget-wc.js"></script>
<feedback-widget></feedback-widget>`}</pre>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> To test this, create an HTML file and include the script tag above.
                The Web Component will render wherever you place the <code>&lt;feedback-widget&gt;</code> tag.
              </p>
            </div>
          </div>
        </section>

        {/* Method 3: Direct DOM */}
        <section className="mb-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Method 3: Direct DOM Injection</h3>
            <p className="text-gray-600">Fastest loading, renders at script location or in container</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
              <pre>{`<!-- Option A: Auto-inject at script location -->
<script src="http://localhost:3000/widget-inline.js"></script>

<!-- Option B: Target specific container -->
<div id="feedback-widget"></div>
<script src="http://localhost:3000/widget-inline.js"></script>`}</pre>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This injects React directly into the page.
                Styles are scoped with prefixes to minimize conflicts.
              </p>
            </div>
          </div>
        </section>

        {/* Method 4: Popup */}
        <section className="mb-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Method 4: Popup/Floating Button</h3>
            <p className="text-gray-600">Like Intercom/Crisp - non-intrusive, always available</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
              {`<script src="http://localhost:3000/widget-popup.js"></script>`}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Preview:</strong> Visit <a href="/demo/popup" className="underline">/demo/popup</a> to see the popup widget in action.
                It creates a floating button in the bottom-right corner.
              </p>
            </div>
          </div>
        </section>

        {/* Method 5: SSR */}
        <section className="mb-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Method 5: Server-Side Rendering</h3>
            <p className="text-gray-600">SEO-friendly, fast initial paint, progressive enhancement</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
              <pre>{`<!-- Fetch and inject HTML server-side or client-side -->
<div id="feedback-widget"></div>
<script>
  fetch('http://localhost:3000/api/widget/render')
    .then(r => r.text())
    .then(html => {
      document.getElementById('feedback-widget').innerHTML = html;
    });
</script>
<script src="http://localhost:3000/widget-hydrate.js"></script>`}</pre>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Best for:</strong> SEO-critical pages, sites that need content visible before JS loads.
                The HTML is fetched first, then hydrated with interactivity.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Comparison Table</h3>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Method</th>
                  <th className="text-left py-3 px-4 font-semibold">Script</th>
                  <th className="text-left py-3 px-4 font-semibold">Size</th>
                  <th className="text-left py-3 px-4 font-semibold">Isolation</th>
                  <th className="text-left py-3 px-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">iframe</td>
                  <td className="py-3 px-4 font-mono text-xs">widget.js</td>
                  <td className="py-3 px-4">~2 KB</td>
                  <td className="py-3 px-4 text-green-600">Complete</td>
                  <td className="py-3 px-4">Security-critical, unknown environments</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Web Component</td>
                  <td className="py-3 px-4 font-mono text-xs">widget-wc.js</td>
                  <td className="py-3 px-4">~28 KB</td>
                  <td className="py-3 px-4 text-green-600">Shadow DOM</td>
                  <td className="py-3 px-4">Modern sites, clean integration</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Direct DOM</td>
                  <td className="py-3 px-4 font-mono text-xs">widget-inline.js</td>
                  <td className="py-3 px-4">~28 KB</td>
                  <td className="py-3 px-4 text-yellow-600">CSS Prefixed</td>
                  <td className="py-3 px-4">Performance-critical, trusted sites</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Popup</td>
                  <td className="py-3 px-4 font-mono text-xs">widget-popup.js</td>
                  <td className="py-3 px-4">~28 KB</td>
                  <td className="py-3 px-4 text-yellow-600">CSS Prefixed</td>
                  <td className="py-3 px-4">Non-intrusive, always-available feedback</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">SSR + Hydrate</td>
                  <td className="py-3 px-4 font-mono text-xs">widget-hydrate.js</td>
                  <td className="py-3 px-4">~28 KB</td>
                  <td className="py-3 px-4 text-yellow-600">CSS Prefixed</td>
                  <td className="py-3 px-4">SEO, slow networks, progressive enhancement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Test HTML Template */}
        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Test HTML Template</h3>
            <p className="text-gray-600">Copy this to test any embed method locally</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`<!DOCTYPE html>
<html>
<head>
  <title>Widget Test Page</title>
  <style>
    body { font-family: system-ui; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { margin-bottom: 20px; }
  </style>
</head>
<body>
  <h1>Testing Feedback Widget</h1>
  <p>The widget should appear below:</p>

  <!-- CHOOSE ONE METHOD: -->

  <!-- Method 1: iframe -->
  <script src="http://localhost:3000/widget.js"></script>

  <!-- Method 2: Web Component -->
  <!-- <script src="http://localhost:3000/widget-wc.js"></script>
  <feedback-widget></feedback-widget> -->

  <!-- Method 3: Direct DOM -->
  <!-- <script src="http://localhost:3000/widget-inline.js"></script> -->

  <!-- Method 4: Popup -->
  <!-- <script src="http://localhost:3000/widget-popup.js"></script> -->

  <!-- Method 5: SSR -->
  <!-- <div id="feedback-widget"></div>
  <script>
    fetch('http://localhost:3000/api/widget/render')
      .then(r => r.text())
      .then(html => document.getElementById('feedback-widget').innerHTML = html);
  </script>
  <script src="http://localhost:3000/widget-hydrate.js"></script> -->

</body>
</html>`}</pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
