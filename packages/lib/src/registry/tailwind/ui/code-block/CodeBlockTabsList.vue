<script setup lang="ts">
import { useAttrs } from 'vue';
import { TabsList, type TabsListProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TabsListProps>();
const forwardedProps = useForwardProps(props);

defineSlots<{
  /** `CodeBlockTabsTrigger` elements. */
  default?: () => unknown;
}>();
</script>

<template>
  <TabsList
    data-slot="code-block-tabs-list"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('-my-0.5 flex min-w-0 items-center gap-0.5 overflow-x-auto p-0.5 [scrollbar-width:none]', $attrs.class ?? '')"
  >
    <slot />
  </TabsList>
</template>
