<script setup lang="ts">
import { UserIcon } from 'lucide-vue-next';
import { avatarVariants } from '.';
import { Image, type ImageVariants } from '@ui/registry/tailwind/ui/image';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
  glow?: boolean;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  shape?: ImageVariants['shape'];
}>(), {
  size: 'base',
  shape: 'circle',
});
</script>

<template>
  <div :class="[cn(avatarVariants({ size }), $attrs.class ?? '')]">
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
