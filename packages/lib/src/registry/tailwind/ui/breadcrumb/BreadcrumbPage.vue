<script lang="ts" setup>
import { cn } from '@ui/utils';

</script>

<template>
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="cn('font-normal text-foreground', $attrs.class ?? '')"
    data-slot="breadcrumb-page"
  >
    <slot />
  </span>
</template>
