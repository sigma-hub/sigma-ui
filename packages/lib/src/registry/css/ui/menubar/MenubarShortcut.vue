<script setup lang="ts">

</script>

<template>
  <span
    class="sigma-ui-menubar-shortcut"
    :class="[$attrs.class]"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-menubar-shortcut {
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: hsl(var(--muted-foreground));
}
</style>
