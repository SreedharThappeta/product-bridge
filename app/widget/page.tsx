"use client";

import { useState } from "react";

// Types
type Tab = "feedback" | "features" | "roadmap" | "changelog";

interface FeedbackItem {
  id: string;
  type: "bug" | "suggestion" | "other";
  message: string;
  email?: string;
  createdAt: string;
}

interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  votes: number;
  status: "under-review" | "planned" | "in-progress" | "completed";
  createdAt: string;
}

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  quarter: string;
}

interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
  date: string;
}

// Dummy Data
const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: "1",
    type: "suggestion",
    message: "Would love to see dark mode support!",
    email: "user@example.com",
    createdAt: "2024-12-10",
  },
  {
    id: "2",
    type: "bug",
    message: "The submit button is not working on mobile Safari",
    createdAt: "2024-12-09",
  },
];

const INITIAL_FEATURES: FeatureRequest[] = [
  {
    id: "1",
    title: "Dark Mode",
    description: "Add support for dark mode theme",
    votes: 42,
    status: "planned",
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    title: "Email Notifications",
    description: "Get notified when someone replies to your feedback",
    votes: 28,
    status: "in-progress",
    createdAt: "2024-11-28",
  },
  {
    id: "3",
    title: "Export to CSV",
    description: "Export all feedback data to CSV format",
    votes: 15,
    status: "under-review",
    createdAt: "2024-11-25",
  },
  {
    id: "4",
    title: "Slack Integration",
    description: "Post new feedback directly to Slack channels",
    votes: 35,
    status: "completed",
    createdAt: "2024-11-20",
  },
];

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "1",
    title: "API Integrations",
    description: "Connect with Slack, Discord, and other tools",
    status: "in-progress",
    quarter: "Q1 2025",
  },
  {
    id: "2",
    title: "Analytics Dashboard",
    description: "View feedback trends and insights",
    status: "planned",
    quarter: "Q1 2025",
  },
  {
    id: "3",
    title: "Custom Branding",
    description: "Customize colors, logo, and styling",
    status: "planned",
    quarter: "Q2 2025",
  },
  {
    id: "4",
    title: "Multi-language Support",
    description: "Support for 10+ languages",
    status: "planned",
    quarter: "Q2 2025",
  },
];

const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    id: "1",
    version: "1.2.0",
    title: "Feature Requests & Voting",
    description: "Users can now submit and vote on feature requests",
    changes: [
      "Added feature request submission form",
      "Implemented upvoting system",
      "Added status badges for features",
    ],
    date: "2024-12-08",
  },
  {
    id: "2",
    version: "1.1.0",
    title: "Improved Feedback Form",
    description: "Enhanced the feedback submission experience",
    changes: [
      "Added feedback categories (bug, suggestion, other)",
      "Optional email field for follow-ups",
      "Better mobile responsiveness",
    ],
    date: "2024-11-25",
  },
  {
    id: "3",
    version: "1.0.0",
    title: "Initial Release",
    description: "First public release of the feedback widget",
    changes: [
      "Basic feedback submission",
      "Embeddable widget script",
      "Simple and clean UI",
    ],
    date: "2024-11-10",
  },
];

// Tab Button Component
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "under-review": "bg-yellow-100 text-yellow-800",
    planned: "bg-blue-100 text-blue-800",
    "in-progress": "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || "bg-gray-100 text-gray-800"}`}
    >
      {status.replace("-", " ")}
    </span>
  );
}

// Feedback Tab Component
function FeedbackTab({
  feedback,
  onSubmit,
}: {
  feedback: FeedbackItem[];
  onSubmit: (item: Omit<FeedbackItem, "id" | "createdAt">) => void;
}) {
  const [type, setType] = useState<"bug" | "suggestion" | "other">("suggestion");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSubmit({ type, message, email: email || undefined });
    setMessage("");
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Submit Feedback</h3>

        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Type</label>
          <div className="flex gap-2">
            {(["suggestion", "bug", "other"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-3 py-1 text-sm rounded-full capitalize ${
                  type === t
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Message *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you think..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            Email (optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Submit Feedback
        </button>

        {submitted && (
          <p className="mt-2 text-sm text-green-600 text-center">
            Thank you for your feedback!
          </p>
        )}
      </form>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Recent Feedback</h3>
        <div className="space-y-3">
          {feedback.map((item) => (
            <div key={item.id} className="p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${
                    item.type === "bug"
                      ? "bg-red-100 text-red-800"
                      : item.type === "suggestion"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.type}
                </span>
                <span className="text-xs text-gray-500">{item.createdAt}</span>
              </div>
              <p className="text-sm text-gray-700">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Features Tab Component
function FeaturesTab({
  features,
  onVote,
  onSubmit,
}: {
  features: FeatureRequest[];
  onVote: (id: string) => void;
  onSubmit: (item: { title: string; description: string }) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  const sortedFeatures = [...features].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Feature Requests</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showForm ? "Cancel" : "+ Request Feature"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Feature name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the feature..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
          >
            Submit Request
          </button>
        </form>
      )}

      <div className="space-y-3">
        {sortedFeatures.map((feature) => (
          <div
            key={feature.id}
            className="p-3 bg-white border border-gray-200 rounded-lg flex gap-3"
          >
            <button
              onClick={() => onVote(feature.id)}
              className="flex flex-col items-center justify-center px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors min-w-[50px]"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-900">
                {feature.votes}
              </span>
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900">{feature.title}</h4>
                <StatusBadge status={feature.status} />
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Roadmap Tab Component
function RoadmapTab({ items }: { items: RoadmapItem[] }) {
  const groupedByQuarter = items.reduce(
    (acc, item) => {
      if (!acc[item.quarter]) acc[item.quarter] = [];
      acc[item.quarter].push(item);
      return acc;
    },
    {} as Record<string, RoadmapItem[]>
  );

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">Product Roadmap</h3>
      <div className="space-y-6">
        {Object.entries(groupedByQuarter).map(([quarter, quarterItems]) => (
          <div key={quarter}>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {quarter}
            </h4>
            <div className="space-y-2">
              {quarterItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900">{item.title}</h5>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Changelog Tab Component
function ChangelogTab({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">Changelog</h3>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                v{entry.version}
              </span>
              <span className="text-sm text-gray-500">{entry.date}</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{entry.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{entry.description}</p>
            <ul className="space-y-1">
              {entry.changes.map((change, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">+</span>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Widget Component
export default function WidgetPage() {
  const [activeTab, setActiveTab] = useState<Tab>("feedback");
  const [feedback, setFeedback] = useState<FeedbackItem[]>(INITIAL_FEEDBACK);
  const [features, setFeatures] = useState<FeatureRequest[]>(INITIAL_FEATURES);

  const handleFeedbackSubmit = (item: Omit<FeedbackItem, "id" | "createdAt">) => {
    const newFeedback: FeedbackItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setFeedback([newFeedback, ...feedback]);
  };

  const handleFeatureVote = (id: string) => {
    setFeatures(
      features.map((f) => (f.id === id ? { ...f, votes: f.votes + 1 } : f))
    );
  };

  const handleFeatureSubmit = (item: { title: string; description: string }) => {
    const newFeature: FeatureRequest = {
      ...item,
      id: Date.now().toString(),
      votes: 1,
      status: "under-review",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setFeatures([newFeature, ...features]);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Feedback</h2>
        <p className="text-sm text-gray-500">Help us improve our product</p>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-gray-200 flex gap-2 overflow-x-auto">
        <TabButton
          active={activeTab === "feedback"}
          onClick={() => setActiveTab("feedback")}
        >
          Feedback
        </TabButton>
        <TabButton
          active={activeTab === "features"}
          onClick={() => setActiveTab("features")}
        >
          Features
        </TabButton>
        <TabButton
          active={activeTab === "roadmap"}
          onClick={() => setActiveTab("roadmap")}
        >
          Roadmap
        </TabButton>
        <TabButton
          active={activeTab === "changelog"}
          onClick={() => setActiveTab("changelog")}
        >
          Changelog
        </TabButton>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[500px] overflow-y-auto">
        {activeTab === "feedback" && (
          <FeedbackTab feedback={feedback} onSubmit={handleFeedbackSubmit} />
        )}
        {activeTab === "features" && (
          <FeaturesTab
            features={features}
            onVote={handleFeatureVote}
            onSubmit={handleFeatureSubmit}
          />
        )}
        {activeTab === "roadmap" && <RoadmapTab items={ROADMAP_ITEMS} />}
        {activeTab === "changelog" && <ChangelogTab entries={CHANGELOG_ENTRIES} />}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center">
        <span className="text-xs text-gray-400">Powered by Feedback Widget</span>
      </div>
    </div>
  );
}
