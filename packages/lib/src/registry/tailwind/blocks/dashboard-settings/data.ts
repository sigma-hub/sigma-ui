export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export type AccountMenuEntry =
  | { id: string; kind: 'label'; label: string }
  | { id: string; kind: 'separator' }
  | { id: string; kind: 'action'; label: string };

export interface SettingsLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface StoreNameCardData {
  title: string;
  description: string;
  placeholder: string;
  saveLabel: string;
}

export interface PluginsDirectoryCardData {
  title: string;
  description: string;
  placeholder: string;
  directory: string;
  checkboxId: string;
  checkboxLabel: string;
  includeChecked: boolean;
  saveLabel: string;
}

export const brandName = 'Acme Inc';

export const brandHref = '#';

export const searchPlaceholder = 'Search products...';

export const navigationLabel = 'Toggle navigation menu';

export const userMenuLabel = 'Toggle user menu';

export const pageTitle = 'Settings';

export const headerLinks: NavLink[] = [
  { label: 'Dashboard', href: '#' },
  { label: 'Orders', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Customers', href: '#' },
  { label: 'Settings', href: '#', isActive: true },
];

export const accountMenu: AccountMenuEntry[] = [
  { id: 'account-label', kind: 'label', label: 'My Account' },
  { id: 'account-separator', kind: 'separator' },
  { id: 'settings', kind: 'action', label: 'Settings' },
  { id: 'support', kind: 'action', label: 'Support' },
  { id: 'logout-separator', kind: 'separator' },
  { id: 'logout', kind: 'action', label: 'Logout' },
];

export const settingsLinks: SettingsLink[] = [
  { label: 'General', href: '#', isActive: true },
  { label: 'Security', href: '#' },
  { label: 'Integrations', href: '#' },
  { label: 'Support', href: '#' },
  { label: 'Organizations', href: '#' },
  { label: 'Advanced', href: '#' },
];

export const storeNameCard: StoreNameCardData = {
  title: 'Store Name',
  description: 'Used to identify your store in the marketplace.',
  placeholder: 'Store Name',
  saveLabel: 'Save',
};

export const pluginsDirectoryCard: PluginsDirectoryCardData = {
  title: 'Plugins Directory',
  description: 'The directory within your project, in which your plugins are located.',
  placeholder: 'Project Name',
  directory: '/content/plugins',
  checkboxId: 'include',
  checkboxLabel: 'Allow administrators to change the directory.',
  includeChecked: true,
  saveLabel: 'Save',
};
