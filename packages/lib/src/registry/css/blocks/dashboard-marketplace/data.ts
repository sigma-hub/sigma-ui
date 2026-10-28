import type { Component } from 'vue';
import {
  BellRingIcon,
  CalendarIcon,
  ChartLineIcon,
  CloudIcon,
  DatabaseIcon,
  FileTextIcon,
  GitBranchIcon,
  MailIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from '@lucide/vue';

export type MarketplaceTab = 'browse' | 'installed' | 'updates';
export type MarketplaceBadge = 'official' | 'community';

export interface MarketplaceCategory {
  value: string;
  label: string;
}

export interface MarketplaceApp {
  id: string;
  name: string;
  publisher: string;
  description: string;
  icon: Component;
  category: string;
  badge: MarketplaceBadge;
  /** Latest published version. */
  version: string;
  featured?: boolean;
  /** When set, the app cannot be installed and this text explains why. */
  incompatibleReason?: string;
  installed: boolean;
  installedVersion?: string;
  /** 0-100 while an install or update is running, otherwise null. */
  progress: number | null;
}

export const pageTitle = 'Integrations';
export const pageDescription = 'Connect your workspace to the tools your team already uses.';
export const searchPlaceholder = 'Search integrations';

export const categories: MarketplaceCategory[] = [
  { value: 'all', label: 'All' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'developer', label: 'Developer' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'communication', label: 'Communication' },
  { value: 'security', label: 'Security' },
];

export const initialApps: MarketplaceApp[] = [
  {
    id: 'git-sync',
    name: 'Git Sync',
    publisher: 'Northwind',
    description: 'Mirror repositories and keep branches in sync across every workspace automatically.',
    icon: GitBranchIcon,
    category: 'developer',
    badge: 'official',
    version: '2.5.0',
    installed: true,
    installedVersion: '2.4.0',
    progress: null,
  },
  {
    id: 'pulse-analytics',
    name: 'Pulse Analytics',
    publisher: 'Northwind',
    description: 'Track product usage with ready-made dashboards, funnels and weekly reports.',
    icon: ChartLineIcon,
    category: 'analytics',
    badge: 'official',
    version: '1.8.2',
    featured: true,
    installed: false,
    progress: null,
  },
  {
    id: 'relay-chat',
    name: 'Relay Chat',
    publisher: 'Open Relay',
    description: 'Post updates, alerts and daily summaries to your team channels.',
    icon: MessageSquareIcon,
    category: 'communication',
    badge: 'community',
    version: '3.1.0',
    installed: true,
    installedVersion: '3.1.0',
    progress: null,
  },
  {
    id: 'calendar-bridge',
    name: 'Calendar Bridge',
    publisher: 'Northwind',
    description: 'Show deadlines and releases in your calendar and block focus time for reviews.',
    icon: CalendarIcon,
    category: 'productivity',
    badge: 'official',
    version: '1.2.4',
    featured: true,
    installed: false,
    progress: null,
  },
  {
    id: 'inbox-digest',
    name: 'Inbox Digest',
    publisher: 'Mailroom Labs',
    description: 'Collect notifications into one digest email instead of dozens of separate messages.',
    icon: MailIcon,
    category: 'communication',
    badge: 'community',
    version: '0.9.3',
    installed: false,
    progress: null,
  },
  {
    id: 'cloud-backup',
    name: 'Cloud Backup',
    publisher: 'Northwind',
    description: 'Schedule encrypted backups of your data to the storage provider of your choice.',
    icon: CloudIcon,
    category: 'developer',
    badge: 'official',
    version: '2.0.1',
    installed: false,
    progress: null,
  },
  {
    id: 'access-guard',
    name: 'Access Guard',
    publisher: 'Northwind',
    description: 'Single sign-on, session policies and audit logs for larger teams.',
    icon: ShieldCheckIcon,
    category: 'security',
    badge: 'official',
    version: '4.0.0',
    incompatibleReason: 'Requires version 3.2 or later',
    installed: false,
    progress: null,
  },
  {
    id: 'alert-rules',
    name: 'Alert Rules',
    publisher: 'Signal Works',
    description: 'Create rules that notify you when a metric crosses a threshold.',
    icon: BellRingIcon,
    category: 'analytics',
    badge: 'community',
    version: '1.4.0',
    installed: false,
    progress: null,
  },
  {
    id: 'doc-exporter',
    name: 'Doc Exporter',
    publisher: 'Paperline',
    description: 'Export pages and reports to PDF, Markdown or Word with your own templates.',
    icon: FileTextIcon,
    category: 'productivity',
    badge: 'community',
    version: '1.1.0',
    installed: true,
    installedVersion: '1.0.2',
    progress: null,
  },
  {
    id: 'warehouse-loader',
    name: 'Warehouse Loader',
    publisher: 'Northwind',
    description: 'Stream events to your data warehouse every few minutes with schema checks.',
    icon: DatabaseIcon,
    category: 'analytics',
    badge: 'official',
    version: '2.2.0',
    installed: false,
    progress: null,
  },
  {
    id: 'workflow-builder',
    name: 'Workflow Builder',
    publisher: 'Northwind',
    description: 'Automate repetitive work with a visual builder for triggers, conditions and actions.',
    icon: WorkflowIcon,
    category: 'productivity',
    badge: 'official',
    version: '1.6.0',
    featured: true,
    installed: false,
    progress: null,
  },
];
