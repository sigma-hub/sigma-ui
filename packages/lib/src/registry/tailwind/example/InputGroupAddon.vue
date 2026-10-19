<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@ui/registry/tailwind/ui/input-group';
</script>

<template>
  <InputGroup class="max-w-sm">
    <InputGroupAddon>
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput
      placeholder="sigma-ui.dev"
      aria-invalid="true"
    />
  </InputGroup>
</template>
