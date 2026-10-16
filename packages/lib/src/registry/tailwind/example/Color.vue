<script setup lang="ts">
import { ref } from 'vue';
import {
  ColorArea,
  ColorAreaArea,
  ColorAreaThumb,
  ColorField,
  ColorFieldInput,
  ColorSlider,
  ColorSliderThumb,
  ColorSliderTrack,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorSwatchPickerItemSwatch,
} from '@ui/registry/tailwind/ui/color';

const color = ref('#3b82f6');
const presets = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'];
</script>

<template>
  <div class="flex w-64 flex-col gap-3">
    <ColorSwatchPicker v-model="color">
      <ColorSwatchPickerItem
        v-for="preset in presets"
        :key="preset"
        :value="preset"
      >
        <ColorSwatchPickerItemSwatch />
      </ColorSwatchPickerItem>
    </ColorSwatchPicker>
    <ColorArea v-model="color">
      <template #default="{ style }">
        <ColorAreaArea :style="style">
          <ColorAreaThumb />
        </ColorAreaArea>
      </template>
    </ColorArea>
    <ColorSlider
      v-model="color"
      channel="hue"
    >
      <ColorSliderTrack />
      <ColorSliderThumb />
    </ColorSlider>
    <div class="flex items-center gap-2">
      <ColorSwatch :color="color" />
      <ColorField v-model="color">
        <ColorFieldInput />
      </ColorField>
    </div>
  </div>
</template>
