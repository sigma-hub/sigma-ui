<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { useAttrs } from 'vue';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const model = defineModel<AcceptableValue | AcceptableValue[]>({
  default: '',
});

const attrs = useAttrs();
const selectAttrs = () => Object.fromEntries(
  Object.entries(attrs).filter(([key]) => key !== 'class'),
);

defineSlots<{
  /**
   * `NativeSelectOption` and `NativeSelectOptGroup` children.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="native-select-wrapper"
    :class="cn('group/native-select relative w-fit has-[select:disabled]:opacity-50', attrs.class ?? '')"
  >
    <select
      v-model="model"
      data-slot="native-select"
      v-bind="selectAttrs()"
      :class="cn(
        'flex h-9 w-full min-w-0 appearance-none rounded-md border border-border bg-input py-2 pr-9 pl-3 text-sm outline-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive',
      )"
    >
      <slot />
    </select>
    <ChevronDownIcon
      class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground opacity-50"
      aria-hidden="true"
      data-slot="native-select-icon"
    />
  </div>
</template>
