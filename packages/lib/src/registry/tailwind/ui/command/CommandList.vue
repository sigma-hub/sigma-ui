<script setup lang="ts">
import type { ListboxContentProps } from 'reka-ui';
import { ListboxContent, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<ListboxContentProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ListboxContent
    v-bind="forwarded"
    :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', $attrs.class ?? '')"
    data-slot="command-list"
  >
    <div role="presentation">
      <slot />
    </div>
  </ListboxContent>
</template>
