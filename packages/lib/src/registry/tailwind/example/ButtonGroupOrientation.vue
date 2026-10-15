<script setup lang="ts">
import { MinusIcon, PlusIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { ButtonGroup } from '@ui/registry/tailwind/ui/button-group';
</script>

<template>
  <ButtonGroup
    orientation="vertical"
    aria-label="Zoom controls"
  >
    <Button
      variant="outline"
      size="icon"
      aria-label="Zoom in"
    >
      <PlusIcon class="size-4" />
    </Button>
    <Button
      variant="outline"
      size="icon"
      aria-label="Zoom out"
    >
      <MinusIcon class="size-4" />
    </Button>
  </ButtonGroup>
</template>
