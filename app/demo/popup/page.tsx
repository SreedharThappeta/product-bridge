"use client";

import Script from 'next/script';

export default function PopupDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Popup Widget Demo</h1>
          <a href="/demo" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Back to All Methods
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popup Widget Demo
          </h2>
          <p className="text-xl text-gray-600">
            Look at the bottom-right corner! Click the blue button to open the feedback widget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How It Works
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">1.</span>
                A floating button appears in the bottom-right corner
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">2.</span>
                Click the button to toggle the widget open/closed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">3.</span>
                The widget slides up with a smooth animation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">4.</span>
                Works great on mobile and desktop
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Embed Code
            </h3>
            <p className="text-gray-600 mb-4">
              Just one line of code - the popup appears automatically:
            </p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {`<script src="http://localhost:3000/widget-popup.js"></script>`}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Perfect for SaaS Apps
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The popup widget stays out of the way until users need it.
            Its similar to Intercom, Crisp, or other support widgets.
            Users can submit feedback anytime without leaving the current page.
          </p>
        </div>

        {/* Simulated content to make the page scrollable */}
        <div className="mt-16 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Content</h3>
            <p className="text-gray-600">
              This is just placeholder content to demonstrate that the popup widget
              floats above all page content. Try scrolling up and down - the widget
              button stays fixed in position!
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">More Content</h3>
            <p className="text-gray-600">
              The popup is great for collecting feedback on any page of your app.
              Users dont need to navigate to a separate feedback page.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Even More Content</h3>
            <p className="text-gray-600">
              Scroll all the way down and the button will still be there in the corner.
              Click it to open the feedback widget!
            </p>
          </div>
        </div>
      </main>

      {/* Load the popup widget script */}
      <Script src="/widget-popup.js" strategy="lazyOnload" />
    </div>
  );
}
