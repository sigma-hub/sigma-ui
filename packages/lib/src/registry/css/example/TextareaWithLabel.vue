<script setup lang="ts">
import { Textarea } from '@ui/registry/css/ui/textarea';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <div class="example-sigma-ui-textarea-with-label">
    <Label for="message">Your message</Label>
    <Textarea
      id="message"
      placeholder="Type your message here."
    />
  </div>
</template>

<style>
.example-sigma-ui-textarea-with-label {
  display: grid;
  width: 100%;
  gap: 0.5rem;
}
</style>
