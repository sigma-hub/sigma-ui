<script setup lang="ts">
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { Label } from '@ui/registry/tailwind/ui/label';
</script>

<template>
  <div class="grid w-full gap-2">
    <Label for="message">Your message</Label>
    <Textarea
      id="message"
      placeholder="Type your message here."
    />
  </div>
</template>
