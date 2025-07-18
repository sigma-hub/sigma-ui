<script setup lang="ts">
import { UserIcon } from 'lucide-vue-next';
import { avatarVariants } from '.';
import { Image, type ImageVariants } from '@ui/registry/css/ui/image';

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
  <div :class="[avatarVariants({ size }), $attrs.class]">
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
  color: hsl(var(--foreground));
  font-weight: normal;
  user-select: none;
}

.sigma-ui-avatar__fallback-icon {
  width: 40%;
  height: 40%;
  color: hsl(var(--primary) / 50%);
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
