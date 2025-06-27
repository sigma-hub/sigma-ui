<script setup lang="ts">
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { Button } from '@ui/registry/tailwind/ui/button';
</script>

<template>
  <div class="grid w-full gap-2">
    <Textarea placeholder="Type your message here." />
    <Button>Send message</Button>
  </div>
</template>
