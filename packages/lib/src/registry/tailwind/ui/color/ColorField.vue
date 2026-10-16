<script setup lang="ts">
import { ColorFieldRoot, type ColorFieldRootEmits, type ColorFieldRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

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
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </ColorFieldRoot>
</template>
