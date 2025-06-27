<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <tfoot :class="cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', $attrs.class ?? '')">
    <slot />
  </tfoot>
</template>
