<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorFieldRoot, type ColorFieldRootEmits, type ColorFieldRootProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorFieldRootProps>();
const emits = defineEmits<ColorFieldRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorFieldRoot
    data-slot="color-field"
    class="sigma-ui-color-field"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorFieldRoot>
</template>

<style>
.sigma-ui-color-field {
  display: flex;
}
</style>
