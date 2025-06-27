<script setup lang="ts">
import { AlertCircleIcon } from 'lucide-vue-next';
import { Alert, AlertDescription, AlertTitle } from '@ui/registry/css/ui/alert';
</script>

<template>
  <Alert variant="destructive">
    <AlertCircleIcon class="example-sigma-ui-alert__icon" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>

<style>
.example-sigma-ui-alert__icon {
  height: 1rem;
  width: 1rem;
}
</style>
