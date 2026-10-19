<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '@ui/registry/css/ui/input-group';
</script>

<template>
  <InputGroup class="example-input-group-textarea">
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
        class="example-input-group-textarea__send"
      >
        Send
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>

<style>
@layer components {
  .example-input-group-textarea {
    max-width: 24rem;
  }

  .example-input-group-textarea .example-input-group-textarea__send {
    margin-left: auto;
  }
}
</style>
