<script setup lang="ts">
import { RotateCcwIcon } from 'lucide-vue-next';
import { ConfirmButton } from '@ui/registry/tailwind/ui/button';
</script>

<template>
  <ConfirmButton>
    <RotateCcwIcon :size="14" />
    Reset
  </ConfirmButton>
</template>
