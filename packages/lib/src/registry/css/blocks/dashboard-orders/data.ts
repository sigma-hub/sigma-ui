import type { Component } from 'vue';
import {
  HomeIcon,
  LineChartIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  Users2Icon,
} from '@lucide/vue';

export interface NavItem {
  label: string;
  icon: Component;
  isActive?: boolean;
}

export interface StatCard {
  description: string;
  value: string;
  valueSize: 'large' | 'default';
  change: string;
  progress: number;
  progressLabel: string;
}

export type OrderStatus = 'Fulfilled' | 'Declined';

export interface Order {
  customer: string;
  email: string;
  type: string;
  status: OrderStatus;
  badgeVariant: 'outline' | 'secondary';
  date: string;
  amount: string;
  isSelected?: boolean;
}

export interface OrderTab {
  value: string;
  label: string;
}

export interface HeaderCopy {
  toggleMenu: string;
  searchPlaceholder: string;
  toggleAccount: string;
  accountLabel: string;
}

export interface OrdersIntro {
  title: string;
  description: string;
  action: string;
}

export interface OrdersTableCopy {
  title: string;
  description: string;
  filter: string;
  filterBy: string;
  export: string;
}

export interface OrderColumns {
  customer: string;
  type: string;
  status: string;
  date: string;
  amount: string;
}

export interface OrderDetailCopy {
  id: string;
  date: string;
  copyId: string;
  trackOrder: string;
  more: string;
  details: string;
  shipping: string;
  billing: string;
  customer: string;
  payment: string;
  updated: string;
}

export interface SelectedOrder {
  id: string;
  date: string;
  updatedAt: {
    dateTime: string;
    label: string;
  };
}

export interface PaymentMethod {
  brand: string;
  maskedNumber: string;
}

export interface OrderLineItem {
  name: string;
  quantity: number;
  price: string;
}

export interface OrderSummaryLine {
  label: string;
  value: string;
  isTotal?: boolean;
}

export interface CustomerField {
  label: string;
  value: string;
  href?: string;
}

export const sidebarNavItems: NavItem[] = [
  { label: 'Dashboard', icon: HomeIcon },
  { label: 'Orders', icon: ShoppingCartIcon, isActive: true },
  { label: 'Products', icon: PackageIcon },
  { label: 'Customers', icon: Users2Icon },
  { label: 'Analytics', icon: LineChartIcon },
];

export const sidebarFooterItems: NavItem[] = [
  { label: 'Settings', icon: SettingsIcon },
];

export const mobileNavItems: NavItem[] = [
  { label: 'Dashboard', icon: HomeIcon },
  { label: 'Orders', icon: ShoppingCartIcon, isActive: true },
  { label: 'Products', icon: PackageIcon },
  { label: 'Customers', icon: Users2Icon },
  { label: 'Settings', icon: LineChartIcon },
];

export const breadcrumbLinks: string[] = ['Dashboard', 'Orders'];

export const breadcrumbPage = 'Recent Orders';

export const accountMenuGroups: string[][] = [
  ['Settings', 'Support'],
  ['Logout'],
];

export const statCards: StatCard[] = [
  {
    description: 'This Week',
    value: '$1329',
    valueSize: 'large',
    change: '+25% from last week',
    progress: 25,
    progressLabel: '25% increase',
  },
  {
    description: 'This Month',
    value: '$5,329',
    valueSize: 'default',
    change: '+10% from last month',
    progress: 12,
    progressLabel: '12% increase',
  },
];

export const orderTabs: OrderTab[] = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

export const defaultOrderTab = 'week';

export const orderFilters: string[] = ['Fulfilled', 'Declined', 'Refunded'];

export const orders: Order[] = [
  { customer: 'Liam Johnson', email: 'liam@example.com', type: 'Sale', status: 'Fulfilled', badgeVariant: 'secondary', date: '2023-06-23', amount: '$250.00', isSelected: true },
  { customer: 'Olivia Smith', email: 'olivia@example.com', type: 'Refund', status: 'Declined', badgeVariant: 'outline', date: '2023-06-24', amount: '$150.00' },
  { customer: 'Noah Williams', email: 'noah@example.com', type: 'Subscription', status: 'Fulfilled', badgeVariant: 'secondary', date: '2023-06-25', amount: '$350.00' },
  { customer: 'Emma Brown', email: 'emma@example.com', type: 'Sale', status: 'Fulfilled', badgeVariant: 'secondary', date: '2023-06-26', amount: '$450.00' },
  { customer: 'Liam Johnson', email: 'liam@example.com', type: 'Sale', status: 'Fulfilled', badgeVariant: 'secondary', date: '2023-06-23', amount: '$250.00' },
  { customer: 'Liam Johnson', email: 'liam@example.com', type: 'Sale', status: 'Fulfilled', badgeVariant: 'secondary', date: '2023-06-23', amount: '$250.00' },
  { customer: 'Olivia Smith', email: 'olivia@example.com', type: 'Refund', status: 'Declined', badgeVariant: 'outline', date: '2023-06-24', amount: '$150.00' },
  { customer: 'Emma Brown', email: 'emma@example.com', type: 'Sale', status: 'Fulfilled', badgeVariant: 'secondary', date: '2023-06-26', amount: '$450.00' },
];

export const selectedOrder: SelectedOrder = {
  id: 'Oe31b70H',
  date: 'November 23, 2023',
  updatedAt: { dateTime: '2023-11-23', label: 'November 23, 2023' },
};

export const orderActionGroups: string[][] = [
  ['Edit', 'Export'],
  ['Trash'],
];

export const orderLineItems: OrderLineItem[] = [
  { name: 'Glimmer Lamps', quantity: 2, price: '$250.00' },
  { name: 'Aqua Filters', quantity: 1, price: '$49.00' },
];

export const orderSummaryLines: OrderSummaryLine[] = [
  { label: 'Subtotal', value: '$299.00' },
  { label: 'Shipping', value: '$5.00' },
  { label: 'Tax', value: '$25.00' },
  { label: 'Total', value: '$329.00', isTotal: true },
];

export const shippingAddressLines: string[] = ['Liam Johnson', '1234 Main St.', 'Anytown, CA 12345'];

export const billingInformation = 'Same as shipping address';

export const customerFields: CustomerField[] = [
  { label: 'Customer', value: 'Liam Johnson' },
  { label: 'Email', value: 'liam@acme.com', href: 'mailto:' },
  { label: 'Phone', value: '+1 234 567 890', href: 'tel:' },
];

export const paymentMethod: PaymentMethod = {
  brand: 'Visa',
  maskedNumber: '**** **** **** 4532',
};

export const brandName = 'Acme Inc';

export const paginationPageSize = 10;

export const headerCopy: HeaderCopy = {
  toggleMenu: 'Toggle Menu',
  searchPlaceholder: 'Search...',
  toggleAccount: 'Toggle user menu',
  accountLabel: 'My Account',
};

export const ordersIntro: OrdersIntro = {
  title: 'Your Orders',
  description: 'Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.',
  action: 'Create New Order',
};

export const ordersTableCopy: OrdersTableCopy = {
  title: 'Orders',
  description: 'Recent orders from your store.',
  filter: 'Filter',
  filterBy: 'Filter by',
  export: 'Export',
};

export const orderColumns: OrderColumns = {
  customer: 'Customer',
  type: 'Type',
  status: 'Status',
  date: 'Date',
  amount: 'Amount',
};

export const orderDetailCopy: OrderDetailCopy = {
  id: 'Order ID:',
  date: 'Date:',
  copyId: 'Copy Order ID',
  trackOrder: 'Track Order',
  more: 'More',
  details: 'Order Details',
  shipping: 'Shipping Information',
  billing: 'Billing Information',
  customer: 'Customer Information',
  payment: 'Payment Information',
  updated: 'Updated',
};
