<script setup lang="ts">
import type { ComboboxAnchorProps } from 'reka-ui';
import { ComboboxAnchor, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<ComboboxAnchorProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxAnchor
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('w-[200px]', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxAnchor>
</template>
