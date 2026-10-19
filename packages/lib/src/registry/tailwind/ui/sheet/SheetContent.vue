<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { XIcon } from '@lucide/vue';
import { type SheetVariants, sheetVariants } from '.';
import { cn } from '@ui/utils';

interface SheetContentProps extends DialogContentProps {
  /** Edge of the screen the sheet slides in from. */
  side?: SheetVariants['side'];
}

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SheetContentProps>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => ({ ...props, side: undefined }));

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
      data-slot="sheet-content"
      :class="cn(sheetVariants({ side }), $attrs.class ?? '')"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
    >
      <slot />

      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-2 focus:outline-ring focus:outline-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <XIcon class="w-4 h-4 text-muted-foreground" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
