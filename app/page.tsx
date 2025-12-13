import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Feedback Widget</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            An embeddable feedback widget with 5 different integration methods.
            Collect feedback, feature requests, show roadmaps and changelogs.
          </p>
          <div className="flex gap-4">
            <Link
              href="/demo"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Embed Methods
            </Link>
            <Link
              href="/widget"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Widget Standalone
            </Link>
          </div>
        </div>
      </div>

      {/* Embed Methods */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">5 Embed Methods</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Method 1 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">iframe</h3>
            <p className="text-gray-600 text-sm mb-4">
              Complete isolation. Best for security-critical environments.
            </p>
            <code className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded block overflow-x-auto">
              widget.js (~2KB)
            </code>
          </div>

          {/* Method 2 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Web Component</h3>
            <p className="text-gray-600 text-sm mb-4">
              Shadow DOM encapsulation. Modern and clean integration.
            </p>
            <code className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded block overflow-x-auto">
              widget-wc.js (~28KB)
            </code>
          </div>

          {/* Method 3 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct DOM</h3>
            <p className="text-gray-600 text-sm mb-4">
              Fastest loading. Injects directly into page DOM.
            </p>
            <code className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded block overflow-x-auto">
              widget-inline.js (~28KB)
            </code>
          </div>

          {/* Method 4 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Popup</h3>
            <p className="text-gray-600 text-sm mb-4">
              Floating button like Intercom. Non-intrusive.
            </p>
            <code className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded block overflow-x-auto">
              widget-popup.js (~28KB)
            </code>
          </div>

          {/* Method 5 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SSR + Hydrate</h3>
            <p className="text-gray-600 text-sm mb-4">
              SEO-friendly. Server-rendered HTML with hydration.
            </p>
            <code className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded block overflow-x-auto">
              widget-hydrate.js (~28KB)
            </code>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Start</h2>
          <p className="text-gray-600 mb-4">
            The simplest method - just add one script tag:
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
            {`<script src="http://localhost:3000/widget.js"></script>`}
          </div>
          <p className="text-sm text-gray-500">
            This uses the iframe method. See the <Link href="/demo" className="text-blue-600 hover:underline">demo page</Link> for all 5 methods.
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Widget Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-lg">&#10003;</span>
              <div>
                <h3 className="font-medium text-gray-900">Feedback Collection</h3>
                <p className="text-sm text-gray-500">Bug reports, suggestions, general feedback</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-lg">&#10003;</span>
              <div>
                <h3 className="font-medium text-gray-900">Feature Requests</h3>
                <p className="text-sm text-gray-500">Users can submit and vote on features</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-lg">&#10003;</span>
              <div>
                <h3 className="font-medium text-gray-900">Product Roadmap</h3>
                <p className="text-sm text-gray-500">Show planned features by quarter</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-lg">&#10003;</span>
              <div>
                <h3 className="font-medium text-gray-900">Changelog</h3>
                <p className="text-sm text-gray-500">Display version history and updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
