<script setup lang="ts">
import { Input } from '@ui/registry/css/ui/input';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Input
    v-bind="$attrs"
    data-slot="input-group-control"
    class="sigma-ui-input-group__control"
    :class="[$attrs.class]"
  />
</template>
