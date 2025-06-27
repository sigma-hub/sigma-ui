<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@ui/registry/css/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];
</script>

<template>
  <NavigationMenu :delay-duration="0">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="example-sigma-ui-nav-menu__grid example-sigma-ui-nav-menu__grid--getting-started">
            <li class="example-sigma-ui-nav-menu__grid-item example-sigma-ui-nav-menu__grid-item--featured">
              <NavigationMenuLink as-child>
                <a
                  class="example-sigma-ui-nav-menu__featured-link"
                  href="/"
                >
                  <img
                    src="https://www.reka-ui.com/logo.svg"
                    class="example-sigma-ui-nav-menu__logo animate-fade-in"
                  >
                  <div class="example-sigma-ui-nav-menu__title">
                    sigma-ui
                  </div>
                  <p class="example-sigma-ui-nav-menu__description">
                    Beautifully designed components built with Reka UI.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>

            <li>
              <NavigationMenuLink as-child>
                <a
                  href="/docs"
                  class="example-sigma-ui-nav-menu__link"
                >
                  <div class="example-sigma-ui-nav-menu__link-title">Introduction</div>
                  <p class="example-sigma-ui-nav-menu__link-description">
                    Re-usable components built using Reka UI.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <a
                  href="/docs/installation"
                  class="example-sigma-ui-nav-menu__link"
                >
                  <div class="example-sigma-ui-nav-menu__link-title">Installation</div>
                  <p class="example-sigma-ui-nav-menu__link-description">
                    How to install dependencies and structure your app.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <a
                  href="/docs/primitives/typography"
                  class="example-sigma-ui-nav-menu__link"
                >
                  <div class="example-sigma-ui-nav-menu__link-title">Typography</div>
                  <p class="example-sigma-ui-nav-menu__link-description">
                    Styles for headings, paragraphs, lists...etc
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="example-sigma-ui-nav-menu__grid example-sigma-ui-nav-menu__grid--components">
            <li
              v-for="component in components"
              :key="component.title"
            >
              <NavigationMenuLink as-child>
                <a
                  :href="component.href"
                  class="example-sigma-ui-nav-menu__link"
                >
                  <div class="example-sigma-ui-nav-menu__link-title">{{ component.title }}</div>
                  <p class="example-sigma-ui-nav-menu__link-description">
                    {{ component.description }}
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/docs"
          :class="navigationMenuTriggerStyle()"
        >
          Documentation
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style>
.example-sigma-ui-nav-menu__grid {
  display: grid;
  gap: 0.75rem;
  padding: 1.5rem;
}

.example-sigma-ui-nav-menu__grid--getting-started {
  width: 100%;
}

@media (min-width: 768px) {
  .example-sigma-ui-nav-menu__grid--getting-started {
    width: 400px;
  }
}

@media (min-width: 1024px) {
  .example-sigma-ui-nav-menu__grid--getting-started {
    width: 500px;
    grid-template-columns: minmax(0, 0.75fr) minmax(0, 1fr);
  }
}

.example-sigma-ui-nav-menu__grid--components {
  width: 400px;
  gap: 0.75rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .example-sigma-ui-nav-menu__grid--components {
    width: 500px;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .example-sigma-ui-nav-menu__grid--components {
    width: 600px;
  }
}

.example-sigma-ui-nav-menu__grid-item--featured {
  grid-row: span 3;
}

.example-sigma-ui-nav-menu__featured-link {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: var(--radius);
  background-image: linear-gradient(to bottom, hsl(var(--muted) / 0.5), hsl(var(--muted)));
  padding: 1.5rem;
  text-decoration: none;
  outline: none;
  user-select: none;
}

.example-sigma-ui-nav-menu__featured-link:focus {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.example-sigma-ui-nav-menu__logo {
  height: 1.5rem;
  width: 1.5rem;
}

.example-sigma-ui-nav-menu__title {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
}

.example-sigma-ui-nav-menu__description {
  font-size: 0.875rem;
  line-height: 1.25;
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-nav-menu__link {
  display: block;
  padding: 0.75rem;
  text-decoration: none;
  outline: none;
  user-select: none;
  border-radius: var(--radius);
  transition: background-color 0.2s, color 0.2s;
}

.example-sigma-ui-nav-menu__link:hover,
.example-sigma-ui-nav-menu__link:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.example-sigma-ui-nav-menu__link-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-nav-menu__link-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 1.25;
  color: hsl(var(--muted-foreground));
}
</style>
