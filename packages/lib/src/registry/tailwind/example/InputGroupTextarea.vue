<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '@ui/registry/tailwind/ui/input-group';
</script>

<template>
  <InputGroup class="max-w-sm">
    <InputGroupTextarea placeholder="Write a message..." />
    <InputGroupAddon align="block-end">
      <InputGroupButton
        variant="outline"
        size="sm"
      >
        Cancel
      </InputGroupButton>
      <InputGroupButton
        size="sm"
        class="ml-auto"
      >
        Send
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
