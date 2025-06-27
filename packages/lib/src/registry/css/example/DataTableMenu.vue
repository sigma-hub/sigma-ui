<script setup lang="ts">
import { MoreHorizontalIcon } from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/css/ui/dropdown-menu';
import { Button } from '@ui/registry/css/ui/button';

type Props = {
  payment: {
    id: string;
  };
};

type Emits = {
  expand: [];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function copy(id: string) {
  navigator.clipboard.writeText(id);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="example-sigma-ui-data-table-menu__button"
      >
        <span class="example-sigma-ui-data-table-menu__button-label">Open menu</span>
        <MoreHorizontalIcon class="example-sigma-ui-data-table-menu__button-icon" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuItem @click="emit('expand')">
        Expand
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
.example-sigma-ui-data-table-menu__button {
  height: 2rem;
  width: 2rem;
  padding: 0;
}

.example-sigma-ui-data-table-menu__button-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.example-sigma-ui-data-table-menu__button-icon {
  width: 1rem;
  height: 1rem;
}
</style>
