<script setup lang="ts">
import { RotateCcwIcon } from '@lucide/vue';
import { ConfirmButton } from '@ui/registry/tailwind/ui/button';
</script>

<template>
  <ConfirmButton>
    <RotateCcwIcon :size="14" />
    Reset
  </ConfirmButton>
</template>
