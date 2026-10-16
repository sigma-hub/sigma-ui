import type { Component } from 'vue';
import {
  CirclePlayIcon,
  GlobeIcon,
  LayoutGridIcon,
  LibraryIcon,
  ListMusicIcon,
  MicIcon,
  MusicIcon,
  RadioIcon,
  UserIcon,
} from 'lucide-vue-next';

export interface Album {
  name: string;
  artist: string;
  cover: string;
}

export interface NavItem {
  label: string;
  icon: Component;
  isActive?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export type MenuEntry =
  | { kind: 'item'; label: string; shortcut?: string; shortcutIcon?: Component; disabled?: boolean; inset?: boolean }
  | { kind: 'separator' }
  | { kind: 'label'; label: string; inset?: boolean }
  | { kind: 'checkbox'; label: string; checked?: boolean }
  | { kind: 'radio'; value: string; options: { value: string; label: string }[] }
  | { kind: 'submenu'; label: string; wide?: boolean; entries: MenuEntry[] };

export interface MenuGroup {
  label: string;
  bold?: boolean;
  compact?: boolean;
  entries: MenuEntry[];
}

export const musicTabLabel = 'Music';
export const podcastsTabLabel = 'Podcasts';
export const liveTabLabel = 'Live';
export const addMusicLabel = 'Add music';

export const listenNowTitle = 'Listen Now';
export const listenNowDescription = 'Top picks for you. Updated daily.';
export const madeForYouTitle = 'Made for You';
export const madeForYouDescription = 'Your personal playlists. Updated daily.';
export const podcastsTitle = 'New Episodes';
export const podcastsDescription = 'Your favorite podcasts. Updated daily.';

export const emptyPodcastTitle = 'No episodes added';
export const emptyPodcastDescription = 'You have not added any podcasts. Add one below.';
export const addPodcastLabel = 'Add Podcast';
export const podcastDialogTitle = 'Add Podcast';
export const podcastDialogDescription = 'Copy and paste the podcast feed URL to import.';
export const podcastUrlLabel = 'Podcast URL';
export const podcastUrlPlaceholder = 'https://example.com/feed.xml';
export const importPodcastLabel = 'Import Podcast';

export const albumActions = {
  addToLibrary: 'Add to Library',
  addToPlaylist: 'Add to Playlist',
  newPlaylist: 'New Playlist',
  playNext: 'Play Next',
  playLater: 'Play Later',
  createStation: 'Create Station',
  like: 'Like',
  share: 'Share',
};

export const discoverSection: NavSection = {
  title: 'Discover',
  items: [
    { label: 'Listen Now', icon: CirclePlayIcon, isActive: true },
    { label: 'Browse', icon: LayoutGridIcon },
    { label: 'Radio', icon: RadioIcon },
  ],
};

export const librarySection: NavSection = {
  title: 'Library',
  items: [
    { label: 'Playlists', icon: ListMusicIcon },
    { label: 'Songs', icon: MusicIcon },
    { label: 'Made for You', icon: UserIcon },
    { label: 'Artists', icon: MicIcon },
    { label: 'Albums', icon: LibraryIcon },
  ],
};

export const playlistsTitle = 'Playlists';

export const playlists = [
  'Recently Added',
  'Recently Played',
  'Top Songs',
  'Top Albums',
  'Top Artists',
  'Logic Discography',
  'Bedtime Beats',
  'Feeling Happy',
  'I miss Y2K Pop',
  'Runtober',
  'Mellow Days',
  'Eminem Essentials',
];

export const listenNowAlbums: Album[] = [
  {
    name: 'React Rendezvous',
    artist: 'Ethan Byte',
    cover: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80',
  },
  {
    name: 'Async Awakenings',
    artist: 'Nina Netcode',
    cover: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
  },
  {
    name: 'The Art of Reusability',
    artist: 'Lena Logic',
    cover: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80',
  },
  {
    name: 'Stateful Symphony',
    artist: 'Beth Binary',
    cover: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80',
  },
];

export const madeForYouAlbums: Album[] = [
  {
    name: 'Thinking Components',
    artist: 'Lena Logic',
    cover: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80',
  },
  {
    name: 'Functional Fury',
    artist: 'Beth Binary',
    cover: 'https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80',
  },
  {
    name: 'React Rendezvous',
    artist: 'Ethan Byte',
    cover: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80',
  },
  {
    name: 'Stateful Symphony',
    artist: 'Beth Binary',
    cover: 'https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80',
  },
  {
    name: 'Async Awakenings',
    artist: 'Nina Netcode',
    cover: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
  },
  {
    name: 'The Art of Reusability',
    artist: 'Lena Logic',
    cover: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80',
  },
];

const newPlaylistMenu: MenuEntry = {
  kind: 'submenu',
  label: 'New',
  wide: true,
  entries: [
    { kind: 'item', label: 'Playlist', shortcut: '⌘N' },
    { kind: 'item', label: 'Playlist from Selection', shortcut: '⇧⌘N', disabled: true },
    { kind: 'item', label: 'Smart Playlist...', shortcut: '⌥⌘N' },
    { kind: 'item', label: 'Playlist Folder' },
    { kind: 'item', label: 'Genius Playlist', disabled: true },
  ],
};

const libraryMenu: MenuEntry = {
  kind: 'submenu',
  label: 'Library',
  entries: [
    { kind: 'item', label: 'Update Cloud Library' },
    { kind: 'item', label: 'Update Genius' },
    { kind: 'separator' },
    { kind: 'item', label: 'Organize Library...' },
    { kind: 'item', label: 'Export Library...' },
    { kind: 'separator' },
    { kind: 'item', label: 'Import Playlist...' },
    { kind: 'item', label: 'Export Playlist...', disabled: true },
    { kind: 'item', label: 'Show Duplicate Items' },
    { kind: 'separator' },
    { kind: 'item', label: 'Get Album Artwork' },
    { kind: 'item', label: 'Get Track Names', disabled: true },
  ],
};

export const menuGroups: MenuGroup[] = [
  {
    label: 'Music',
    bold: true,
    entries: [
      { kind: 'item', label: 'About Music' },
      { kind: 'separator' },
      { kind: 'item', label: 'Preferences...', shortcut: '⌘,' },
      { kind: 'separator' },
      { kind: 'item', label: 'Hide Music...', shortcut: '⌘H' },
      { kind: 'item', label: 'Hide Others...', shortcut: '⇧⌘H' },
      { kind: 'item', label: 'Quit Music', shortcut: '⌘Q' },
    ],
  },
  {
    label: 'File',
    entries: [
      newPlaylistMenu,
      { kind: 'item', label: 'Open Stream URL...', shortcut: '⌘U' },
      { kind: 'item', label: 'Close Window', shortcut: '⌘W' },
      { kind: 'separator' },
      libraryMenu,
      { kind: 'item', label: 'Import...', shortcut: '⌘O' },
      { kind: 'item', label: 'Burn Playlist to Disc...', disabled: true },
      { kind: 'separator' },
      { kind: 'item', label: 'Show in Finder', shortcut: '⇧⌘R' },
      { kind: 'item', label: 'Convert' },
      { kind: 'separator' },
      { kind: 'item', label: 'Page Setup...' },
      { kind: 'item', label: 'Print...', shortcut: '⌘P', disabled: true },
    ],
  },
  {
    label: 'Edit',
    entries: [
      { kind: 'item', label: 'Undo', shortcut: '⌘Z', disabled: true },
      { kind: 'item', label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
      { kind: 'separator' },
      { kind: 'item', label: 'Cut', shortcut: '⌘X', disabled: true },
      { kind: 'item', label: 'Copy', shortcut: '⌘C', disabled: true },
      { kind: 'item', label: 'Paste', shortcut: '⌘V', disabled: true },
      { kind: 'separator' },
      { kind: 'item', label: 'Select All', shortcut: '⌘A' },
      { kind: 'item', label: 'Deselect All', shortcut: '⇧⌘A', disabled: true },
      { kind: 'separator' },
      { kind: 'item', label: 'Smart Dictation...', shortcutIcon: MicIcon },
      { kind: 'item', label: 'Emoji & Symbols', shortcutIcon: GlobeIcon },
    ],
  },
  {
    label: 'View',
    entries: [
      { kind: 'checkbox', label: 'Show Playing Next' },
      { kind: 'checkbox', label: 'Show Lyrics', checked: true },
      { kind: 'separator' },
      { kind: 'item', label: 'Show Status Bar', inset: true, disabled: true },
      { kind: 'separator' },
      { kind: 'item', label: 'Hide Sidebar', inset: true },
      { kind: 'item', label: 'Enter Full Screen', inset: true, disabled: true },
    ],
  },
  {
    label: 'Account',
    compact: true,
    entries: [
      { kind: 'label', label: 'Switch Account', inset: true },
      { kind: 'separator' },
      {
        kind: 'radio',
        value: 'benoit',
        options: [
          { value: 'andy', label: 'Andy' },
          { value: 'benoit', label: 'Benoit' },
          { value: 'luis', label: 'Luis' },
        ],
      },
      { kind: 'separator' },
      { kind: 'item', label: 'Manage Family...', inset: true },
      { kind: 'separator' },
      { kind: 'item', label: 'Add Account...', inset: true },
    ],
  },
];
