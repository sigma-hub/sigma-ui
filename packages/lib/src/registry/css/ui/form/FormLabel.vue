<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import type { LabelProps } from 'reka-ui';
import { useFormField } from './useFormField';
import { Label } from '@ui/registry/css/ui/label';
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
    class="sigma-ui-form-label"
    :class="[$attrs.class ?? '', { 'sigma-ui-form-label--error': error }]"
    :for="formItemId"
    data-slot="form-label"
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
