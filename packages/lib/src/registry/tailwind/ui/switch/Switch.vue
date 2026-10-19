<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SwitchRootProps>();
const emits = defineEmits<SwitchRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SwitchRoot
    data-slot="switch"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300/70',
      $attrs.class ?? '',
    )"
  >
    <SwitchThumb
      :class="cn('pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0')"
    />
  </SwitchRoot>
</template>
