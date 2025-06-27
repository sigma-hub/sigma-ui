<script setup lang="ts">
import {
  NavigationMenuContent,
  type NavigationMenuContentEmits,
  type NavigationMenuContentProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<NavigationMenuContentProps>();
const emits = defineEmits<NavigationMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NavigationMenuContent
    v-bind="forwarded"
    class="sigma-ui-navigation-menu-content"
  >
    <slot />
  </NavigationMenuContent>
</template>

<style>
.sigma-ui-navigation-menu-content {
  left: 0;
  top: 0;
  width: 100%;
}

.sigma-ui-navigation-menu-content[data-state^="open"] {
  animation: fadeIn 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-state^="closed"] {
  animation: fadeOut 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-motion="from-end"] {
  animation: slideInFromRight 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-motion="from-start"] {
  animation: slideInFromLeft 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-motion="to-end"] {
  animation: slideOutToRight 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-motion="to-start"] {
  animation: slideOutToLeft 200ms ease-in-out;
}

@media (min-width: 768px) {
  .sigma-ui-navigation-menu-content {
    position: absolute;
    width: auto;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    filter: blur(12px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(13rem);
    filter: blur(12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-13rem);
    filter: blur(12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes slideOutToRight {
  from {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
  to {
    transform: translateX(13rem);
    filter: blur(12px);
    opacity: 0;
  }
}

@keyframes slideOutToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translateX(-13rem);
    filter: blur(12px);
  }
}
</style>
