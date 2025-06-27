<script lang="ts" setup>
import { useFormField } from './useFormField';

const { formDescriptionId } = useFormField();
</script>

<template>
  <p
    :id="formDescriptionId"
    class="sigma-ui-form-description"
    :class="$attrs.class"
  >
    <slot />
  </p>
</template>

<style>
.sigma-ui-form-description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(var(--muted-foreground));
}
</style>
