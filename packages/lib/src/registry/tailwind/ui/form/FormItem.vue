<script lang="ts" setup>
import { provide } from 'vue';
import { useId } from 'reka-ui';
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys';
import { cn } from '@ui/utils';

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <div :class="cn('flex flex-col gap-2', $attrs.class ?? '')">
    <slot />
  </div>
</template>
