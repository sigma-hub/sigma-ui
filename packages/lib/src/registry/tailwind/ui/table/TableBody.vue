<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <tbody :class="cn('[&_tr:last-child]:border-0', $attrs.class ?? '')"
  data-slot="table-body">
    <slot />
  </tbody>
</template>
