<script setup lang="ts">
import { useAttrs } from 'vue';
import { TabsRoot, type TabsRootEmits, type TabsRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    data-slot="code-block-tabs"
    :class="cn('flex min-h-0 min-w-0 flex-col', $attrs.class ?? '')"
  >
    <slot :model-value="modelValue" />
  </TabsRoot>
</template>
