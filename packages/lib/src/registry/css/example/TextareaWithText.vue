<script setup lang="ts">
import { Textarea } from '@ui/registry/css/ui/textarea';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <div class="example-sigma-ui-textarea-with-text">
    <Label for="message-2">Your message</Label>
    <Textarea
      id="message-2"
      placeholder="Type your message here."
    />
    <p class="example-sigma-ui-textarea-with-text__help-text">
      Your message will be copied to the support team.
    </p>
  </div>
</template>

<style>
.example-sigma-ui-textarea-with-text {
  display: grid;
  width: 100%;
  gap: 0.5rem;
}

.example-sigma-ui-textarea-with-text__help-text {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}
</style>
