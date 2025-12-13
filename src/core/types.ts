// Shared types for the feedback widget

export type Tab = "feedback" | "features" | "roadmap" | "changelog";

export type FeedbackType = "bug" | "suggestion" | "other";

export type FeatureStatus = "under-review" | "planned" | "in-progress" | "completed";

export type RoadmapStatus = "planned" | "in-progress" | "completed";

export interface FeedbackItem {
  id: string;
  type: FeedbackType;
  message: string;
  email?: string;
  createdAt: string;
}

export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  votes: number;
  status: FeatureStatus;
  createdAt: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  quarter: string;
}

export interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
  date: string;
}

export interface WidgetState {
  activeTab: Tab;
  feedback: FeedbackItem[];
  features: FeatureRequest[];
  roadmap: RoadmapItem[];
  changelog: ChangelogEntry[];
}

export interface WidgetConfig {
  baseUrl?: string;
  containerId?: string;
}
