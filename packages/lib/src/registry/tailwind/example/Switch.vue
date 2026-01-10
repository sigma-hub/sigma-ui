<script setup lang="ts">
import { ref } from 'vue';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Switch } from '@ui/registry/tailwind/ui/switch';

const airplaneMode = ref(false);
</script>

<template>
  <div class="flex items-center space-x-2">
    <Switch
      id="airplane-mode"
      :model-value="airplaneMode"
      @update:model-value="airplaneMode = $event"
    />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
</template>
