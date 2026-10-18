import { data as componentPages } from './components.data';

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

const listedComponents: SidebarNavItem[] = [
  {
    title: 'Direction',
    href: '/components/direction',
    label: 'New',
  },
  {
    title: 'Tag Group',
    href: '/components/tag-group',
    label: 'New',
  },
  {
    title: 'Typography',
    href: '/components/typography',
    label: 'New',
  },
];

const listedComponentHrefs = new Set(listedComponents.map(item => item.href));

const componentSidebar = [...componentPages.filter(page => !listedComponentHrefs.has(page.href)), ...listedComponents]
  .sort((first, second) => first.title.localeCompare(second.title));

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
      href: '/blocks',
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
          title: 'Upgrade to 2.0',
          href: '/docs/migration',
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
        {
          title: 'Charts',
          href: '/components/charts',
          label: 'Alpha',
          items: [
            {
              title: 'Area',
              href: '/components/charts/area',
            },
            {
              title: 'Bar',
              href: '/components/charts/bar',
            },
            {
              title: 'Donut',
              href: '/components/charts/donut',
            },
            {
              title: 'Line',
              href: '/components/charts/line',
            },
          ],
        },
      ],
    },
    {
      title: 'Components',
      name: 'components',
      items: componentSidebar,
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
        {
          title: 'Table',
          href: '/blocks/table',
        },
        {
          title: 'Settings',
          href: '/blocks/settings',
        },
      ],
    },
  ],
};
