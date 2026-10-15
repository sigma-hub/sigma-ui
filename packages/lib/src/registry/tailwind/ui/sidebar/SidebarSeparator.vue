<script setup lang="ts">
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { cn } from '@ui/utils';
</script>

<template>
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    :class="cn('mx-2 w-auto bg-border', $attrs.class ?? '')"
  />
</template>
