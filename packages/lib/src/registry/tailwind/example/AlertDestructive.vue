<script setup lang="ts">
import { AlertCircleIcon } from 'lucide-vue-next';
import { Alert, AlertDescription, AlertTitle } from '@ui/registry/tailwind/ui/alert';
</script>

<template>
  <Alert variant="destructive">
    <AlertCircleIcon class="w-4 h-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>
</template>
