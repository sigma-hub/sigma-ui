<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { ButtonGroup, ButtonGroupText } from '@ui/registry/css/ui/button-group';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <div class="example-button-group-input">
    <ButtonGroup class="example-button-group-input__group">
      <Input placeholder="Search..." />
      <Button
        variant="outline"
        size="icon"
        aria-label="Search"
      >
        <SearchIcon class="example-button-group-input__icon" />
      </Button>
    </ButtonGroup>
    <ButtonGroup class="example-button-group-input__group">
      <ButtonGroupText as-child>
        <Label for="button-group-url">https://</Label>
      </ButtonGroupText>
      <Input
        id="button-group-url"
        placeholder="sigma-ui.dev"
      />
    </ButtonGroup>
  </div>
</template>

<style>
.example-button-group-input {
  display: flex;
  width: 100%;
  max-width: 24rem;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
}

.example-button-group-input .example-button-group-input__group {
  width: 100%;
}

.example-button-group-input__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
