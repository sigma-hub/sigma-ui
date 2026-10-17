<script setup lang="ts">
import { useAttrs } from 'vue';

import { UserIcon } from 'lucide-vue-next';
import { avatarVariants } from '.';
import { Image, type ImageVariants } from '@ui/registry/tailwind/ui/image';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  /** URL of the avatar image. */
  src?: string;
  /** Alternative text for the image. */
  alt?: string;
  /** Renders a blurred, saturated copy of the image behind it as a glow. */
  glow?: boolean;
  /** Size of the avatar. */
  size?: 'xs' | 'sm' | 'base' | 'lg';
  /** Corner style of the avatar: circle or rounded. */
  shape?: ImageVariants['shape'];
}>(), {
  size: 'base',
  shape: 'circle',
});

defineSlots<{
  /** Content shown when there is no image or it fails to load; defaults to a user icon. */
  fallback?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    :class="[cn(avatarVariants({ size }), $attrs.class ?? '')]"
    data-slot="avatar"
  >
    <Image
      v-bind="props"
    >
      <template #fallback>
        <slot name="fallback">
          <UserIcon class="w-[40%] h-[40%] text-primary/50" />
        </slot>
      </template>
    </Image>
  </div>
</template>
