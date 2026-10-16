import type { Component } from 'vue';
import { HomeIcon, LineChartIcon, PackageIcon, ShoppingCartIcon, UsersIcon } from 'lucide-vue-next';

export interface NavLink {
  label: string;
  href: string;
  icon: Component;
  isActive?: boolean;
  badge?: string;
}

export interface BrandLink {
  name: string;
  href: string;
}

export type AccountMenuEntry =
  | { id: string; kind: 'label'; label: string }
  | { id: string; kind: 'separator' }
  | { id: string; kind: 'action'; label: string };

export interface UpgradeCardData {
  title: string;
  description: string;
  actionLabel: string;
}

export interface EmptyStateData {
  title: string;
  description: string;
  actionLabel: string;
}

export const desktopBrand: BrandLink = {
  name: 'Acme Inc',
  href: '/',
};

export const mobileBrand: BrandLink = {
  name: 'Acme Inc',
  href: '#',
};

export const searchPlaceholder = 'Search products...';

export const navigationLabel = 'Toggle navigation menu';

export const notificationsLabel = 'Toggle notifications';

export const userMenuLabel = 'Toggle user menu';

export const inventoryTitle = 'Inventory';

export const desktopLinks: NavLink[] = [
  { label: 'Dashboard', href: '/', icon: HomeIcon },
  { label: 'Orders', href: '#', icon: ShoppingCartIcon, badge: '6' },
  { label: 'Products', href: '#', icon: PackageIcon, isActive: true },
  { label: 'Customers', href: '#', icon: UsersIcon },
  { label: 'Analytics', href: '#', icon: LineChartIcon },
];

export const mobileLinks: NavLink[] = [
  { label: 'Dashboard', href: '#', icon: HomeIcon },
  { label: 'Orders', href: '#', icon: ShoppingCartIcon, badge: '6', isActive: true },
  { label: 'Products', href: '#', icon: PackageIcon },
  { label: 'Customers', href: '#', icon: UsersIcon },
  { label: 'Analytics', href: '#', icon: LineChartIcon },
];

export const accountMenu: AccountMenuEntry[] = [
  { id: 'account-label', kind: 'label', label: 'My Account' },
  { id: 'account-separator', kind: 'separator' },
  { id: 'settings', kind: 'action', label: 'Settings' },
  { id: 'support', kind: 'action', label: 'Support' },
  { id: 'logout-separator', kind: 'separator' },
  { id: 'logout', kind: 'action', label: 'Logout' },
];

export const upgradeCard: UpgradeCardData = {
  title: 'Upgrade to Pro',
  description: 'Unlock all features and get unlimited access to our support team.',
  actionLabel: 'Upgrade',
};

export const emptyState: EmptyStateData = {
  title: 'You have no products',
  description: 'You can start selling as soon as you add a product.',
  actionLabel: 'Add Product',
};
