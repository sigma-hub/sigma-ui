import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Example } from '../../.vitepress/theme/types/examples';
import Mix from '../examples/mix/Example.vue';
import Mail from '../examples/mail/Example.vue';
import Dashboard from '../examples/dashboard/Example.vue';
import Table from '../examples/table/Example.vue';
import Forms from '../examples/forms/Example.vue';
import Music from '../examples/music/Example.vue';
import Authentication from '../examples/authentication/Example.vue';

export const useExamplesStore = defineStore('examples', () => {
  const examples = computed<Example[]>(() => (
    [
      {
        name: 'mix',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/mix',
        component: Mix,
      },
      {
        name: 'mail',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/mail',
        component: Mail,
      },
      {
        name: 'dashboard',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/dashboard',
        component: Dashboard,
      },
      {
        name: 'table',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/table',
        component: Table,
      },
      {
        name: 'forms',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/forms',
        component: Forms,
      },
      {
        name: 'music',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/music',
        component: Music,
      },
      {
        name: 'authentication',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/authentication',
        component: Authentication,
      },
    ]
  ));

  const exampleName = ref<Example['name']>('mix');
  const currentExample = computed(() => examples.value.find(e => e.name === exampleName.value));

  const setSelectedExample = (name: Example['name']) => {
    exampleName.value = name;
  };

  return {
    examples,
    currentExample,
    setSelectedExample,
  };
});
