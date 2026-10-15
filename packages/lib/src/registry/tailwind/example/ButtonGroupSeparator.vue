<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@ui/registry/tailwind/ui/button-group';
</script>

<template>
  <ButtonGroup>
    <Button variant="secondary">
      Copy
    </Button>
    <ButtonGroupSeparator />
    <Button variant="secondary">
      Paste
    </Button>
    <ButtonGroupSeparator />
    <Button variant="secondary">
      Cut
    </Button>
  </ButtonGroup>
</template>
