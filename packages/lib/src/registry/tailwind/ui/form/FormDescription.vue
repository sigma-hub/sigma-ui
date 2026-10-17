<script lang="ts" setup>
import { useAttrs } from 'vue';

import { useFormField } from './useFormField';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const { formDescriptionId } = useFormField();
</script>

<template>
  <p
    v-bind="delegatedAttrs()"
    :id="formDescriptionId"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
    data-slot="form-description"
  >
    <slot />
  </p>
</template>
