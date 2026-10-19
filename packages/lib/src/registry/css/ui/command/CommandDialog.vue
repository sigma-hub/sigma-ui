<script setup lang="ts">
import { useForwardPropsEmits } from 'reka-ui';
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import Command from './Command.vue';
import { Dialog, DialogContent } from '@ui/registry/css/ui/dialog';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <Dialog
    data-slot="command-dialog"
    v-bind="forwarded"
  >
    <DialogContent class="sigma-ui-command-dialog">
      <Command class="sigma-ui-command-dialog__command">
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-command-dialog {
    overflow: hidden;
    padding: 0;
    box-shadow: var(--shadow-lg);
  }

  .sigma-ui-command-dialog__command [cmdk-group-heading] {
    padding-right: calc(var(--spacing) * 2);
    padding-left: calc(var(--spacing) * 2);
    color: var(--muted-foreground);
    font-weight: 500;
  }

  .sigma-ui-command-dialog__command [cmdk-group]:not([hidden]) ~ [cmdk-group] {
    padding-top: 0;
  }

  .sigma-ui-command-dialog__command [cmdk-group] {
    padding-right: calc(var(--spacing) * 2);
    padding-left: calc(var(--spacing) * 2);
  }

  .sigma-ui-command-dialog__command [cmdk-input-wrapper] svg {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  .sigma-ui-command-dialog__command [cmdk-input] {
    height: calc(var(--spacing) * 12);
  }

  .sigma-ui-command-dialog__command [cmdk-item] {
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 2);
  }

  .sigma-ui-command-dialog__command [cmdk-item] svg {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }
}
</style>
