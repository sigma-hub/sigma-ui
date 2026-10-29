<script setup lang="ts">
import { computed } from 'vue';
import { template } from 'lodash-es';
import { TAILWIND_STYLES_WITH_VARS_TEMPLATE } from '@sigma-ui/shared/templates/tailwind-styles';
import { CSS_STYLES_WITH_VARS_TEMPLATE } from '@sigma-ui/shared/templates/css-styles';
import { useConfigStore } from '@/stores/config';
import { themes } from '@sigma-ui/shared/themes';
import HighlightedCode from './HighlightedCode.vue';

const { config } = useConfigStore();

const activeTheme = computed(() => themes.find(i => i.name === config.value.theme));

const code = computed(() => {
  const selectedTemplate = config.value.styleSystem === 'tailwind' ? TAILWIND_STYLES_WITH_VARS_TEMPLATE : CSS_STYLES_WITH_VARS_TEMPLATE;

  return template(selectedTemplate)({
    colors: activeTheme.value?.cssVars,
    sizes: {
      radius: config.value.radius,
      backdropFilterBlur: config.value.backdropFilterBlur,
    },
  });
});
</script>

<template>
  <HighlightedCode
    class="theme-customizer-code"
    :code="code"
    language="css"
  />
</template>
