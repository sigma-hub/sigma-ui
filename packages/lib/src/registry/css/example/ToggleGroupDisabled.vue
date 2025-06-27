<script setup lang="ts">
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-vue-next';
import { ToggleGroup, ToggleGroupItem } from '@ui/registry/css/ui/toggle-group';
</script>

<template>
  <ToggleGroup
    type="multiple"
    disabled
  >
    <ToggleGroupItem
      value="bold"
      aria-label="Toggle bold"
    >
      <BoldIcon class="example-sigma-ui-toggle-group__icon" />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="italic"
      aria-label="Toggle italic"
    >
      <ItalicIcon class="example-sigma-ui-toggle-group__icon" />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="underline"
      aria-label="Toggle underline"
    >
      <UnderlineIcon class="example-sigma-ui-toggle-group__icon" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>

<style>
.example-sigma-ui-toggle-group__icon {
  width: 1rem;
  height: 1rem;
}
</style>
