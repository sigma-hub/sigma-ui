<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue';
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
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
