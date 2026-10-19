<script setup lang="ts">
import { useAttrs } from 'vue';

import { SplitterGroup, type SplitterGroupEmits, type SplitterGroupProps, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SplitterGroupProps>();
const emits = defineEmits<SplitterGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterGroup
    data-slot="resizable-panel-group"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-resizable-panel-group"
    :class="[$attrs.class]"
  >
    <slot />
  </SplitterGroup>
</template>

<style>
@layer components {
  .sigma-ui-resizable-panel-group {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .sigma-ui-resizable-panel-group[data-panel-group-direction="vertical"] {
    flex-direction: column;
  }
}
</style>
