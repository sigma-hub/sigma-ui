<script setup lang="ts">
import { useAttrs } from 'vue';

import { SplitterResizeHandle, type SplitterResizeHandleEmits, type SplitterResizeHandleProps, useForwardPropsEmits } from 'reka-ui';
import { GripVerticalIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SplitterResizeHandleProps & {
  /** Shows a visible grip icon on the handle. */
  withHandle?: boolean;
}>();
const emits = defineEmits<SplitterResizeHandleEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterResizeHandle
    data-slot="resizable-handle"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-resizable-handle"
    :class="[$attrs.class]"
  >
    <template v-if="props.withHandle">
      <div class="sigma-ui-resizable-handle__grip">
        <GripVerticalIcon class="sigma-ui-resizable-handle__grip-icon" />
      </div>
    </template>
  </SplitterResizeHandle>
</template>

<style>
.sigma-ui-resizable-handle {
  position: relative;
  display: flex;
  width: 1px;
  align-items: center;
  justify-content: center;
  background-color: var(--border);
}

.sigma-ui-resizable-handle::after {
  position: absolute;
  left: 50%;
  width: 4px;
  content: '';
  inset-block: 0;
  transform: translateX(-50%);
}

.sigma-ui-resizable-handle:focus-visible {
  outline: 1px solid var(--ring);
  outline-offset: 1px;
}

.sigma-ui-resizable-handle[data-orientation="vertical"] {
  width: 100%;
  height: 1px;
}

.sigma-ui-resizable-handle[data-orientation="vertical"]::after {
  left: 0;
  width: 100%;
  height: 4px;
  transform: translateY(-50%);
}

.sigma-ui-resizable-handle[data-orientation="vertical"] > div {
  transform: rotate(90deg);
}

.sigma-ui-resizable-handle__grip {
  z-index: 10;
  display: flex;
  width: calc(var(--spacing) * 3);
  height: calc(var(--spacing) * 4);
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background-color: var(--border);
}

.sigma-ui-resizable-handle__grip-icon {
  width: calc(var(--spacing) * 2.5);
  height: calc(var(--spacing) * 2.5);
}
</style>
