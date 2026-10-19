<script setup lang="ts">
import { MailIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
</script>

<template>
  <Button>
    <MailIcon class="example-sigma-ui-button-with-icon" /> Login with Email
  </Button>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-button-with-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    margin-right: calc(var(--spacing) * 2);
  }
}
</style>
