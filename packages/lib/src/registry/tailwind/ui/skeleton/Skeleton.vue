<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-muted', $attrs.class ?? '')" />
</template>
