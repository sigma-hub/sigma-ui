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
  aspect-ratio: 1;
  height: 1rem;
  width: 1rem;
  border-radius: var(--radius-full);
  border: 1px solid hsl(var(--primary));
  color: hsl(var(--primary));
  background-color: transparent;
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
  height: 0.625rem;
  width: 0.625rem;
  fill: currentColor;
  color: currentColor;
}

.sigma-ui-radio-group-item[data-state="checked"] .sigma-ui-radio-group-item__icon {
  animation: radioCheck 150ms ease-out;
}

.sigma-ui-radio-group-item[data-state="unchecked"] .sigma-ui-radio-group-item__icon {
  animation: radioUncheck 150ms ease-in;
}

@keyframes radioCheck {
  from {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes radioUncheck {
  from {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(4px);
  }
}
</style>
