<script lang="ts" setup>
import type { LabelProps } from 'reka-ui';
import { useFormField } from './useFormField';
import { cn } from '@ui/utils';
import { Label } from '@ui/registry/tailwind/ui/label';

const props = defineProps<LabelProps>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    :class="cn(
      error && 'text-destructive',
      $attrs.class ?? '',
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
