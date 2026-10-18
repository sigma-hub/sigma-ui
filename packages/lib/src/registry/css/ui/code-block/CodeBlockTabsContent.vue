<script setup lang="ts">
import { useAttrs } from 'vue';
import { TabsContent, type TabsContentProps, useForwardProps } from 'reka-ui';
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
    class="sigma-ui-code-block__tabs-content"
    :class="[$attrs.class]"
  >
    <slot />
  </TabsContent>
</template>

<style>
.sigma-ui-code-block__tabs-content {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  outline: none;
}

.sigma-ui-code-block__tabs-content[hidden] {
  display: none;
}
</style>
