<script setup lang="ts">
import { Separator, type SeparatorProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<
  SeparatorProps & { label?: string }
>();
</script>

<template>
  <Separator
    v-bind="props"
    :class="
      cn(
        'shrink-0 bg-border relative',
        props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
        $attrs.class ?? '',
      )

    "
  >
    <span
      v-if="props.label"
      :class="cn('text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
                 props.orientation === 'vertical' ? 'w-[1px] px-1 py-2' : 'h-[1px] py-1 px-2',
      )"
    >{{ props.label }}
    </span>
  </Separator>
</template>
