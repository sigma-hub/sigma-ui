import type { Component } from 'vue';
import {
  BellIcon,
  DatabaseIcon,
  GlobeIcon,
  HomeIcon,
  LanguagesIcon,
  MailIcon,
  MonitorIcon,
  PaletteIcon,
  PowerIcon,
  ShieldIcon,
  SlidersHorizontalIcon,
  UploadIcon,
  WavesIcon,
  ZoomInIcon,
} from '@lucide/vue';

export type SettingValue = string | number | boolean;

export interface SettingOption {
  value: string;
  label: string;
}

export interface NestedSetting {
  id: string;
  label: string;
  defaultValue: boolean;
}

export interface SettingDefinition {
  id: string;
  title: string;
  description: string;
  icon: Component;
  kind: 'switch' | 'select' | 'stepper' | 'button';
  defaultValue?: SettingValue;
  options?: SettingOption[];
  min?: number;
  max?: number;
  step?: number;
  buttonLabel?: string;
  nested?: NestedSetting[];
}

export interface SettingsCategory {
  id: string;
  title: string;
  description: string;
  icon: Component;
  settings: SettingDefinition[];
}

export const pageTitle = 'Settings';
export const pageDescription = 'Customize how the app looks, behaves and keeps you informed.';
export const searchPlaceholder = 'Search settings';
export const searchResultsTitle = 'Search results';
export const emptyTitle = 'No settings found';
export const emptyDescription = 'Try a different keyword or clear the search.';
export const clearSearchLabel = 'Clear search';
export const resetLabel = 'Reset';

export const categories: SettingsCategory[] = [
  {
    id: 'general',
    title: 'General',
    description: 'Language, startup and everyday behavior.',
    icon: SlidersHorizontalIcon,
    settings: [
      {
        id: 'language',
        title: 'Language',
        description: 'The language used across menus, dialogs and messages.',
        icon: LanguagesIcon,
        kind: 'select',
        defaultValue: 'en',
        options: [
          { value: 'en', label: 'English' },
          { value: 'de', label: 'Deutsch' },
          { value: 'es', label: 'Español' },
          { value: 'fr', label: 'Français' },
        ],
      },
      {
        id: 'startup-page',
        title: 'Startup page',
        description: 'Choose which page opens when the app starts.',
        icon: HomeIcon,
        kind: 'select',
        defaultValue: 'home',
        options: [
          { value: 'home', label: 'Home' },
          { value: 'dashboard', label: 'Dashboard' },
          { value: 'last', label: 'Where I left off' },
        ],
      },
      {
        id: 'launch-at-login',
        title: 'Launch at login',
        description: 'Start the app automatically when you sign in to your computer.',
        icon: PowerIcon,
        kind: 'switch',
        defaultValue: true,
        nested: [
          { id: 'start-minimized', label: 'Start minimized to the tray', defaultValue: false },
          { id: 'restore-windows', label: 'Restore windows from the last session', defaultValue: true },
        ],
      },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Theme, scale and motion preferences.',
    icon: PaletteIcon,
    settings: [
      {
        id: 'theme',
        title: 'Theme',
        description: 'Match your system or pick a fixed light or dark theme.',
        icon: MonitorIcon,
        kind: 'select',
        defaultValue: 'system',
        options: [
          { value: 'system', label: 'System' },
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ],
      },
      {
        id: 'scale',
        title: 'Interface scale',
        description: 'Make text and controls larger or smaller.',
        icon: ZoomInIcon,
        kind: 'stepper',
        defaultValue: 100,
        min: 70,
        max: 150,
        step: 10,
      },
      {
        id: 'reduce-motion',
        title: 'Reduce motion',
        description: 'Turn off animated transitions and parallax effects.',
        icon: WavesIcon,
        kind: 'switch',
        defaultValue: false,
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Decide when and how you hear from us.',
    icon: BellIcon,
    settings: [
      {
        id: 'desktop-notifications',
        title: 'Desktop notifications',
        description: 'Show a system notification when something needs your attention.',
        icon: BellIcon,
        kind: 'switch',
        defaultValue: true,
        nested: [
          { id: 'notification-sounds', label: 'Play a sound', defaultValue: true },
          { id: 'notification-previews', label: 'Show message previews', defaultValue: false },
        ],
      },
      {
        id: 'email-digest',
        title: 'Email digest',
        description: 'A summary of activity delivered to your inbox.',
        icon: MailIcon,
        kind: 'select',
        defaultValue: 'weekly',
        options: [
          { value: 'never', label: 'Never' },
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
        ],
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & data',
    description: 'Control what is shared and what is stored.',
    icon: ShieldIcon,
    settings: [
      {
        id: 'usage-data',
        title: 'Share usage data',
        description: 'Send anonymous diagnostics to help us improve the product.',
        icon: GlobeIcon,
        kind: 'switch',
        defaultValue: false,
      },
      {
        id: 'export-data',
        title: 'Export your data',
        description: 'Download a copy of your settings and content as a ZIP archive.',
        icon: UploadIcon,
        kind: 'button',
        buttonLabel: 'Export',
      },
      {
        id: 'clear-cache',
        title: 'Clear local cache',
        description: 'Remove temporary files stored on this device. Your account data is not affected.',
        icon: DatabaseIcon,
        kind: 'button',
        buttonLabel: 'Clear cache',
      },
    ],
  },
];

export const allSettings = categories.flatMap(category =>
  category.settings.map(setting => ({ ...setting, categoryId: category.id, categoryTitle: category.title })),
);
