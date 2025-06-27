<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/registry/css/ui/tooltip';
</script>

<template>
  <TooltipProvider>
    <Tooltip :delay-duration="0">
      <TooltipTrigger as-child>
        <Button variant="outline">
          Hover
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
