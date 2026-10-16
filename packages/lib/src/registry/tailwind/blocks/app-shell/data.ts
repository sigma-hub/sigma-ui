import type { Component } from 'vue';
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  SquareTerminalIcon,
} from 'lucide-vue-next';

export interface ShellLink {
  title: string;
  isActive?: boolean;
}

export interface ShellSection {
  title: string;
  icon: Component;
  isActive?: boolean;
  links: ShellLink[];
}

export interface Highlight {
  label: string;
  value: string;
  detail: string;
}

export interface ActivityItem {
  title: string;
  detail: string;
}

export const workspaceName = 'Acme Inc';
export const workspacePlan = 'Enterprise';
export const groupLabel = 'Platform';
export const pageTitle = 'Overview';
export const userName = 'Jane Doe';
export const userEmail = 'jane@example.com';
export const userInitials = 'JD';
export const moreLabel = 'More';
export const activityTitle = 'Recent activity';

export const sections: ShellSection[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    isActive: true,
    links: [
      { title: 'Overview', isActive: true },
      { title: 'Analytics' },
      { title: 'Reports' },
    ],
  },
  {
    title: 'Playground',
    icon: SquareTerminalIcon,
    links: [
      { title: 'History' },
      { title: 'Starred' },
    ],
  },
  {
    title: 'Documentation',
    icon: BookOpenIcon,
    links: [
      { title: 'Introduction' },
      { title: 'Get started' },
      { title: 'Changelog' },
    ],
  },
  {
    title: 'Settings',
    icon: Settings2Icon,
    links: [
      { title: 'General' },
      { title: 'Team' },
      { title: 'Billing' },
    ],
  },
];

export const highlights: Highlight[] = [
  { label: 'Open orders', value: '128', detail: '12 waiting on fulfillment' },
  { label: 'Revenue', value: '$24.8k', detail: 'Up 8% from last week' },
  { label: 'Active users', value: '1,204', detail: '32 signed in today' },
];

export const activity: ActivityItem[] = [
  { title: 'Order #1042 shipped', detail: '2 hours ago' },
  { title: 'New team member invited', detail: 'Yesterday' },
  { title: 'Billing plan renewed', detail: '3 days ago' },
];
