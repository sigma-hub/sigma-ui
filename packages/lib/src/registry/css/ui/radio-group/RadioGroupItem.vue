<script setup lang="ts">
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'reka-ui';
import { CircleIcon } from 'lucide-vue-next';

const props = defineProps<RadioGroupItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    class="sigma-ui-radio-group-item"
  >
    <RadioGroupIndicator
      class="sigma-ui-radio-group-item__indicator"
    >
      <CircleIcon class="sigma-ui-radio-group-item__icon" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

<style>
.sigma-ui-radio-group-item {
  width: 1rem;
  height: 1rem;
  border: 1px solid hsl(var(--primary));
  border-radius: var(--radius-full);
  aspect-ratio: 1;
  background-color: transparent;
  color: hsl(var(--primary));
  transition: all 150ms ease-out;
}

.sigma-ui-radio-group-item:focus {
  outline: none;
}

.sigma-ui-radio-group-item:focus-visible {
  box-shadow: 0 0 0 2px hsl(var(--background)),
              0 0 0 4px hsl(var(--ring));
}

.sigma-ui-radio-group-item:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.sigma-ui-radio-group-item__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sigma-ui-radio-group-item__icon {
  width: 0.625rem;
  height: 0.625rem;
  color: currentcolor;
  fill: currentcolor;
}

.sigma-ui-radio-group-item[data-state="checked"] .sigma-ui-radio-group-item__icon {
  animation: radio-check 150ms ease-out;
}

.sigma-ui-radio-group-item[data-state="unchecked"] .sigma-ui-radio-group-item__icon {
  animation: radio-uncheck 150ms ease-in;
}

@keyframes radio-check {
  from {
    filter: blur(4px);
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    filter: blur(0);
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes radio-uncheck {
  from {
    filter: blur(0);
    opacity: 1;
    transform: scale(1);
  }

  to {
    filter: blur(4px);
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
