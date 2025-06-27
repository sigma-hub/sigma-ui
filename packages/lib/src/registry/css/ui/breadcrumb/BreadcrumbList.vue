<script lang="ts" setup>

</script>

<template>
  <ol
    class="sigma-ui-breadcrumb__list"
    :class="[$attrs.class]"
  >
    <slot />
  </ol>
</template>

<style>
.sigma-ui-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  word-break: break-word;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

@media (min-width: 640px) {
  .sigma-ui-breadcrumb__list {
    gap: 0.625rem;
  }
}
</style>
