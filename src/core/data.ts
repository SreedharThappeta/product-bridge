// Shared data and state management for the widget

import type { FeedbackItem, FeatureRequest, RoadmapItem, ChangelogEntry } from './types';

// Dummy data - replace with API calls later
export const INITIAL_FEEDBACK: FeedbackItem[] = [
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

export const INITIAL_FEATURES: FeatureRequest[] = [
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

export const ROADMAP_ITEMS: RoadmapItem[] = [
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

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
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

// Simple state management for standalone embeds
export function createWidgetStore() {
  let feedback = [...INITIAL_FEEDBACK];
  let features = [...INITIAL_FEATURES];
  let listeners: (() => void)[] = [];

  const notify = () => listeners.forEach(l => l());

  return {
    getFeedback: () => feedback,
    getFeatures: () => features,
    getRoadmap: () => ROADMAP_ITEMS,
    getChangelog: () => CHANGELOG_ENTRIES,

    addFeedback: (item: Omit<FeedbackItem, 'id' | 'createdAt'>) => {
      feedback = [{
        ...item,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      }, ...feedback];
      notify();
    },

    addFeature: (item: { title: string; description: string }) => {
      features = [{
        ...item,
        id: Date.now().toString(),
        votes: 1,
        status: 'under-review' as const,
        createdAt: new Date().toISOString().split('T')[0],
      }, ...features];
      notify();
    },

    voteFeature: (id: string) => {
      features = features.map(f =>
        f.id === id ? { ...f, votes: f.votes + 1 } : f
      );
      notify();
    },

    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
  };
}
