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
  top: 0;
  left: 0;
  width: 100%;
  animation: fade-out 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-state="open"] {
  animation: fade-in 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-motion="from-end"][data-state="open"] {
  animation: slide-in-from-right 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-motion="from-start"][data-state="open"] {
  animation: slide-in-from-left 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-motion="to-end"][data-state="closed"] {
  animation: slide-out-to-right 200ms ease-in-out;
}

.sigma-ui-navigation-menu-content[data-motion="to-start"][data-state="closed"] {
  animation: slide-out-to-left 200ms ease-in-out;
}

@media (width >= 768px) {
  .sigma-ui-navigation-menu-content {
    position: absolute;
    width: auto;
  }
}

@keyframes fade-in {
  from {
    filter: blur(12px);
    opacity: 0;
  }

  to {
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes slide-in-from-right {
  from {
    filter: blur(12px);
    opacity: 0;
    transform: translateX(13rem);
  }

  to {
    filter: blur(0);
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-from-left {
  from {
    filter: blur(12px);
    opacity: 0;
    transform: translateX(-13rem);
  }

  to {
    filter: blur(0);
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-out-to-right {
  from {
    filter: blur(0);
    opacity: 1;
    transform: translateX(0);
  }

  to {
    filter: blur(12px);
    opacity: 0;
    transform: translateX(13rem);
  }
}

@keyframes slide-out-to-left {
  from {
    filter: blur(0);
    opacity: 1;
    transform: translateX(0);
  }

  to {
    filter: blur(12px);
    opacity: 0;
    transform: translateX(-13rem);
  }
}
</style>
