<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Textarea } from '@ui/registry/css/ui/textarea';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <Textarea
    v-bind="delegatedAttrs"
    data-slot="input-group-control"
    class="sigma-ui-input-group__control"
    :class="[$attrs.class]"
  />
</template>
