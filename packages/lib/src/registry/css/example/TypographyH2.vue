<template>
  <h2 class="example-sigma-ui-typography__heading-2">
    The People of the Kingdom
  </h2>
</template>

<style>
@layer components {
  .example-sigma-ui-typography__heading-2 {
    padding-bottom: calc(var(--spacing) * 2);
    border-bottom: 1px solid var(--border);
    font-size: 1.875rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    scroll-margin-top: calc(var(--spacing) * 20);
    transition-duration: 150ms;
    transition-property: color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .example-sigma-ui-typography__heading-2:first-child {
    margin-top: 0;
  }
}
</style>
