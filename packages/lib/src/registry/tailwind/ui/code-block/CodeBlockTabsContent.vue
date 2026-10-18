<script setup lang="ts">
import { useAttrs } from 'vue';
import { TabsContent, type TabsContentProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TabsContentProps>();
const forwardedProps = useForwardProps(props);

defineSlots<{
  /** The `CodeBlockContent` of this tab. */
  default?: () => unknown;
}>();
</script>

<template>
  <TabsContent
    v-bind="{ ...forwardedProps, tabindex: -1, ...delegatedAttrs() }"
    data-slot="code-block-tabs-content"
    :class="cn('flex min-h-0 min-w-0 flex-col outline-none data-[state=inactive]:hidden', $attrs.class ?? '')"
  >
    <slot />
  </TabsContent>
</template>
