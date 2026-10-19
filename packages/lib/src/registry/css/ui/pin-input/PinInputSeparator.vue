<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';
import { DotIcon } from '@lucide/vue';

const props = defineProps<PrimitiveProps>();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <Primitive
    data-slot="pin-input-separator"
    v-bind="forwardedProps"
    class="sigma-ui-pin-input-separator"
  >
    <slot>
      <DotIcon class="sigma-ui-pin-input-separator__icon" />
    </slot>
  </Primitive>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-pin-input-separator {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sigma-ui-pin-input-separator__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    color: var(--muted-foreground);
  }
}
</style>
