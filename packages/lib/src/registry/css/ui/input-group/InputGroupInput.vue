<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Input } from '@ui/registry/css/ui/input';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <Input
    v-bind="delegatedAttrs"
    data-slot="input-group-control"
    class="sigma-ui-input-group__control"
    :class="[$attrs.class]"
  />
</template>
