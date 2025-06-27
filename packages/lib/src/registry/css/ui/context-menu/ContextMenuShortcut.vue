<script setup lang="ts">

</script>

<template>
  <span
    class="sigma-ui-context-menu-shortcut"
    :class="$attrs.class"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-context-menu-shortcut {
  margin-left: auto;
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: 0.1em;
  color: hsl(var(--muted-foreground));
}
</style>
