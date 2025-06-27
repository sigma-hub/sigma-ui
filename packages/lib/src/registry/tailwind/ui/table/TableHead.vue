<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <th :class="cn('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', $attrs.class ?? '')">
    <slot />
  </th>
</template>
