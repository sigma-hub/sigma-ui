import type { Component } from 'vue';
import {
  HomeIcon,
  LineChartIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  Users2Icon,
} from '@lucide/vue';

export type SidebarLinkTone = 'default' | 'muted' | 'active';

export interface SidebarLink {
  label: string;
  icon: Component;
  tone: SidebarLinkTone;
}

export interface MobileNavLink {
  label: string;
  icon: Component;
  isActive: boolean;
}

export interface ProductTab {
  value: string;
  label: string;
  isHiddenOnMobile: boolean;
}

export interface FilterOption {
  label: string;
  isSelected?: boolean;
}

export type ProductStatus = 'Active' | 'Draft';

export interface Product {
  name: string;
  status: ProductStatus;
  badgeVariant: 'outline' | 'secondary';
  price: string;
  totalSales: number;
  createdAt: string;
  imageUrl: string;
}

export interface HeaderCopy {
  toggleMenu: string;
  searchPlaceholder: string;
  toggleAccount: string;
  accountLabel: string;
}

export interface ProductsCopy {
  title: string;
  description: string;
  filter: string;
  filterBy: string;
  export: string;
  addProduct: string;
  imageAlt: string;
  imageColumn: string;
  nameColumn: string;
  statusColumn: string;
  actionsColumn: string;
  actionsMenu: string;
  rowMenu: string;
  showing: string;
  of: string;
  products: string;
}

export const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', icon: HomeIcon, tone: 'muted' },
  { label: 'Orders', icon: ShoppingCartIcon, tone: 'default' },
  { label: 'Products', icon: PackageIcon, tone: 'active' },
  { label: 'Customers', icon: Users2Icon, tone: 'muted' },
  { label: 'Analytics', icon: LineChartIcon, tone: 'muted' },
];

export const sidebarFooterLinks: SidebarLink[] = [
  { label: 'Settings', icon: SettingsIcon, tone: 'muted' },
];

export const mobileNavLinks: MobileNavLink[] = [
  { label: 'Dashboard', icon: HomeIcon, isActive: false },
  { label: 'Orders', icon: ShoppingCartIcon, isActive: false },
  { label: 'Products', icon: PackageIcon, isActive: true },
  { label: 'Customers', icon: Users2Icon, isActive: false },
  { label: 'Settings', icon: LineChartIcon, isActive: false },
];

export const breadcrumbLinks: string[] = ['Dashboard', 'Products'];

export const currentBreadcrumb = 'All Products';

export const productTabs: ProductTab[] = [
  { value: 'all', label: 'All', isHiddenOnMobile: false },
  { value: 'active', label: 'Active', isHiddenOnMobile: false },
  { value: 'draft', label: 'Draft', isHiddenOnMobile: false },
  { value: 'archived', label: 'Archived', isHiddenOnMobile: true },
];

export const filterOptions: FilterOption[] = [
  { label: 'Active', isSelected: true },
  { label: 'Draft' },
  { label: 'Archived' },
];

export const productDetailColumns: string[] = ['Price', 'Total Sales', 'Created at'];

export const productActions: string[] = ['Edit', 'Delete'];

export const products: Product[] = [
  {
    name: 'Laser Lemonade Machine',
    status: 'Draft',
    badgeVariant: 'outline',
    price: '$499.99',
    totalSales: 25,
    createdAt: '2023-07-12 10:42 AM',
    imageUrl: '/placeholder.svg',
  },
  {
    name: 'Hypernova Headphones',
    status: 'Active',
    badgeVariant: 'outline',
    price: '$129.99',
    totalSales: 100,
    createdAt: '2023-10-18 03:21 PM',
    imageUrl: '/placeholder.svg',
  },
  {
    name: 'AeroGlow Desk Lamp',
    status: 'Active',
    badgeVariant: 'outline',
    price: '$39.99',
    totalSales: 50,
    createdAt: '2023-11-29 08:15 AM',
    imageUrl: '/placeholder.svg',
  },
  {
    name: 'TechTonic Energy Drink',
    status: 'Draft',
    badgeVariant: 'secondary',
    price: '$2.99',
    totalSales: 0,
    createdAt: '2023-12-25 11:59 PM',
    imageUrl: '/placeholder.svg',
  },
  {
    name: 'Gamer Gear Pro Controller',
    status: 'Active',
    badgeVariant: 'outline',
    price: '$59.99',
    totalSales: 75,
    createdAt: '2024-01-01 12:00 AM',
    imageUrl: '/placeholder.svg',
  },
  {
    name: 'Luminous VR Headset',
    status: 'Active',
    badgeVariant: 'outline',
    price: '$199.99',
    totalSales: 30,
    createdAt: '2024-02-14 02:14 PM',
    imageUrl: '/placeholder.svg',
  },
];

export const productsSummary = {
  range: '1-10',
  total: 32,
};

export const brandName = 'Acme Inc';

export const defaultProductTab = 'all';

export const headerCopy: HeaderCopy = {
  toggleMenu: 'Toggle Menu',
  searchPlaceholder: 'Search...',
  toggleAccount: 'Toggle user menu',
  accountLabel: 'My Account',
};

export const accountMenuGroups: string[][] = [
  ['Settings', 'Support'],
  ['Logout'],
];

export const productsCopy: ProductsCopy = {
  title: 'Products',
  description: 'Manage your products and view their sales performance.',
  filter: 'Filter',
  filterBy: 'Filter by',
  export: 'Export',
  addProduct: 'Add Product',
  imageAlt: 'Product image',
  imageColumn: 'img',
  nameColumn: 'Name',
  statusColumn: 'Status',
  actionsColumn: 'Actions',
  actionsMenu: 'Actions',
  rowMenu: 'Toggle menu',
  showing: 'Showing',
  of: 'of',
  products: 'products',
};
