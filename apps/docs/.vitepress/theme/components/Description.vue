<script setup lang="ts">
type Props = {
  description: string;
};

defineProps<Props>();
</script>

<template>
  <p class="text-lg text-muted-foreground">
    <slot />
  </p>
</template>
