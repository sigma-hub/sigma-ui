<script setup lang="ts">
import { MailIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
</script>

<template>
  <Button>
    <MailIcon class="example-sigma-ui-button-with-icon" /> Login with Email
  </Button>
</template>

<style>
.example-sigma-ui-button-with-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
</style>
