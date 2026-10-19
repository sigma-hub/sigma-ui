<script setup lang="ts">
import { useAttrs } from 'vue';

import { Textarea } from '@ui/registry/css/ui/textarea';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <Textarea
    data-slot="input-group-control"
    v-bind="delegatedAttrs()"
    class="sigma-ui-input-group__control"
    :class="[$attrs.class]"
  />
</template>
