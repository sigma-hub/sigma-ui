<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@ui/registry/css/ui/input-group';
</script>

<template>
  <InputGroup class="example-input-group-addon">
    <InputGroupAddon>
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput
      placeholder="sigma-ui.dev"
      aria-invalid="true"
    />
  </InputGroup>
</template>

<style>
@layer components {
  .example-input-group-addon {
    max-width: 24rem;
  }
}
</style>
