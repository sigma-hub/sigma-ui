<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorAreaArea, type ColorAreaAreaProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorAreaAreaProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorAreaArea
    data-slot="color-area-area"
    class="sigma-ui-color-area-surface"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorAreaArea>
</template>

<style>
@layer components {
  .sigma-ui-color-area-surface {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--radius-md);
  }
}
</style>
