<script setup lang="ts">
import { Textarea } from '@ui/registry/css/ui/textarea';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Textarea
    v-bind="$attrs"
    data-slot="input-group-control"
    class="sigma-ui-input-group__control"
    :class="[$attrs.class]"
  />
</template>
