<script lang="ts" setup>
import { cn } from '@ui/utils';

</script>

<template>
  <li
    :class="cn('inline-flex items-center gap-1.5', $attrs.class ?? '')"
    data-slot="breadcrumb-item"
  >
    <slot />
  </li>
</template>
