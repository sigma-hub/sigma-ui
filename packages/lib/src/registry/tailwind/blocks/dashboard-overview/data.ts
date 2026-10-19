import type { Component } from 'vue';
import { ActivityIcon, CreditCardIcon, DollarSignIcon, UsersIcon } from '@lucide/vue';

export interface NavLink {
  label: string;
  isActive?: boolean;
}

export interface Team {
  label: string;
  value: string;
}

export interface TeamGroup {
  label: string;
  teams: Team[];
}

export interface PlanOption {
  value: string;
  label: string;
  detail: string;
}

export type AccountMenuEntry =
  | { id: string; kind: 'label'; label: string; detail?: string }
  | { id: string; kind: 'separator' }
  | { id: string; kind: 'action'; label: string; shortcut?: string };

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  icon: Component;
}

export interface SaleRow {
  id: string;
  name: string;
  email: string;
  amount: string;
  initials: string;
}

export interface OverviewPoint {
  name: string;
  total: number;
}

export const pageTitle = 'Dashboard';
export const downloadLabel = 'Download';
export const searchPlaceholder = 'Search...';
export const userMenuLabel = 'Open user menu';
export const userName = 'sigma-ui';
export const userEmail = 'sigma-ui@example.com';
export const overviewTabLabel = 'Overview';
export const analyticsTabLabel = 'Analytics';
export const reportsTabLabel = 'Reports';
export const notificationsTabLabel = 'Notifications';
export const overviewCardTitle = 'Overview';
export const recentSalesTitle = 'Recent Sales';
export const recentSalesDescription = 'You made 265 sales this month.';
export const datePlaceholder = 'Pick a date';
export const teamPlaceholder = 'Search team...';
export const emptyTeamLabel = 'No team found.';
export const createTeamLabel = 'Create Team';
export const createTeamTitle = 'Create team';
export const createTeamDescription = 'Add a new team to manage products and customers.';
export const teamNameLabel = 'Team name';
export const teamNamePlaceholder = 'Acme Inc.';
export const planLabel = 'Subscription plan';
export const planPlaceholder = 'Select a plan';
export const cancelLabel = 'Cancel';
export const continueLabel = 'Continue';

export const navigation: NavLink[] = [
  { label: 'Overview', isActive: true },
  { label: 'Customers' },
  { label: 'Products' },
  { label: 'Settings' },
];

export const teamGroups: TeamGroup[] = [
  {
    label: 'Personal Account',
    teams: [{ label: 'Alicia Koch', value: 'personal' }],
  },
  {
    label: 'Teams',
    teams: [
      { label: 'Acme Inc.', value: 'acme-inc' },
      { label: 'Monsters Inc.', value: 'monsters' },
    ],
  },
];

export const plans: PlanOption[] = [
  { value: 'free', label: 'Free', detail: 'Trial for two weeks' },
  { value: 'pro', label: 'Pro', detail: '$9/month per user' },
];

export const accountMenu: AccountMenuEntry[] = [
  { id: 'account', kind: 'label', label: userName, detail: userEmail },
  { id: 'account-separator', kind: 'separator' },
  { id: 'profile', kind: 'action', label: 'Profile', shortcut: '⇧⌘P' },
  { id: 'billing', kind: 'action', label: 'Billing', shortcut: '⌘B' },
  { id: 'settings', kind: 'action', label: 'Settings', shortcut: '⌘S' },
  { id: 'team', kind: 'action', label: 'New Team' },
  { id: 'logout-separator', kind: 'separator' },
  { id: 'logout', kind: 'action', label: 'Log out', shortcut: '⇧⌘Q' },
];

export const statCards: StatCardData[] = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: DollarSignIcon },
  { title: 'Subscriptions', value: '+2350', change: '+180.1% from last month', icon: UsersIcon },
  { title: 'Sales', value: '+12,234', change: '+19% from last month', icon: CreditCardIcon },
  { title: 'Active Now', value: '+573', change: '+201 since last hour', icon: ActivityIcon },
];

export const overview: OverviewPoint[] = [
  { name: 'Jan', total: 1800 },
  { name: 'Feb', total: 2400 },
  { name: 'Mar', total: 3200 },
  { name: 'Apr', total: 2800 },
  { name: 'May', total: 4100 },
  { name: 'Jun', total: 3600 },
  { name: 'Jul', total: 4500 },
  { name: 'Aug', total: 3900 },
  { name: 'Sep', total: 4700 },
  { name: 'Oct', total: 4200 },
  { name: 'Nov', total: 5100 },
  { name: 'Dec', total: 4800 },
];

export const recentSales: SaleRow[] = [
  { id: 'olivia', name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00', initials: 'OM' },
  { id: 'jackson', name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00', initials: 'JL' },
  { id: 'isabella', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00', initials: 'IN' },
  { id: 'william', name: 'William Kim', email: 'will@email.com', amount: '+$99.00', initials: 'WK' },
  { id: 'sofia', name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00', initials: 'SD' },
];
