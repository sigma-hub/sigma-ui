export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
}

export type SidebarNavItem = NavItem & {
  name?: string;
  items?: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
  items?: NavItemWithChildren[];
};

interface DocsConfig {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Docs',
      href: '/docs/introduction',
    },
    {
      title: 'Components',
      href: '/components/accordion',
    },
    {
      title: 'Blocks',
      href: '/blocks/auth',
    },
    {
      title: 'Changelog',
      href: '/docs/changelog',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      name: 'getting-started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/introduction',
        },
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [
            {
              title: 'Vite',
              href: '/docs/installation/vite',
            },
            {
              title: 'Nuxt',
              href: '/docs/installation/nuxt',
            },
            {
              title: 'Astro',
              href: '/docs/installation/astro',
            },
            {
              title: 'Laravel',
              href: '/docs/installation/laravel',
            },
          ],
        },
        {
          title: 'CLI',
          href: '/docs/cli',
        },
        {
          title: 'CLI config',
          href: '/docs/config',
        },
        {
          title: 'Theming',
          href: '/docs/theming',
        },
        {
          title: 'Dark Mode',
          href: '/docs/dark-mode',
          items: [],
        },
        {
          title: 'Typography',
          href: '/docs/typography',
        },
        {
          title: 'Changelog',
          href: '/docs/changelog',
          label: 'Updated',
        },
      ],
    },
    {
      title: 'Extended components',
      name: 'extended-components',
      items: [
        // {
        //   title: 'Auto Form',
        //   href: '/components/auto-form',
        //   items: [],
        //   label: 'Alpha',
        // },
        {
          title: 'Charts',
          href: '/components/charts',
          label: 'Alpha',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      name: 'components',
      items: [
        {
          title: 'Accordion',
          href: '/components/accordion',
        },
        {
          title: 'Alert',
          href: '/components/alert',
        },
        {
          title: 'Alert Dialog',
          href: '/components/alert-dialog',
        },
        {
          title: 'Avatar',
          href: '/components/avatar',
        },
        {
          title: 'Image',
          href: '/components/image',
        },
        {
          title: 'Badge',
          href: '/components/badge',
        },
        {
          title: 'Breadcrumb',
          href: '/components/breadcrumb',
          items: [],
        },
        {
          title: 'Button',
          href: '/components/button',
        },
        {
          title: 'Calendar',
          href: '/components/calendar',
          items: [],
        },
        {
          title: 'Card',
          href: '/components/card',
        },
        {
          title: 'Card lightbox',
          href: '/components/card-lightbox',
          label: 'Alpha',
        },
        {
          title: 'Carousel',
          href: '/components/carousel',
          items: [],
        },
        {
          title: 'Checkbox',
          href: '/components/checkbox',
        },
        {
          title: 'Collapsible',
          href: '/components/collapsible',
        },
        {
          title: 'Combobox',
          href: '/components/combobox',
        },
        {
          title: 'Command',
          href: '/components/command',
        },
        {
          title: 'Context Menu',
          href: '/components/context-menu',
        },
        {
          title: 'Data Table',
          href: '/components/data-table',
        },
        {
          title: 'Date Picker',
          href: '/components/date-picker',
          items: [],
        },
        {
          title: 'Dialog',
          href: '/components/dialog',
        },
        {
          title: 'Drawer',
          href: '/components/drawer',
          items: [],
        },
        {
          title: 'Dropdown Menu',
          href: '/components/dropdown-menu',
        },
        {
          title: 'Form',
          href: '/components/form',
        },
        {
          title: 'Hover Card',
          href: '/components/hover-card',
        },
        {
          title: 'Infusion',
          href: '/components/infusion',
          label: 'New',
        },
        {
          title: 'Input',
          href: '/components/input',
        },
        {
          title: 'Label',
          href: '/components/label',
        },
        {
          title: 'Menubar',
          href: '/components/menubar',
        },
        {
          title: 'Navigation Menu',
          href: '/components/navigation-menu',
        },
        {
          title: 'Number Field',
          href: '/components/number-field',
        },
        {
          title: 'Pagination',
          href: '/components/pagination',
        },
        {
          title: 'PIN Input',
          href: '/components/pin-input',
          items: [],
        },
        {
          title: 'Popover',
          href: '/components/popover',
        },
        {
          title: 'Progress',
          href: '/components/progress',
        },
        {
          title: 'Radio Group',
          href: '/components/radio-group',
        },
        {
          title: 'Range Calendar',
          href: '/components/range-calendar',
          items: [],
        },
        {
          title: 'Resizable',
          href: '/components/resizable',
          items: [],
        },
        {
          title: 'Scroll Area',
          href: '/components/scroll-area',
        },
        {
          title: 'Select',
          href: '/components/select',
        },
        {
          title: 'Separator',
          href: '/components/separator',
        },
        {
          title: 'Sheet',
          href: '/components/sheet',
        },
        {
          title: 'Skeleton',
          href: '/components/skeleton',
        },
        {
          title: 'Slider',
          href: '/components/slider',
        },
        {
          title: 'Toaster',
          href: '/components/toaster',
          items: [],
        },
        {
          title: 'Switch',
          href: '/components/switch',
        },
        {
          title: 'Table',
          href: '/components/table',
        },
        {
          title: 'Tabs',
          href: '/components/tabs',
        },
        {
          title: 'Tags Input',
          href: '/components/tags-input',
          items: [],
        },
        {
          title: 'Textarea',
          href: '/components/textarea',
        },
        {
          title: 'Toggle',
          href: '/components/toggle',
        },
        {
          title: 'Toggle Group',
          href: '/components/toggle-group',
        },
        {
          title: 'Tooltip',
          href: '/components/tooltip',
        },
      ],
    },
    {
      title: 'Blocks',
      name: 'blocks',
      items: [
        {
          title: 'Auth',
          href: '/blocks/auth',
        },
        {
          title: 'Dashboard',
          href: '/blocks/dashboard',
        },
      ],
    },
  ],
};
