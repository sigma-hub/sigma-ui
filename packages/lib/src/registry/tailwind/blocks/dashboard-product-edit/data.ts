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

export interface BreadcrumbLinkItem {
  label: string;
  href: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface StockVariant {
  id: number;
  sku: string;
  stock: string;
  price: string;
  priceLabel: string;
  defaultSize: string;
}

export interface ProductImage {
  alt: string;
  src: string;
  size: number;
}

export const sidebarNavItems: NavItem[] = [
  { label: 'Dashboard', icon: HomeIcon },
  { label: 'Orders', icon: ShoppingCartIcon, isActive: true },
  { label: 'Products', icon: PackageIcon },
  { label: 'Customers', icon: Users2Icon },
  { label: 'Analytics', icon: LineChartIcon },
];

export const sidebarFooterNavItems: NavItem[] = [
  { label: 'Settings', icon: SettingsIcon },
];

export const mobileNavItems: NavItem[] = [
  { label: 'Dashboard', icon: HomeIcon },
  { label: 'Orders', icon: ShoppingCartIcon },
  { label: 'Products', icon: PackageIcon, isActive: true },
  { label: 'Customers', icon: Users2Icon },
  { label: 'Settings', icon: LineChartIcon },
];

export const breadcrumbLinks: BreadcrumbLinkItem[] = [
  { label: 'Dashboard', href: '#' },
  { label: 'Products', href: '#' },
];

export const breadcrumbPage = 'Edit Product';

export const productName = 'Gamer Gear Pro Controller';

export const productDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.';

export const sizeOptions: SelectOption[] = [
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
];

export const stockVariants: StockVariant[] = [
  { id: 1, sku: 'GGPC-001', stock: '100', price: '99.99', priceLabel: 'Price', defaultSize: 's' },
  { id: 2, sku: 'GGPC-002', stock: '143', price: '99.99', priceLabel: 'Price', defaultSize: 'm' },
  { id: 3, sku: 'GGPC-003', stock: '32', price: '99.99', priceLabel: 'Stock', defaultSize: 's' },
];

export const categoryOptions: SelectOption[] = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'accessories', label: 'Accessories' },
];

export const subcategoryOptions: SelectOption[] = [
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'sweatshirts', label: 'Sweatshirts' },
];

export const statusOptions: SelectOption[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

export const mainProductImage: ProductImage = { alt: 'Product image', src: '/placeholder.svg', size: 300 };

export const productThumbnails: ProductImage[] = [
  { alt: 'Product image', src: '/placeholder.svg', size: 84 },
  { alt: 'Product image', src: '/placeholder.svg', size: 84 },
];
