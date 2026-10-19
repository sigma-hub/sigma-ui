<script setup lang="ts">
import { useAttrs } from 'vue';

import { ConfigProvider, type ConfigProviderProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
      data-slot="direction"
      v-bind="delegatedAttrs()"
      class="sigma-ui-direction"
      :dir="props.dir"
      :class="[$attrs.class]"
    >
      <slot />
    </div>
  </ConfigProvider>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-direction {
    display: contents;
  }
}
</style>
