<script setup lang="ts">

</script>

<template>
  <div
    class="sigma-ui-number-field-content"
    :class="$attrs.class"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-number-field-content {
  position: relative;
}

.sigma-ui-number-field-content > [data-slot="input"]:has([data-slot="increment"]) {
  padding-right: 1.25rem;
}

.sigma-ui-number-field-content > [data-slot="input"]:has([data-slot="decrement"]) {
  padding-left: 1.25rem;
}
</style>
