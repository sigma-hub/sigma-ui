<script lang="ts" setup>
import type { LabelProps } from 'reka-ui';
import { useFormField } from './useFormField';
import { Label } from '@ui/registry/css/ui/label';

const props = defineProps<LabelProps>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    class="sigma-ui-form-label"
    :class="[$attrs.class ?? '', { 'sigma-ui-form-label--error': error }]"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>

<style>
.sigma-ui-form-label {
  color: hsl(var(--foreground));
}

.sigma-ui-form-label--error {
  color: hsl(var(--destructive));
}
</style>
