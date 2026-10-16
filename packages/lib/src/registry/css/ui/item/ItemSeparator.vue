<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui';
import { Separator } from '@ui/registry/css/ui/separator';

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <Separator
    v-bind="props"
    data-slot="item-separator"
    class="sigma-ui-item-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-separator.sigma-ui-item-separator {
  margin-block: 0;
}
</style>
