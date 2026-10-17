<script lang="ts" setup>
import { useAttrs } from 'vue';

import { useFormField } from './useFormField';
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
    class="sigma-ui-form-description"
    :class="$attrs.class"
    data-slot="form-description"
  >
    <slot />
  </p>
</template>

<style>
.sigma-ui-form-description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
