<script setup lang="ts">
import { Input } from '@ui/registry/tailwind/ui/input';
import { cn } from '@ui/utils';

const model = defineModel<string | number>();
</script>

<template>
  <Input
    v-model="model"
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="cn('h-8 w-full bg-background shadow-none', $attrs.class ?? '')"
  />
</template>
