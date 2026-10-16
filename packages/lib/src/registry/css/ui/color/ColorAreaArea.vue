<script setup lang="ts">
import { ColorAreaArea, type ColorAreaAreaProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorAreaAreaProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorAreaArea
    data-slot="color-area-area"
    class="sigma-ui-color-area-surface"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorAreaArea>
</template>

<style>
.sigma-ui-color-area-surface {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
}
</style>
