<script setup lang="ts">
</script>

<template>
  <div
    class="sigma-ui-dialog-footer"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-dialog-footer {
  display: flex;
  flex-direction: column-reverse;
}

@media (width >= 640px) {
  .sigma-ui-dialog-footer {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
