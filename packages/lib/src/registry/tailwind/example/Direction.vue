<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Direction } from '@ui/registry/tailwind/ui/direction';

const dir = ref<'ltr' | 'rtl'>('rtl');

function toggleDirection() {
  dir.value = dir.value === 'rtl' ? 'ltr' : 'rtl';
}
</script>

<template>
  <Direction
    :dir="dir"
    class="w-full max-w-sm"
  >
    <div class="flex w-full max-w-sm flex-col items-start gap-3 rounded-md border p-4 text-start">
      <p class="text-sm">
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
