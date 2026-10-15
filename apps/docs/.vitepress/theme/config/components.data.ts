import path from 'node:path';
import { createContentLoader } from 'vitepress';
import type { SidebarNavItem } from './docs';

declare const data: SidebarNavItem[];
export { data };

const EXTENDED_COMPONENT_PAGES = ['charts'];

export default createContentLoader('content/components/*.md', {
  transform(pages): SidebarNavItem[] {
    return pages
      .map(page => ({ page, slug: path.basename(page.url, '.html') }))
      .filter(({ slug }) => !EXTENDED_COMPONENT_PAGES.includes(slug))
      .map(({ page, slug }) => ({
        title: page.frontmatter.title,
        href: `/components/${slug}`,
        ...(page.frontmatter.label ? { label: page.frontmatter.label } : {}),
      }))
      .sort((first, second) => first.title.localeCompare(second.title));
  },
});
