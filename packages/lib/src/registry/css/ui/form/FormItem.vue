<script lang="ts" setup>
import { provide, useAttrs } from 'vue';
import { useId } from 'reka-ui';
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <div
    data-slot="form-item"
    v-bind="delegatedAttrs()"
    :class="['form-item', $attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.form-item {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
}
</style>
