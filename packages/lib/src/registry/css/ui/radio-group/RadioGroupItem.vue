<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'reka-ui';
import { CircleIcon } from '@lucide/vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RadioGroupItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-radio-group-item"
    :class="[$attrs.class]"
  >
    <RadioGroupIndicator
      class="sigma-ui-radio-group-item__indicator"
    >
      <CircleIcon class="sigma-ui-radio-group-item__icon" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

<style>
@layer components {
  .sigma-ui-radio-group-item {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    border: 1px solid var(--primary);
    border-radius: var(--radius-full);
    aspect-ratio: 1;
    background-color: transparent;
    color: var(--primary);
    transition: all 150ms ease-out;
  }

  .sigma-ui-radio-group-item:focus {
    outline: none;
  }

  .sigma-ui-radio-group-item:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
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
    width: calc(var(--spacing) * 2.5);
    height: calc(var(--spacing) * 2.5);
    color: currentcolor;
    fill: currentcolor;
  }

  .sigma-ui-radio-group-item[data-state="checked"] .sigma-ui-radio-group-item__icon {
    animation: sigma-ui-radio-check 150ms ease-out;
  }

  .sigma-ui-radio-group-item[data-state="unchecked"] .sigma-ui-radio-group-item__icon {
    animation: sigma-ui-radio-uncheck 150ms ease-in;
  }

  @keyframes sigma-ui-radio-check {
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

  @keyframes sigma-ui-radio-uncheck {
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
}
</style>
