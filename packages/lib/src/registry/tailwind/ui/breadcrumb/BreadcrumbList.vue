<script lang="ts" setup>
import { cn } from '@ui/utils';

</script>

<template>
  <ol
    :class="cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', $attrs.class ?? '')"
  >
    <slot />
  </ol>
</template>
