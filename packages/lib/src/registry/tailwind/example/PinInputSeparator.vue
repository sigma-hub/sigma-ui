<script setup lang="ts">
import { ref } from 'vue';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
  PinInputSeparator,
} from '@ui/registry/tailwind/ui/pin-input';

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
      <PinInputGroup class="gap-1">
        <template
          v-for="(id, index) in 5"
          :key="id"
        >
          <PinInputInput
            class="rounded-md border"
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
