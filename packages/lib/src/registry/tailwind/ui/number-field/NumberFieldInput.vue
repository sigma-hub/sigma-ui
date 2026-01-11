<script setup lang="ts">
import { NumberFieldInput } from 'reka-ui';
import { cn } from '@ui/utils';
</script>

<template>
  <NumberFieldInput
    data-slot="input"
    :class="cn('flex h-10 w-full rounded-md border border-border bg-transparent py-2 text-sm text-center placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50')"
  />
</template>
