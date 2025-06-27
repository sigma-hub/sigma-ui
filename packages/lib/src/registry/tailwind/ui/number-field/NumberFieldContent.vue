<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <div :class="cn('relative [&>[data-slot=input]]:has-[[data-slot=increment]]:pr-5 [&>[data-slot=input]]:has-[[data-slot=decrement]]:pl-5', $attrs.class ?? '')">
    <slot />
  </div>
</template>
