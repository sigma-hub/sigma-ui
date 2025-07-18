<script setup lang="ts">

</script>

<template>
  <span
    class="sigma-ui-command-shortcut"
    :class="$attrs.class"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-command-shortcut {
  margin-left: auto;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  line-height: 1rem;
}
</style>
