<script setup lang="ts">
import { ref } from 'vue';
import { Label } from '@ui/registry/css/ui/label';
import { Switch } from '@ui/registry/css/ui/switch';

const airplaneMode = ref(false);
</script>

<template>
  <div class="example-sigma-ui-switch">
    <Switch
      id="airplane-mode"
      :model-value="airplaneMode"
      @update:model-value="airplaneMode = $event"
    />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
</template>

<style>
.example-sigma-ui-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
