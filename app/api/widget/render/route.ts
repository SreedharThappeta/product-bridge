import { NextResponse } from 'next/server';

// SSR endpoint that returns pre-rendered widget HTML
// Usage: Fetch this HTML and inject into page, then hydrate with widget-hydrate.js

const WIDGET_HTML = `
<div class="fw-widget" id="fw-ssr-widget">
  <div class="fw-header">
    <h2>Feedback</h2>
    <p>Help us improve our product</p>
  </div>

  <div class="fw-tabs">
    <button class="fw-tab active" data-tab="feedback">Feedback</button>
    <button class="fw-tab" data-tab="features">Features</button>
    <button class="fw-tab" data-tab="roadmap">Roadmap</button>
    <button class="fw-tab" data-tab="changelog">Changelog</button>
  </div>

  <div class="fw-content">
    <div class="fw-tab-content" data-tab="feedback">
      <form class="fw-form" id="fw-feedback-form">
        <h3>Submit Feedback</h3>
        <div class="fw-form-group">
          <label class="fw-label">Type</label>
          <div class="fw-type-buttons">
            <button type="button" class="fw-type-btn active" data-type="suggestion">suggestion</button>
            <button type="button" class="fw-type-btn" data-type="bug">bug</button>
            <button type="button" class="fw-type-btn" data-type="other">other</button>
          </div>
        </div>
        <div class="fw-form-group">
          <label class="fw-label">Message *</label>
          <textarea class="fw-textarea" name="message" placeholder="Tell us what you think..." required></textarea>
        </div>
        <div class="fw-form-group">
          <label class="fw-label">Email (optional)</label>
          <input type="email" class="fw-input" name="email" placeholder="your@email.com">
        </div>
        <button type="submit" class="fw-submit-btn">Submit Feedback</button>
      </form>

      <div>
        <h3 class="fw-section-title">Recent Feedback</h3>
        <div class="fw-card">
          <div class="fw-card-header">
            <span class="fw-badge fw-badge-suggestion">suggestion</span>
            <span class="fw-card-date">2024-12-10</span>
          </div>
          <p class="fw-card-desc">Would love to see dark mode support!</p>
        </div>
        <div class="fw-card">
          <div class="fw-card-header">
            <span class="fw-badge fw-badge-bug">bug</span>
            <span class="fw-card-date">2024-12-09</span>
          </div>
          <p class="fw-card-desc">The submit button is not working on mobile Safari</p>
        </div>
      </div>
    </div>
  </div>

  <div class="fw-footer">
    <span>Powered by Feedback Widget</span>
  </div>
</div>
`;

export async function GET() {
  return new NextResponse(WIDGET_HTML, {
    headers: {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60',
    },
  });
}
