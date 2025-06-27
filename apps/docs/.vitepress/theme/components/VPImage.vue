<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme';
import { withBase } from 'vitepress';

defineOptions({ inheritAttrs: false });

defineProps<{
  image: DefaultTheme.ThemeableImage;
  alt?: string;
}>();
</script>

<template>
  <div>
    <template v-if="image">
      <img
        v-if="typeof image === 'string' || 'src' in image"
        class="VPImage"
        v-bind="typeof image === 'string' ? $attrs : { ...image, ...$attrs }"
        :src="withBase(typeof image === 'string' ? image : image.src)"
        :alt="alt ?? (typeof image === 'string' ? '' : image.alt || '')"
      >
      <template v-else>
        <VPImage
          class="animate-fade-in hidden dark:block"
          :image="image.dark"
          :alt="image.alt"
          v-bind="$attrs"
        />
        <VPImage
          class="animate-fade-in block dark:hidden"
          :image="image.light"
          :alt="image.alt"
          v-bind="$attrs"
        />
      </template>
    </template>
  </div>
</template>
