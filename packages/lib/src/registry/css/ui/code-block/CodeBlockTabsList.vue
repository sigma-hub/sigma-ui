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
.sigma-ui-code-block__tabs-list {
  display: flex;
  min-width: 0;
  align-items: center;
  padding: 0.125rem;
  margin: -0.125rem 0;
  gap: 0.125rem;
  overflow-x: auto;
  scrollbar-width: none;
}
</style>
