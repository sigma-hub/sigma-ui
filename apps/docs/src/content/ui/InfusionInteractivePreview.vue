<script setup lang="ts">
import { ref, computed } from 'vue';
import { Infusion } from '@ui/registry/tailwind/ui/infusion';
import { Slider } from '@ui/registry/tailwind/ui/slider';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Switch } from '@ui/registry/tailwind/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/tailwind/ui/select';
import { Card, CardContent, CardHeader } from '@ui/registry/tailwind/ui/card';
import { useConfigStore } from '@/stores/config';

const {
  config,
} = useConfigStore();

const items = ref([
  {
    image: '/infusion-bg.png',
    type: 'image',
  },
  {
    image: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video',
  },
]);

const selectedItem = ref({
  image: '/infusion-bg.png',
  type: 'image',
});

const imageOpacity = ref([config.value.infusionImageOpacity]);
const imageOpacityDark = ref([config.value.infusionImageOpacityDark]);
const blur = ref([config.value.infusionBlur]);
const noiseIntensity = ref([config.value.infusionNoiseIntensity]);
const noiseOpacity = ref([config.value.infusionNoiseOpacity]);

const imageOpacityValue = computed(() => imageOpacity.value[0]);
const imageOpacityDarkValue = computed(() => imageOpacityDark.value[0]);
const blurValue = computed(() => blur.value[0]);
const noiseIntensityValue = computed(() => noiseIntensity.value[0]);
const noiseOpacityValue = computed(() => noiseOpacity.value[0]);
</script>

<template>
  <div>
    <div class="relative w-full min-h-[600px] rounded-lg overflow-hidden border bg-background p-8">
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex flex-col gap-4">
          <div class="text-4xl font-bold">
            Interactive Infusion Demo
          </div>
          <p class="text-muted-foreground text-lg">
            Adjust the sliders below. Notice how it overlays all components in this block.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div>Sample Form</div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex flex-col gap-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                class="flex h-10 w-full"
              />
            </div>
            <div class="flex flex-col gap-4">
              <Label>Message</Label>
              <Textarea
                placeholder="Type your message..."
                class="flex min-h-[80px] w-full"
              />
            </div>
            <div class="flex gap-3">
              <Button>Submit</Button>
              <Button variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Infusion
        relative
        :src="selectedItem.image"
        :type="(selectedItem.type as 'image' | 'video')"
        :opacity="imageOpacityValue"
        :opacity-dark="imageOpacityDarkValue"
        :blur="blurValue"
        :noise-intensity="noiseIntensityValue"
        :noise-opacity="noiseOpacityValue"
        :z-index="1000"
      />

      <Card class="mt-6">
        <CardHeader>
          <div>Customize Effect</div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between rounded-lg border p-3">
              <div class="space-y-0.5">
                <Label class="text-base font-medium">Global Infusion</Label>
                <div class="text-xs text-muted-foreground">
                  Enable/disable the global page effect
                </div>
              </div>
              <Switch
                v-model="config.infusionEnabled"
              />
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <Select v-model="selectedItem">
              <SelectTrigger>
                <div>
                  <span class="text-muted-foreground">type: </span>
                  <SelectValue placeholder="Select type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="item in items"
                  :key="item.image"
                  :value="item"
                  class="text-xs"
                >
                  {{ item.type }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-4">
            <Label>Image Opacity (Light): {{ imageOpacityValue.toFixed(2) }}</Label>
            <Slider
              v-model="imageOpacity"
              :min="0"
              :max="1"
              :step="0.01"
            />
          </div>

          <div class="flex flex-col gap-4">
            <Label>Image Opacity (Dark): {{ imageOpacityDarkValue.toFixed(2) }}</Label>
            <Slider
              v-model="imageOpacityDark"
              :min="0"
              :max="1"
              :step="0.01"
            />
          </div>

          <div class="flex flex-col gap-4">
            <Label>Blur: {{ blurValue }}px</Label>
            <Slider
              v-model="blur"
              :min="0"
              :max="200"
              :step="1"
            />
          </div>

          <div class="flex flex-col gap-4">
            <Label>Noise Intensity: {{ noiseIntensityValue.toFixed(2) }}</Label>
            <Slider
              v-model="noiseIntensity"
              :min="0"
              :max="1"
              :step="0.01"
            />
          </div>

          <div class="flex flex-col gap-4">
            <Label>Noise Opacity: {{ noiseOpacityValue.toFixed(2) }}</Label>
            <Slider
              v-model="noiseOpacity"
              :min="0"
              :max="0.5"
              :step="0.01"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
