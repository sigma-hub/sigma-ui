<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ConfigProvider, type ConfigProviderProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

interface DirectionProps {
  /**
   * Reading direction inherited by Reka primitives inside this provider.
   */
  dir?: ConfigProviderProps['dir'];
  /**
   * Locale inherited by Reka primitives inside this provider.
   */
  locale?: ConfigProviderProps['locale'];
}

const props = withDefaults(defineProps<DirectionProps>(), {
  dir: 'ltr',
  locale: 'en',
});

defineSlots<{
  /**
   * Content that inherits this reading direction.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <ConfigProvider
    :dir="props.dir"
    :locale="props.locale"
  >
    <div
      v-bind="delegatedAttrs"
      data-slot="direction"
      class="sigma-ui-direction"
      :dir="props.dir"
      :class="[$attrs.class]"
    >
      <slot />
    </div>
  </ConfigProvider>
</template>

<style>
.sigma-ui-direction {
  display: contents;
}
</style>
