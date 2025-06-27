<script lang="ts" setup>
import { MoreHorizontalIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

</script>

<template>
  <span
    role="presentation"
    aria-hidden="true"
    :class="cn('flex items-center justify-center', $attrs.class ?? '')"
  >
    <slot>
      <MoreHorizontalIcon class="h-4 w-4" />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
