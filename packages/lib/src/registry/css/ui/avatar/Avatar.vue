<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { UserIcon } from 'lucide-vue-next';
import { avatarVariants } from '.';
import { Image, type ImageVariants } from '@ui/registry/css/ui/image';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="delegatedAttrs"
    :class="[avatarVariants({ size }), $attrs.class]"
    data-slot="avatar"
  >
    <Image
      v-bind="props"
    >
      <template #fallback>
        <slot name="fallback">
          <UserIcon class="sigma-ui-avatar__fallback-icon" />
        </slot>
      </template>
    </Image>
  </div>
</template>

<style>
.sigma-ui-avatar {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: var(--foreground);
  font-weight: normal;
  user-select: none;
}

.sigma-ui-avatar__fallback-icon {
  width: 40%;
  height: 40%;
  color: color-mix(in oklch, var(--primary) 50%, transparent);
}

.sigma-ui-avatar--xs {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
}

.sigma-ui-avatar--sm {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.75rem;
}

.sigma-ui-avatar--base {
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
}

.sigma-ui-avatar--lg {
  width: 8rem;
  height: 8rem;
  font-size: 3rem;
}
</style>
