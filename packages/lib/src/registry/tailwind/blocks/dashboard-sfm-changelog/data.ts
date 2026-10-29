export type ChangeType = 'added' | 'improved' | 'fixed';

export interface ChangeSection {
  type: ChangeType;
  items: string[];
}

export interface Release {
  version: string;
  /** Display date, already formatted. */
  date: string;
  highlight: string;
  sections: ChangeSection[];
}

export const pageTitle = 'Product updates';
export const pageDescription = 'See what changed in each release and decide how you hear about new ones.';
export const currentVersion = '2.4.0';

export const changeTypeLabels: Record<ChangeType, string> = {
  added: 'New',
  improved: 'Improved',
  fixed: 'Fixed',
};

export const releases: Release[] = [
  {
    version: '2.4.0',
    date: 'October 14, 2026',
    highlight: 'Saved views let you keep your favorite filters one click away, and exports are now twice as fast.',
    sections: [
      {
        type: 'added',
        items: [
          'Saved views for tables, with sharing links for your team.',
          'Bulk edit for up to 500 items at once.',
          'Keyboard shortcut cheat sheet, opened with the question mark key.',
        ],
      },
      {
        type: 'improved',
        items: [
          'CSV and PDF exports finish about twice as fast on large workspaces.',
          'Search results now highlight the matching words.',
        ],
      },
      {
        type: 'fixed',
        items: [
          'Dates in the activity list no longer shift by a day in some time zones.',
          'The sidebar stays collapsed after a reload when you collapse it.',
        ],
      },
    ],
  },
  {
    version: '2.3.2',
    date: 'September 29, 2026',
    highlight: 'A small maintenance release that fixes sign-in and notification issues.',
    sections: [
      {
        type: 'fixed',
        items: [
          'Single sign-on no longer asks twice for a verification code.',
          'Email digests are sent at the time chosen in settings.',
          'Long project names are truncated instead of overlapping the menu.',
        ],
      },
    ],
  },
  {
    version: '2.3.0',
    date: 'September 8, 2026',
    highlight: 'Teams can now work in dark mode, and the new audit log tracks every change in your workspace.',
    sections: [
      {
        type: 'added',
        items: [
          'Dark mode with an automatic option that follows your system.',
          'Audit log with filters for people, actions and dates.',
        ],
      },
      {
        type: 'improved',
        items: [
          'Notifications are grouped by project to reduce noise.',
          'Faster loading of the dashboard on slow connections.',
        ],
      },
    ],
  },
  {
    version: '2.2.0',
    date: 'August 11, 2026',
    highlight: 'Comments and mentions arrive, along with a refreshed onboarding flow.',
    sections: [
      {
        type: 'added',
        items: [
          'Comments with mentions on every item.',
          'A guided checklist for new workspaces.',
        ],
      },
      {
        type: 'fixed',
        items: [
          'Attachments larger than 20 MB upload reliably.',
        ],
      },
    ],
  },
  {
    version: '2.1.0',
    date: 'July 7, 2026',
    highlight: 'Roles and permissions give admins finer control over who can change what.',
    sections: [
      {
        type: 'added',
        items: [
          'Custom roles with per-project permissions.',
          'Invite links that expire after a chosen time.',
        ],
      },
      {
        type: 'improved',
        items: [
          'The member list supports sorting and bulk removal.',
        ],
      },
    ],
  },
];
