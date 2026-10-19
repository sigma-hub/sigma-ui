<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { ButtonGroup, ButtonGroupText } from '@ui/registry/tailwind/ui/button-group';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <ButtonGroup class="w-full">
      <Input placeholder="Search..." />
      <Button
        variant="outline"
        size="icon"
        aria-label="Search"
      >
        <SearchIcon class="size-4" />
      </Button>
    </ButtonGroup>
    <ButtonGroup class="w-full">
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
