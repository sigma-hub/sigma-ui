<script setup lang="ts">
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { Label } from '@ui/registry/tailwind/ui/label';
</script>

<template>
  <div class="grid w-full gap-2">
    <Label for="message-2">Your message</Label>
    <Textarea
      id="message-2"
      placeholder="Type your message here."
    />
    <p class="text-sm text-muted-foreground">
      Your message will be copied to the support team.
    </p>
  </div>
</template>
