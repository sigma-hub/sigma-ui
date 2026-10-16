<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorFieldRoot, type ColorFieldRootEmits, type ColorFieldRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ColorFieldRootProps>();
const emits = defineEmits<ColorFieldRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorFieldRoot
    data-slot="color-field"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </ColorFieldRoot>
</template>
