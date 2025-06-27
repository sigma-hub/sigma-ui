<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <tr :class="cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', $attrs.class ?? '')">
    <slot />
  </tr>
</template>
