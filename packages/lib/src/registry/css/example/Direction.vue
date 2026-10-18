<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@ui/registry/css/ui/button';
import { Direction } from '@ui/registry/css/ui/direction';

const dir = ref<'ltr' | 'rtl'>('rtl');

function toggleDirection() {
  dir.value = dir.value === 'rtl' ? 'ltr' : 'rtl';
}
</script>

<template>
  <Direction
    :dir="dir"
    class="example-direction"
  >
    <div class="example-direction__panel">
      <p class="example-direction__label">
        Reading direction: {{ dir }}
      </p>
      <Button
        variant="outline"
        @click="toggleDirection"
      >
        Switch to {{ dir === 'rtl' ? 'LTR' : 'RTL' }}
      </Button>
    </div>
  </Direction>
</template>

<style>
.example-direction {
  width: 100%;
  max-width: 24rem;
}

.example-direction__panel {
  display: flex;
  width: 100%;
  max-width: 24rem;
  flex-direction: column;
  align-items: flex-start;
  padding: calc(var(--spacing) * 4);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  gap: calc(var(--spacing) * 3);
  text-align: start;
}

.example-direction__label {
  font-size: 0.875rem;
}
</style>
