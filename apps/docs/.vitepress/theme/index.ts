// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress';
import { createPinia } from 'pinia';
import Layout from './layout/MainLayout.vue';
import DocsLayout from './layout/DocsLayout.vue';
import ComponentsLayout from './layout/ComponentsLayout.vue';
import BlocksLayout from './layout/BlocksLayout.vue';
import ExamplesLayout from './layout/ExamplesLayout.vue';
import * as components from './components';
import './styles/main.css';
import './styles/vp-doc.css';
import './styles/shiki.css';
import './styles/themes.css';

export default {
  Layout,
  enhanceApp({ app }) {
    app.use(createPinia());
    app.component('Docs', DocsLayout);
    app.component('Components', ComponentsLayout);
    app.component('Blocks', BlocksLayout);
    app.component('Examples', ExamplesLayout);

    for (const component of Object.keys(components)) {
      app.component(component, components[component as keyof typeof components]);
    }
  },
} satisfies Theme;
