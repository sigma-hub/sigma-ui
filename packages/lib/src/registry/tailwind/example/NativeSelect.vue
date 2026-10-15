<script setup lang="ts">
import { NativeSelect, NativeSelectOption } from '@ui/registry/tailwind/ui/native-select';
</script>

<template>
  <NativeSelect aria-label="Fruit">
    <NativeSelectOption value="">
      Select a fruit
    </NativeSelectOption>
    <NativeSelectOption value="apple">
      Apple
    </NativeSelectOption>
    <NativeSelectOption value="banana">
      Banana
    </NativeSelectOption>
    <NativeSelectOption value="orange">
      Orange
    </NativeSelectOption>
  </NativeSelect>
</template>
