<script setup lang="ts">
import { useAttrs } from 'vue';
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TabsTriggerProps>();

defineSlots<{
  /** A file name or a package manager, with an optional leading icon. */
  default?: () => unknown;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TabsTrigger
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    data-slot="code-block-tabs-trigger"
    :class="cn('inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[calc(var(--radius)-4px)] border-0 bg-transparent px-2.5 font-[inherit] font-medium whitespace-nowrap text-muted-foreground outline-none transition-[color,background-color,box-shadow] hover:text-foreground focus-visible:shadow-[0_0_0_2px_var(--ring)] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-[0_0_0_1px_var(--code-block-border),0_1px_2px_rgb(0_0_0/5%)] in-data-[size=sm]:h-6 in-data-[size=sm]:px-2 motion-reduce:transition-none [&_svg]:size-3.5 [&_svg]:shrink-0', $attrs.class ?? '')"
  >
    <slot />
  </TabsTrigger>
</template>
