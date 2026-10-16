import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Example } from '../../.vitepress/theme/types/examples';

export const useExamplesStore = defineStore('examples', () => {
  const examples = computed<Example[]>(() => (
    [
      {
        name: 'mix',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/mix',
      },
      {
        name: 'mail',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/mail',
      },
      {
        name: 'dashboard',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/dashboard',
      },
      {
        name: 'table',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/table',
      },
      {
        name: 'forms',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/forms',
      },
      {
        name: 'music',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/music',
      },
      {
        name: 'authentication',
        code: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/examples/authentication',
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
