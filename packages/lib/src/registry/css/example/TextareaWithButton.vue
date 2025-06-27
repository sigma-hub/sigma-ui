<script setup lang="ts">
import { Textarea } from '@ui/registry/css/ui/textarea';
import { Button } from '@ui/registry/css/ui/button';
</script>

<template>
  <div class="example-sigma-ui-textarea-with-button">
    <Textarea placeholder="Type your message here." />
    <Button>Send message</Button>
  </div>
</template>

<style>
.example-sigma-ui-textarea-with-button {
  display: grid;
  width: 100%;
  gap: 0.5rem;
}
</style>
