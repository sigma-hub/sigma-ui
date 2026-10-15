<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';
import { DotIcon } from 'lucide-vue-next';

const props = defineProps<PrimitiveProps>();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    class="sigma-ui-pin-input-separator"
    data-slot="pin-input-separator"
  >
    <slot>
      <DotIcon class="sigma-ui-pin-input-separator__icon" />
    </slot>
  </Primitive>
</template>

<style>
.sigma-ui-pin-input-separator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sigma-ui-pin-input-separator__icon {
  width: 1rem;
  height: 1rem;
  color: var(--muted-foreground);
}
</style>
