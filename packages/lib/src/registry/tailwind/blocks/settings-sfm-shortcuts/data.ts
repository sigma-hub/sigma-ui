import type { Bindings, ShortcutCommand } from './shortcuts';

export const pageTitle = 'Keyboard shortcuts';
export const pageDescription = 'Review and customize the keys used for common actions.';
export const searchPlaceholder = 'Search shortcuts';

export const commands: ShortcutCommand[] = [
  { id: 'command-palette', label: 'Open command palette', group: 'General', scope: 'Global', defaultBinding: 'Ctrl+K' },
  { id: 'toggle-sidebar', label: 'Toggle sidebar', group: 'General', scope: 'Global', defaultBinding: 'Ctrl+B' },
  { id: 'open-settings', label: 'Open settings', group: 'General', scope: 'Global', defaultBinding: 'Ctrl+,' },
  { id: 'reload', label: 'Reload window', group: 'General', scope: 'Global', defaultBinding: null },
  { id: 'new-item', label: 'New item', group: 'Editing', scope: 'Editor', defaultBinding: 'Ctrl+N' },
  { id: 'duplicate', label: 'Duplicate', group: 'Editing', scope: 'Editor', defaultBinding: 'Ctrl+D' },
  { id: 'undo', label: 'Undo', group: 'Editing', scope: 'Editor', defaultBinding: 'Ctrl+Z' },
  { id: 'redo', label: 'Redo', group: 'Editing', scope: 'Editor', defaultBinding: 'Ctrl+Shift+Z' },
  { id: 'select-all', label: 'Select all', group: 'List', scope: 'List', defaultBinding: 'Ctrl+A' },
  { id: 'delete-selected', label: 'Delete selected', group: 'List', scope: 'List', defaultBinding: 'Del' },
  { id: 'zoom-in', label: 'Zoom in', group: 'View', scope: 'Global', defaultBinding: 'Ctrl+=' },
  { id: 'zoom-out', label: 'Zoom out', group: 'View', scope: 'Global', defaultBinding: 'Ctrl+-' },
  { id: 'full-screen', label: 'Toggle full screen', group: 'View', scope: 'Global', defaultBinding: 'F11' },
];

/** Bindings that differ from the defaults when the page first loads. */
export const initialOverrides: Bindings = {
  'toggle-sidebar': 'Ctrl+Shift+B',
};
