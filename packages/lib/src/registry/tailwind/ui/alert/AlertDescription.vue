<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <div :class="cn('text-sm [&_p]:leading-relaxed', $attrs.class ?? '')">
    <slot />
  </div>
</template>
