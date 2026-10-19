import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Example } from '../../.vitepress/theme/types/examples';

export const useExamplesStore = defineStore('examples', () => {
  const examples = computed<Example[]>(() => (
    [
      {
        name: 'mix',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/mix',
        frameHeight: 'content',
      },
      {
        name: 'mail',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/mail',
        frameHeight: 'fixed',
      },
      {
        name: 'dashboard',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/dashboard',
        frameHeight: 'content',
      },
      {
        name: 'table',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/table',
        frameHeight: 'content',
      },
      {
        name: 'settings',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/settings',
        frameHeight: 'content',
      },
      {
        name: 'authentication',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/authentication',
        frameHeight: 'fixed',
      },
    ]
  ));

  const exampleName = ref<Example['name']>('mix');
  const currentExample = computed(() => examples.value.find(example => example.name === exampleName.value));

  const setSelectedExample = (name: Example['name']) => {
    exampleName.value = name;
  };

  return {
    examples,
    currentExample,
    setSelectedExample,
  };
});
