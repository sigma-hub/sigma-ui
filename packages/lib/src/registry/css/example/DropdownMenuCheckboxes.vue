<script lang="ts" setup>
import type { DropdownMenuCheckboxItemProps } from 'reka-ui';
import { ref } from 'vue';
import { Button } from '@ui/registry/css/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';

type Checked = DropdownMenuCheckboxItemProps['modelValue'];

const showStatusBar = ref<Checked>(true);
const showActivityBar = ref<Checked>(false);
const showPanel = ref<Checked>(false);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        Open
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="example-sigma-ui-dropdown__content">
      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        v-model="showStatusBar"
      >
        Status Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        v-model="showActivityBar"
        disabled
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        v-model="showPanel"
      >
        Panel
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
.example-sigma-ui-dropdown__content {
  width: 14rem;
}
</style>
