<script setup lang="ts">
import { ColorFieldRoot, type ColorFieldRootEmits, type ColorFieldRootProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorFieldRootProps>();
const emits = defineEmits<ColorFieldRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorFieldRoot
    data-slot="color-field"
    class="sigma-ui-color-field"
    v-bind="{ ...forwarded, ...$attrs }"
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
