<script setup lang="ts">
import { TerminalIcon } from 'lucide-vue-next';
import { Alert, AlertDescription, AlertTitle } from '@ui/registry/css/ui/alert';
</script>

<template>
  <Alert>
    <TerminalIcon class="example-sigma-ui-alert__icon" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>

<style>
.example-sigma-ui-alert__icon {
  width: 1rem;
  height: 1rem;
}
</style>
