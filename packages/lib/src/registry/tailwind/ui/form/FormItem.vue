<script lang="ts" setup>
import { provide, useAttrs } from 'vue';
import { useId } from 'reka-ui';
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys';
import { cn } from '@ui/utils';
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
    v-bind="delegatedAttrs()"
    :class="cn('flex flex-col gap-2', $attrs.class ?? '')"
    data-slot="form-item"
  >
    <slot />
  </div>
</template>
