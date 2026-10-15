<script setup lang="ts">

</script>

<template>
  <p
    class="sigma-ui-card__description"
    :class="[$attrs.class]"
    data-slot="card-description"
  >
    <slot />
  </p>
</template>

<style>
.sigma-ui-card__description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
