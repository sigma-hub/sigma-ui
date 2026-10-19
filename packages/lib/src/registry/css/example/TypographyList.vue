<template>
  <ul class="example-sigma-ui-typography__list">
    <li class="example-sigma-ui-typography__list-item">
      1st level of puns: 5 gold coins
    </li>
    <li class="example-sigma-ui-typography__list-item">
      2nd level of jokes: 10 gold coins
    </li>
    <li class="example-sigma-ui-typography__list-item">
      3rd level of one-liners : 20 gold coins
    </li>
  </ul>
</template>

<style>
@layer components {
  .example-sigma-ui-typography__list {
    margin: calc(var(--spacing) * 6) 0 calc(var(--spacing) * 6) calc(var(--spacing) * 6);
    list-style-type: disc;
  }

  .example-sigma-ui-typography__list-item {
    margin-top: calc(var(--spacing) * 2);
  }
}
</style>
