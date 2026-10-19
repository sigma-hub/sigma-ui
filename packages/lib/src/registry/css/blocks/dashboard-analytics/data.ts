import type { Component } from 'vue';
import { ActivityIcon, CreditCardIcon, DollarSignIcon, UsersIcon } from '@lucide/vue';

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export type AccountMenuEntry =
  | { id: string; kind: 'label'; label: string }
  | { id: string; kind: 'separator' }
  | { id: string; kind: 'action'; label: string };

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  icon: Component;
}

export interface TransactionColumnLabels {
  customer: string;
  type: string;
  status: string;
  date: string;
  amount: string;
}

export interface TransactionRow {
  id: string;
  customerName: string;
  email: string;
  type: string;
  status: string;
  date: string;
  amount: string;
}

export interface SaleRow {
  id: string;
  name: string;
  email: string;
  amount: string;
}

export const brandName = 'Acme Inc';

export const brandHref = '#';

export const searchPlaceholder = 'Search products...';

export const navigationLabel = 'Toggle navigation menu';

export const userMenuLabel = 'Toggle user menu';

export const headerLinks: NavLink[] = [
  { label: 'Dashboard', href: '#', isActive: true },
  { label: 'Orders', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Customers', href: '#' },
  { label: 'Analytics', href: '#' },
];

export const accountMenu: AccountMenuEntry[] = [
  { id: 'account-label', kind: 'label', label: 'My Account' },
  { id: 'account-separator', kind: 'separator' },
  { id: 'settings', kind: 'action', label: 'Settings' },
  { id: 'support', kind: 'action', label: 'Support' },
  { id: 'logout-separator', kind: 'separator' },
  { id: 'logout', kind: 'action', label: 'Logout' },
];

export const statCards: StatCardData[] = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: DollarSignIcon },
  { title: 'Subscriptions', value: '+2350', change: '+180.1% from last month', icon: UsersIcon },
  { title: 'Sales', value: '+12,234', change: '+19% from last month', icon: CreditCardIcon },
  { title: 'Active Now', value: '+573', change: '+201 since last hour', icon: ActivityIcon },
];

export const transactionsTitle = 'Transactions';

export const transactionsDescription = 'Recent transactions from your store.';

export const transactionsActionLabel = 'View All';

export const transactionsActionHref = '#';

export const transactionColumnLabels: TransactionColumnLabels = {
  customer: 'Customer',
  type: 'Type',
  status: 'Status',
  date: 'Date',
  amount: 'Amount',
};

export const transactions: TransactionRow[] = [
  { id: 'liam-johnson-2023-06-23', customerName: 'Liam Johnson', email: 'liam@example.com', type: 'Sale', status: 'Approved', date: '2023-06-23', amount: '$250.00' },
  { id: 'olivia-smith-2023-06-24', customerName: 'Olivia Smith', email: 'olivia@example.com', type: 'Refund', status: 'Declined', date: '2023-06-24', amount: '$150.00' },
  { id: 'noah-williams-2023-06-25', customerName: 'Noah Williams', email: 'noah@example.com', type: 'Subscription', status: 'Approved', date: '2023-06-25', amount: '$350.00' },
  { id: 'emma-brown-2023-06-26', customerName: 'Emma Brown', email: 'emma@example.com', type: 'Sale', status: 'Approved', date: '2023-06-26', amount: '$450.00' },
  { id: 'liam-johnson-2023-06-27', customerName: 'Liam Johnson', email: 'liam@example.com', type: 'Sale', status: 'Approved', date: '2023-06-27', amount: '$550.00' },
];

export const recentSalesTitle = 'Recent Sales';

export const recentSales: SaleRow[] = [
  { id: 'olivia-martin', name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
  { id: 'jackson-lee', name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
  { id: 'isabella-nguyen', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
  { id: 'william-kim', name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
  { id: 'sofia-davis', name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
];
