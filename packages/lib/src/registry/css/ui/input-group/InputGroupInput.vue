<script setup lang="ts">
import { useAttrs } from 'vue';

import { Input } from '@ui/registry/css/ui/input';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <Input
    v-bind="delegatedAttrs()"
    data-slot="input-group-control"
    class="sigma-ui-input-group__control"
    :class="[$attrs.class]"
  />
</template>
