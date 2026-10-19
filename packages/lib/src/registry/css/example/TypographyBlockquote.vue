<template>
  <blockquote class="example-sigma-ui-typography__blockquote">
    "After all," he said, "everyone enjoys a good joke, so it's only fair that
    they should pay for the privilege."
  </blockquote>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-typography__blockquote {
    padding-left: calc(var(--spacing) * 6);
    border-left: 2px solid var(--border);
    margin-top: calc(var(--spacing) * 6);
    font-style: italic;
  }
}
</style>
