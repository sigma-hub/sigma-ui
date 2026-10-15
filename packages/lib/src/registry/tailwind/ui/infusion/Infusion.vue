<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

interface Props {
  /** URL of the image or video used as the background. */
  src: string;
  /** Opacity of the media in light mode, from 0 to 1. */
  opacity?: number;
  /** Opacity of the media in dark mode, from 0 to 1. */
  opacityDark?: number;
  /** CSS z-index of the overlay. */
  zIndex?: number;
  /** Blur radius applied to the media, in pixels. */
  blur?: number;
  /** Alpha of the generated noise pixels, from 0 to 1; 0 disables the noise layer. */
  noiseIntensity?: number;
  /** Scale multiplier of the noise tile (256px at 1). */
  noiseScale?: number;
  /** Opacity of the noise layer, from 0 to 1. */
  noiseOpacity?: number;
  /** CSS `mix-blend-mode` of the overlay. */
  blendMode?: CSSProperties['mixBlendMode'];
  /** Fills the nearest positioned parent instead of the whole viewport. */
  relative?: boolean;
  /** Whether `src` points to an image or a looping, muted video. */
  type?: 'image' | 'video';
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  opacity: 0.2,
  opacityDark: 0.3,
  zIndex: 100,
  blur: 64,
  noiseIntensity: 0.5,
  noiseScale: 1,
  noiseOpacity: 0.05,
  blendMode: 'normal',
  relative: false,
  type: 'image',
});

const imageStyle = computed(() => ({
  '--infusion-opacity': props.opacity,
  '--infusion-opacity-dark': props.opacityDark,
  '--infusion-z-index': props.zIndex,
  '--infusion-blur': `${props.blur}px`,
  '--infusion-noise-intensity': props.noiseIntensity,
  '--infusion-noise-scale': props.noiseScale,
  '--infusion-noise-opacity': props.noiseOpacity,
  'mixBlendMode': props.blendMode,
}));

const noiseDataUrl = computed(() => {
  if (props.noiseIntensity === 0) {
    return '';
  }

  if (typeof document === 'undefined') {
    return '';
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  if (!context) {
    return '';
  }

  const imageData = context.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const value = Math.random() * 255;
    data[index] = value;
    data[index + 1] = value;
    data[index + 2] = value;
    data[index + 3] = props.noiseIntensity * 255;
  }

  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
});

const containerClass = computed(() => [
  'top-0 left-0 overflow-hidden pointer-events-none z-(--infusion-z-index)',
  props.relative
    ? 'absolute w-full h-full'
    : 'fixed w-screen h-screen',
]);

const mediaClass = 'w-full h-full object-cover scale-110 opacity-(--infusion-opacity) dark:opacity-(--infusion-opacity-dark)';
const noiseClass = 'absolute top-0 left-0 w-full h-full bg-repeat mix-blend-overlay';
</script>

<template>
  <div
    :class="containerClass"
    :style="imageStyle"
  >
    <img
      v-if="props.type === 'image'"
      :class="mediaClass"
      :src="props.src"
      :style="{
        filter: `blur(var(--infusion-blur))`,
      }"
      alt=""
    >
    <video
      v-if="props.type === 'video'"
      :class="mediaClass"
      :src="props.src"
      :style="{
        filter: `blur(var(--infusion-blur))`,
      }"
      autoplay
      loop
      muted
      playsinline
      alt=""
    />
    <div
      v-if="noiseIntensity > 0"
      :class="noiseClass"
      :style="{
        backgroundImage: `url(${noiseDataUrl})`,
        backgroundSize: 'calc(256px * var(--infusion-noise-scale))',
        opacity: 'var(--infusion-noise-opacity)',
      }"
    />
  </div>
</template>
