<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
import { CheckIcon } from 'lucide-vue-next';

interface Props extends CheckboxRootProps {
  label?: string;
  description?: string;
  id?: string;
}

const props = defineProps<Props>();
const emits = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <div
    class="sigma-ui-checkbox-wrapper"
    :class="[{ 'sigma-ui-checkbox-wrapper--flex-start': props.description }]"
  >
    <CheckboxRoot
      v-bind="forwarded"
      :id="(props.label && props.id) || forwarded.id"
      class="sigma-ui-checkbox"
    >
      <transition name="fade-slide-top">
        <CheckboxIndicator class="sigma-ui-checkbox__indicator">
          <slot>
            <CheckIcon class="sigma-ui-checkbox__icon" />
          </slot>
        </CheckboxIndicator>
      </transition>
    </CheckboxRoot>
    <div
      v-if="props.label"
      class="sigma-ui-checkbox__content"
    >
      <label
        v-if="props.label"
        class="sigma-ui-checkbox__label"
        :for="props.id"
      >{{ props.label }}
      </label>
      <p
        v-if="props.description"
        class="sigma-ui-checkbox__description"
      >
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<style>
.sigma-ui-checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sigma-ui-checkbox-wrapper--flex-start {
  align-items: flex-start;
}

.sigma-ui-checkbox {
  overflow: hidden;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border: 1px solid hsl(var(--primary));
  border-radius: var(--radius-xs);
  background-color: hsl(var(--background));
}

.sigma-ui-checkbox:focus-visible {
  box-shadow:
    0 0 0 2px hsl(var(--background)),
    0 0 0 4px hsl(var(--ring));
  outline: none;
}

.sigma-ui-checkbox:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.sigma-ui-checkbox[data-state="checked"] {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.sigma-ui-checkbox__indicator {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: currentcolor;
}

.sigma-ui-checkbox__content {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  line-height: 1;
}

.sigma-ui-checkbox__label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  user-select: none;
}

.sigma-ui-checkbox:disabled + .sigma-ui-checkbox__content .sigma-ui-checkbox__label,
.sigma-ui-checkbox:disabled + .sigma-ui-checkbox__content .sigma-ui-checkbox__description {
  opacity: 0.7;
}

.sigma-ui-checkbox__description {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  line-height: 1.25rem;
  user-select: none;
}
</style>
