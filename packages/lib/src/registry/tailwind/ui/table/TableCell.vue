<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <td
    :class="
      cn(
        'p-4 align-middle [&:has([role=checkbox])]:pr-0',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </td>
</template>
