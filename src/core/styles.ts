// CSS styles as JavaScript template literal
// Professional desktop-optimized design inspired by ClickUp Feedback

export const WIDGET_STYLES = `
/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Container */
.fw-widget {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #1f2937;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Header */
.fw-header {
  padding: 28px 32px;
  background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%);
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.fw-header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fw-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.6px;
}

.fw-header p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}

/* Tabs */
.fw-tabs {
  display: flex;
  gap: 0;
  padding: 0 24px;
  border-bottom: 1px solid #e5e7eb;
  overflow-x: auto;
  background: #ffffff;
  flex-shrink: 0;
}

.fw-tab {
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 0;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  background: transparent;
  color: #6b7280;
  margin: 0;
}

.fw-tab:hover {
  color: #374151;
  background: transparent;
}

.fw-tab.active {
  background: transparent;
  color: #2563eb;
  border-bottom-color: #2563eb;
}

/* Content */
.fw-content {
  padding: 32px;
  flex: 1;
  overflow-y: auto;
}

/* Form Styles */
.fw-create-form {
  background: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 32px;
}

.fw-form-inner {
  padding: 24px;
}

.fw-form-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px 0;
}

.fw-form-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 20px 0;
}

.fw-form-group {
  margin-bottom: 16px;
}

.fw-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.fw-input, .fw-textarea {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #1f2937;
  font-family: inherit;
  transition: all 0.15s ease;
}

.fw-input:focus, .fw-textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.fw-textarea {
  resize: none;
  min-height: 100px;
}

.fw-type-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.fw-type-btn {
  padding: 8px 14px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #374151;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: 500;
  transition: all 0.15s ease;
}

.fw-type-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.fw-type-btn.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.fw-submit-btn {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.fw-submit-btn:hover {
  background: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.fw-success-msg {
  margin-top: 12px;
  padding: 12px;
  font-size: 13px;
  color: #059669;
  background: #dcfce7;
  border-radius: 6px;
  text-align: center;
}

/* Section Headers */
.fw-section-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.fw-section-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.fw-quarter-title {
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  margin-top: 24px;
}

.fw-quarter-title:first-child {
  margin-top: 0;
}

/* Badges */
.fw-badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  text-transform: capitalize;
}

.fw-badge-bug {
  background: #fee2e2;
  color: #dc2626;
}

.fw-badge-suggestion {
  background: #dbeafe;
  color: #1e40af;
}

.fw-badge-other {
  background: #f3f4f6;
  color: #4b5563;
}

.fw-badge-under-review {
  background: #fef08a;
  color: #92400e;
}

.fw-badge-planned {
  background: #dbeafe;
  color: #1e40af;
}

.fw-badge-in-progress {
  background: #e9d5ff;
  color: #6b21a8;
}

.fw-badge-completed {
  background: #dcfce7;
  color: #166534;
}

/* Feedback Section */
.fw-feedback-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.fw-feedback-list-section {
  display: flex;
  flex-direction: column;
}

.fw-feedback-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fw-feedback-item {
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.fw-feedback-item:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fw-feedback-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.fw-feedback-date {
  font-size: 12px;
  color: #9ca3af;
  margin-left: auto;
}

.fw-feedback-text {
  font-size: 14px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
}

/* Features Section */
.fw-features-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.fw-features-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.fw-feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fw-feature-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.fw-feature-item:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fw-vote-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  min-width: 56px;
  background: #f0f1f3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.fw-vote-btn:hover {
  background: #e5e7eb;
  transform: scale(1.05);
}

.fw-vote-btn svg {
  width: 18px;
  height: 18px;
  color: #6b7280;
  margin-bottom: 4px;
}

.fw-vote-count {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
}

.fw-feature-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fw-feature-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.fw-feature-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.fw-feature-desc {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Roadmap Section */
.fw-roadmap-container {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.fw-roadmap-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fw-roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.fw-roadmap-quarter {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fw-roadmap-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fw-roadmap-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.fw-roadmap-item:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fw-roadmap-status {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.fw-roadmap-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fw-roadmap-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  display: block;
  margin-bottom: 4px;
}

.fw-roadmap-desc {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Changelog Section */
.fw-changelog-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.fw-changelog-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fw-changelog-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fw-changelog-entry {
  padding: 20px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.fw-changelog-entry:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fw-changelog-entry-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.fw-changelog-version-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fw-version-badge {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 700;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 6px;
}

.fw-changelog-date {
  font-size: 12px;
  color: #9ca3af;
}

.fw-changelog-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.fw-changelog-desc {
  font-size: 14px;
  color: #6b7280;
  margin: 12px 0;
  line-height: 1.6;
}

.fw-changes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fw-change-item {
  font-size: 13px;
  color: #4b5563;
  padding-left: 20px;
  position: relative;
  line-height: 1.5;
}

.fw-change-item::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 700;
}

/* Link Button */
.fw-link-btn {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.fw-link-btn:hover {
  background: #eff6ff;
  color: #1d4ed8;
}

/* Footer */
.fw-footer {
  padding: 12px 32px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  flex-shrink: 0;
}

.fw-footer span {
  font-size: 11px;
  color: #9ca3af;
}

/* Popup Styles */
.fw-popup-trigger {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #2563eb;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 9998;
}

.fw-popup-trigger:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.4);
}

.fw-popup-trigger svg {
  width: 24px;
  height: 24px;
  color: #ffffff;
}

.fw-popup-container {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 9999;
  max-width: 900px;
  width: 90vw;
  max-height: 90vh;
  animation: fw-slide-up 0.3s ease;
}

@keyframes fw-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fw-popup-container.hidden {
  display: none;
}

/* Scrollbar Styling */
.fw-content::-webkit-scrollbar {
  width: 8px;
}

.fw-content::-webkit-scrollbar-track {
  background: transparent;
}

.fw-content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.fw-content::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .fw-widget {
    max-width: 100%;
    border-radius: 0;
    height: 100vh;
  }

  .fw-header {
    padding: 20px 20px;
  }

  .fw-header h2 {
    font-size: 22px;
  }

  .fw-content {
    padding: 20px;
  }

  .fw-features-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .fw-popup-container {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    border-radius: 20px 20px 0 0;
    max-width: 100%;
  }
}
`;

// Helper to inject styles
export function injectStyles(container: Element | ShadowRoot) {
  const style = document.createElement('style');
  style.textContent = WIDGET_STYLES;
  container.appendChild(style);
}
