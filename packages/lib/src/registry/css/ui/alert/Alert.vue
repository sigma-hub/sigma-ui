<script setup lang="ts">
import { useAttrs } from 'vue';
import { type AlertVariants, alertVariants } from '.';

const { variant } = defineProps<{
  /** Visual style of the alert, such as destructive for errors. */
  variant?: AlertVariants['variant'];
}>();
const attrs = useAttrs();
</script>

<template>
  <div
    class="sigma-ui-alert"
    :class="[alertVariants({ variant }), attrs.class]"
    role="alert"
    data-slot="alert"
  >
    <slot />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-alert {
    position: relative;
    width: 100%;
    padding: calc(var(--spacing) * 4);
    border-width: 1px;
    border-radius: var(--radius);
  }

  .sigma-ui-alert > svg ~ * {
    padding-left: calc(var(--spacing) * 7);
  }

  .sigma-ui-alert > svg + div {
    transform: translateY(-3px);
  }

  .sigma-ui-alert > svg {
    position: absolute;
    top: calc(var(--spacing) * 4);
    left: calc(var(--spacing) * 4);
    color: var(--foreground);
  }

  .sigma-ui-alert-default {
    background-color: var(--background);
    color: var(--foreground);
  }

  .sigma-ui-alert-destructive {
    border-color: color-mix(in oklch, var(--destructive) 50%, transparent);
    color: var(--destructive);
  }

  .dark .sigma-ui-alert-destructive {
    border-color: var(--destructive);
    background-color: color-mix(in oklch, var(--destructive) 20%, transparent);
    color: hsl(356.94deg 96% 58%);
  }

  .sigma-ui-alert-destructive > svg {
    color: hsl(356.94deg 96% 58%);
  }
}
</style>
