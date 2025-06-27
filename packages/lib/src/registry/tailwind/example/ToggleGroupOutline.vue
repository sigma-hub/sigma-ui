<script setup lang="ts">
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-vue-next';
import { ToggleGroup, ToggleGroupItem } from '@ui/registry/tailwind/ui/toggle-group';
</script>

<template>
  <ToggleGroup
    type="multiple"
    variant="outline"
  >
    <ToggleGroupItem
      value="bold"
      aria-label="Toggle bold"
    >
      <BoldIcon class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="italic"
      aria-label="Toggle italic"
    >
      <ItalicIcon class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="underline"
      aria-label="Toggle underline"
    >
      <UnderlineIcon class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
