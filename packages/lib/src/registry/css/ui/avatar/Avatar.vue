<script setup lang="ts">
import { useAttrs } from 'vue';

import { UserIcon } from '@lucide/vue';
import { avatarVariants } from '.';
import { Image, type ImageVariants } from '@ui/registry/css/ui/image';
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
    data-slot="avatar"
    v-bind="delegatedAttrs()"
    :class="[avatarVariants({ size }), $attrs.class]"
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
@layer components {
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
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
    font-size: 0.75rem;
  }

  .sigma-ui-avatar--sm {
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
    font-size: 0.75rem;
  }

  .sigma-ui-avatar--base {
    width: calc(var(--spacing) * 16);
    height: calc(var(--spacing) * 16);
    font-size: 1.5rem;
  }

  .sigma-ui-avatar--lg {
    width: calc(var(--spacing) * 32);
    height: calc(var(--spacing) * 32);
    font-size: 3rem;
  }
}
</style>
