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
} from '@ui/registry/css/ui/color';

const color = ref('#3b82f6');
const presets = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'];
</script>

<template>
  <div class="sigma-ui-color-example">
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
    <div class="sigma-ui-color-example__row">
      <ColorSwatch :color="color" />
      <ColorField v-model="color">
        <ColorFieldInput />
      </ColorField>
    </div>
  </div>
</template>

<style>
.sigma-ui-color-example {
  display: flex;
  width: 16rem;
  flex-direction: column;
  gap: 0.75rem;
}

.sigma-ui-color-example__row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
