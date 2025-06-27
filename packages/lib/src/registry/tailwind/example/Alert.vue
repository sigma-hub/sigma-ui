<script setup lang="ts">
import { TerminalIcon } from 'lucide-vue-next';
import { Alert, AlertDescription, AlertTitle } from '@ui/registry/tailwind/ui/alert';
</script>

<template>
  <Alert>
    <TerminalIcon class="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
