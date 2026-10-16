<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import type { LabelProps } from 'reka-ui';
import { useFormField } from './useFormField';
import { cn } from '@ui/utils';
import { Label } from '@ui/registry/tailwind/ui/label';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<LabelProps>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    v-bind="delegatedAttrs"
    :class="cn(
      error && 'text-destructive',
      $attrs.class ?? '',
    )"
    :for="formItemId"
    data-slot="form-label"
  >
    <slot />
  </Label>
</template>
