<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { LabelProps } from 'reka-ui';
import { useFormField } from './useFormField';
import { Label } from '@ui/registry/css/ui/label';
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
    class="sigma-ui-form-label"
    :class="[$attrs.class ?? '', { 'sigma-ui-form-label--error': error }]"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>

<style>
.sigma-ui-form-label {
  color: var(--foreground);
}

.sigma-ui-form-label--error {
  color: var(--destructive);
}
</style>
