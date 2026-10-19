<script setup lang="ts">
import { useAttrs } from 'vue';
import { TabsRoot, type TabsRootEmits, type TabsRootProps, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<TabsRootProps>(), {
  activationMode: 'automatic',
});
const emits = defineEmits<TabsRootEmits>();

defineSlots<{
  /** A `CodeBlockHeader` with a `CodeBlockTabsList`, then one `CodeBlockTabsContent` per tab. */
  default?: (props: { modelValue: string | number | undefined }) => unknown;
}>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TabsRoot
    v-slot="{ modelValue }"
    data-slot="code-block-tabs"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-code-block__tabs"
    :class="[$attrs.class]"
  >
    <slot :model-value="modelValue" />
  </TabsRoot>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-code-block__tabs {
    display: flex;
    min-width: 0;
    min-height: 0;
    flex-direction: column;
  }
}
</style>
