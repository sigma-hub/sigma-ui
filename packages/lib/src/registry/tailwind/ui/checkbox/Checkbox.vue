<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
import { CheckIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

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
  <div :class="cn('peer flex items-center gap-2', { 'items-start': props.description })">
    <CheckboxRoot
      v-bind="forwarded"
      :id="(props.label && props.id) || forwarded.id"
      :class="cn(
        'peer h-4 w-4 shrink-0 rounded-xs border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground overflow-hidden',
      )"
    >
      <transition name="fade-slide-top">
        <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
          <slot>
            <CheckIcon class="h-4 w-4" />
          </slot>
        </CheckboxIndicator>
      </transition>
    </CheckboxRoot>
    <div
      v-if="props.label"
      class="flex flex-col gap-1.5 leading-none peer-disabled:opacity-70"
    >
      <label
        v-if="props.label"
        class="text-sm font-medium leading-none select-none"
        :for="props.id"
      >{{ props.label }}
      </label>
      <p
        v-if="props.description"
        class="text-sm leading-5 text-muted-foreground select-none"
      >
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
