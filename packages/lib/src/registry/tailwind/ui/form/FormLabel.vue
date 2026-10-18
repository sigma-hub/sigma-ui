<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { LabelProps } from 'reka-ui';
import { useFormField } from './useFormField';
import { cn } from '@ui/utils';
import { Label } from '@ui/registry/tailwind/ui/label';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<LabelProps>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    data-slot="form-label"
    v-bind="delegatedAttrs()"
    :class="cn(
      error && 'text-destructive',
      $attrs.class ?? '',
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
