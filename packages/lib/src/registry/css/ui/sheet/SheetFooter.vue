<script setup lang="ts">

</script>

<template>
  <div
    class="sigma-ui-sheet-footer"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sheet-footer {
  display: flex;
  flex-direction: column-reverse;
}

@media (min-width: 640px) {
  .sigma-ui-sheet-footer {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
