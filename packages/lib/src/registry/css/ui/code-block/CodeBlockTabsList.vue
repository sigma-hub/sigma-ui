<script setup lang="ts">
import { useAttrs } from 'vue';
import { TabsList, type TabsListProps, useForwardProps } from 'reka-ui';
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
    class="sigma-ui-code-block__tabs-list"
    :class="[$attrs.class]"
  >
    <slot />
  </TabsList>
</template>

<style>
@layer components {
  .sigma-ui-code-block__tabs-list {
    display: flex;
    min-width: 0;
    align-items: center;
    padding: calc(var(--spacing) * 0.5);
    margin: calc(var(--spacing) * -0.5) 0;
    gap: calc(var(--spacing) * 0.5);
    overflow-x: auto;
    scrollbar-width: none;
  }
}
</style>
