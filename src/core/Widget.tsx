/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import type {
  Tab,
  FeedbackItem,
  FeatureRequest,
  RoadmapItem,
  ChangelogEntry,
  FeedbackType,
} from './types';
import {
  INITIAL_FEEDBACK,
  INITIAL_FEATURES,
  ROADMAP_ITEMS,
  CHANGELOG_ENTRIES,
} from './data';

// SVG Icons as components
const ChevronUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 15l7-7 7 7" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Tab Button
const TabButton: FunctionalComponent<{
  active: boolean;
  onClick: () => void;
  children: preact.ComponentChildren;
}> = ({ active, onClick, children }) => (
  <button
    class={`fw-tab ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Status Badge
const StatusBadge: FunctionalComponent<{ status: string }> = ({ status }) => (
  <span class={`fw-badge fw-badge-${status}`}>
    {status.replace('-', ' ')}
  </span>
);

// Feedback Tab
const FeedbackTab: FunctionalComponent<{
  feedback: FeedbackItem[];
  onSubmit: (item: Omit<FeedbackItem, 'id' | 'createdAt'>) => void;
}> = ({ feedback, onSubmit }) => {
  const [type, setType] = useState<FeedbackType>('suggestion');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSubmit({ type, message, email: email || undefined });
    setMessage('');
    setEmail('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div class="fw-feedback-container">
      <form class="fw-create-form" onSubmit={handleSubmit}>
        <div class="fw-form-inner">
          <h3 class="fw-form-title">Send us your feedback</h3>
          <p class="fw-form-subtitle">Help us improve by sharing your thoughts</p>

          <div class="fw-form-group">
            <label class="fw-label">Feedback Type</label>
            <div class="fw-type-buttons">
              {(['suggestion', 'bug', 'other'] as FeedbackType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  class={`fw-type-btn ${type === t ? 'active' : ''}`}
                  onClick={() => setType(t)}
                >
                  {t === 'suggestion' && '💡'} {t === 'bug' && '🐛'} {t === 'other' && '📝'} {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div class="fw-form-group">
            <label class="fw-label">Your Message</label>
            <textarea
              class="fw-textarea"
              value={message}
              onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
              placeholder="Tell us what you think..."
              required
            />
          </div>

          <div class="fw-form-group">
            <label class="fw-label">Email (optional)</label>
            <input
              type="email"
              class="fw-input"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder="your@email.com"
            />
          </div>

          <button type="submit" class="fw-submit-btn">
            Submit Feedback
          </button>

          {submitted && (
            <p class="fw-success-msg">✓ Thank you for your feedback!</p>
          )}
        </div>
      </form>

      <div class="fw-feedback-list-section">
        <h3 class="fw-section-title">Recent Feedback</h3>
        <div class="fw-feedback-list">
          {feedback.map((item) => (
            <div key={item.id} class="fw-feedback-item">
              <div class="fw-feedback-header">
                <span class={`fw-badge fw-badge-${item.type}`}>{item.type}</span>
                <span class="fw-feedback-date">{item.createdAt}</span>
              </div>
              <p class="fw-feedback-text">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Features Tab
const FeaturesTab: FunctionalComponent<{
  features: FeatureRequest[];
  onVote: (id: string) => void;
  onSubmit: (item: { title: string; description: string }) => void;
}> = ({ features, onVote, onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  const sortedFeatures = [...features].sort((a, b) => b.votes - a.votes);

  return (
    <div class="fw-features-container">
      <div class="fw-features-header">
        <div>
          <h3 class="fw-section-title">Feature Requests</h3>
          <p class="fw-section-subtitle">Vote on features you'd like to see</p>
        </div>
        <button class="fw-link-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '✚ Request Feature'}
        </button>
      </div>

      {showForm && (
        <form class="fw-create-form" onSubmit={handleSubmit}>
          <div class="fw-form-inner">
            <div class="fw-form-group">
              <label class="fw-label">Feature Title</label>
              <input
                type="text"
                class="fw-input"
                value={title}
                onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
                placeholder="What feature would you like?"
                required
              />
            </div>
            <div class="fw-form-group">
              <label class="fw-label">Description</label>
              <textarea
                class="fw-textarea"
                value={description}
                onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
                placeholder="Explain why you need this..."
                required
              />
            </div>
            <button type="submit" class="fw-submit-btn">
              Submit Request
            </button>
          </div>
        </form>
      )}

      <div class="fw-feature-list">
        {sortedFeatures.map((feature) => (
          <div key={feature.id} class="fw-feature-item">
            <button class="fw-vote-btn" onClick={() => onVote(feature.id)} title="Vote for this feature">
              <ChevronUpIcon />
              <span class="fw-vote-count">{feature.votes}</span>
            </button>
            <div class="fw-feature-body">
              <div class="fw-feature-title-row">
                <span class="fw-feature-title">{feature.title}</span>
                <StatusBadge status={feature.status} />
              </div>
              <p class="fw-feature-desc">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Roadmap Tab
const RoadmapTab: FunctionalComponent<{ items: RoadmapItem[] }> = ({ items }) => {
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.quarter]) acc[item.quarter] = [];
    acc[item.quarter].push(item);
    return acc;
  }, {} as Record<string, RoadmapItem[]>);

  return (
    <div class="fw-roadmap-container">
      <div class="fw-roadmap-header">
        <h3 class="fw-section-title">Product Roadmap</h3>
        <p class="fw-section-subtitle">See what's coming next</p>
      </div>

      <div class="fw-roadmap-timeline">
        {Object.entries(grouped).map(([quarter, quarterItems]) => (
          <div key={quarter} class="fw-roadmap-quarter">
            <h4 class="fw-quarter-title">{quarter}</h4>
            <div class="fw-roadmap-items">
              {quarterItems.map((item) => (
                <div key={item.id} class="fw-roadmap-item">
                  <div class="fw-roadmap-status">
                    <StatusBadge status={item.status} />
                  </div>
                  <div class="fw-roadmap-content">
                    <span class="fw-roadmap-title">{item.title}</span>
                    <p class="fw-roadmap-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Changelog Tab
const ChangelogTab: FunctionalComponent<{ entries: ChangelogEntry[] }> = ({ entries }) => (
  <div class="fw-changelog-container">
    <div class="fw-changelog-header">
      <h3 class="fw-section-title">Changelog</h3>
      <p class="fw-section-subtitle">Latest updates and improvements</p>
    </div>

    <div class="fw-changelog-list">
      {entries.map((entry) => (
        <div key={entry.id} class="fw-changelog-entry">
          <div class="fw-changelog-entry-header">
            <div class="fw-changelog-version-section">
              <span class="fw-version-badge">v{entry.version}</span>
              <span class="fw-changelog-date">{entry.date}</span>
            </div>
            <h4 class="fw-changelog-title">{entry.title}</h4>
          </div>
          <p class="fw-changelog-desc">{entry.description}</p>
          <ul class="fw-changes-list">
            {entry.changes.map((change, i) => (
              <li key={i} class="fw-change-item">{change}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// Main Widget Component
export const Widget: FunctionalComponent = () => {
  const [activeTab, setActiveTab] = useState<Tab>('feedback');
  const [feedback, setFeedback] = useState<FeedbackItem[]>(INITIAL_FEEDBACK);
  const [features, setFeatures] = useState<FeatureRequest[]>(INITIAL_FEATURES);

  const handleFeedbackSubmit = (item: Omit<FeedbackItem, 'id' | 'createdAt'>) => {
    setFeedback([
      {
        ...item,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      },
      ...feedback,
    ]);
  };

  const handleFeatureVote = (id: string) => {
    setFeatures(features.map((f) =>
      f.id === id ? { ...f, votes: f.votes + 1 } : f
    ));
  };

  const handleFeatureSubmit = (item: { title: string; description: string }) => {
    setFeatures([
      {
        ...item,
        id: Date.now().toString(),
        votes: 1,
        status: 'under-review',
        createdAt: new Date().toISOString().split('T')[0],
      },
      ...features,
    ]);
  };

  return (
    <div class="fw-widget">
      <div class="fw-header">
        <div class="fw-header-content">
          <h2>Product Feedback</h2>
          <p>Share your ideas and help us build a better product</p>
        </div>
      </div>

      <div class="fw-tabs">
        <TabButton active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')}>
          Feedback
        </TabButton>
        <TabButton active={activeTab === 'features'} onClick={() => setActiveTab('features')}>
          Requests
        </TabButton>
        <TabButton active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')}>
          Roadmap
        </TabButton>
        <TabButton active={activeTab === 'changelog'} onClick={() => setActiveTab('changelog')}>
          Updates
        </TabButton>
      </div>

      <div class="fw-content">
        {activeTab === 'feedback' && (
          <FeedbackTab feedback={feedback} onSubmit={handleFeedbackSubmit} />
        )}
        {activeTab === 'features' && (
          <FeaturesTab
            features={features}
            onVote={handleFeatureVote}
            onSubmit={handleFeatureSubmit}
          />
        )}
        {activeTab === 'roadmap' && <RoadmapTab items={ROADMAP_ITEMS} />}
        {activeTab === 'changelog' && <ChangelogTab entries={CHANGELOG_ENTRIES} />}
      </div>

      <div class="fw-footer">
        <span>Powered by Feedback Widget</span>
      </div>
    </div>
  );
};

// Popup wrapper component
export const PopupWidget: FunctionalComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button class="fw-popup-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseIcon /> : <MessageIcon />}
      </button>
      <div class={`fw-popup-container ${isOpen ? '' : 'hidden'}`}>
        <Widget />
      </div>
    </div>
  );
};

export default Widget;
