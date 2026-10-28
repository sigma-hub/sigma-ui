import type { Component } from 'vue';
import {
  ChartLineIcon,
  DownloadIcon,
  FilePlusIcon,
  FolderKanbanIcon,
  KeyboardIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  PaletteIcon,
  SettingsIcon,
  UploadIcon,
  UserPlusIcon,
  UsersIcon,
} from '@lucide/vue';

export interface PaletteCommand {
  id: string;
  label: string;
  group: string;
  icon: Component;
  /** Extra words that also match the search. */
  keywords?: string[];
  /** Key hint shown at the end of the row. */
  shortcut?: string[];
}

export const pageTitle = 'Workspace';
export const pageDescription = 'Jump anywhere or run an action without leaving the keyboard.';
export const triggerLabel = 'Search commands…';
export const maxRecentCommands = 3;

export const commands: PaletteCommand[] = [
  { id: 'create-project', label: 'Create project', group: 'Actions', icon: FilePlusIcon, keywords: ['new', 'add'], shortcut: ['Ctrl', 'N'] },
  { id: 'invite-teammate', label: 'Invite teammate', group: 'Actions', icon: UserPlusIcon, keywords: ['member', 'add', 'people'] },
  { id: 'import-data', label: 'Import data', group: 'Actions', icon: UploadIcon, keywords: ['upload', 'csv'] },
  { id: 'export-report', label: 'Export report', group: 'Actions', icon: DownloadIcon, keywords: ['download', 'pdf'] },
  { id: 'go-dashboard', label: 'Go to dashboard', group: 'Navigation', icon: LayoutDashboardIcon, keywords: ['home', 'overview'], shortcut: ['G', 'D'] },
  { id: 'go-projects', label: 'Go to projects', group: 'Navigation', icon: FolderKanbanIcon, shortcut: ['G', 'P'] },
  { id: 'go-team', label: 'Go to team', group: 'Navigation', icon: UsersIcon, keywords: ['members', 'people'], shortcut: ['G', 'T'] },
  { id: 'go-analytics', label: 'Go to analytics', group: 'Navigation', icon: ChartLineIcon, keywords: ['stats', 'metrics'], shortcut: ['G', 'A'] },
  { id: 'open-settings', label: 'Open settings', group: 'Settings', icon: SettingsIcon, keywords: ['preferences'], shortcut: ['Ctrl', ','] },
  { id: 'change-theme', label: 'Change theme', group: 'Settings', icon: PaletteIcon, keywords: ['dark', 'light', 'appearance'] },
  { id: 'keyboard-shortcuts', label: 'Keyboard shortcuts', group: 'Settings', icon: KeyboardIcon, keywords: ['keys', 'bindings'] },
  { id: 'help-support', label: 'Help and support', group: 'Settings', icon: LifeBuoyIcon, keywords: ['docs', 'contact'] },
];

export const initialRecentIds = ['create-project', 'go-projects'];
