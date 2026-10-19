<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<{
  /** Current value of the textarea; use with `v-model`. */
  modelValue?: string | number;
}>();

/** Current value of the textarea; use with `v-model`. */
const model = defineModel<string | number>();

defineEmits<{
  /** Emitted when the user changes the value. */
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <textarea
    v-model="model"
    data-slot="textarea"
    autocomplete="off"
    v-bind="delegatedAttrs()"
    :class="cn('flex min-h-20 w-full rounded-md border border-border bg-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')"
  />
</template>
