<script setup lang="ts">
import { ref } from 'vue';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
  PinInputSeparator,
} from '@ui/registry/css/ui/pin-input';

const value = ref<string[]>([]);
const handleComplete = (e: string[]) => alert(e.join(''));
</script>

<template>
  <div>
    <PinInput
      id="pin-input"
      v-model="value"
      placeholder="○"
      @complete="handleComplete"
    >
      <PinInputGroup class="example-sigma-ui-pin-input-separator__group">
        <template
          v-for="(id, index) in 5"
          :key="id"
        >
          <PinInputInput
            class="example-sigma-ui-pin-input-separator__input"
            :index="index"
          />
          <template v-if="index !== 4">
            <PinInputSeparator />
          </template>
        </template>
      </PinInputGroup>
    </PinInput>
  </div>
</template>

<style>
.example-sigma-ui-pin-input-separator__group {
  gap: 0.25rem;
}

.example-sigma-ui-pin-input-separator__input {
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}
</style>
