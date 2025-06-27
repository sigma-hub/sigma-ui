<script setup lang="ts">
import { MoreHorizontalIcon } from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/tailwind/ui/dropdown-menu';
import { Button } from '@ui/registry/tailwind/ui/button';

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
        class="h-8 w-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <MoreHorizontalIcon class="h-4 w-4" />
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
