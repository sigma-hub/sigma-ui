<script setup lang="ts">
import { ref } from 'vue';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@ui/registry/css/ui/pin-input';

const value = ref<string[]>(['1', '2', '3']);
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
      <PinInputGroup>
        <PinInputInput
          v-for="(id, index) in 5"
          :key="id"
          :index="index"
        />
      </PinInputGroup>
    </PinInput>
  </div>
</template>
