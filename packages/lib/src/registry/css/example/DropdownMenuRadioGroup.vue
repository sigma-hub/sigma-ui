<script lang="ts" setup>
import { ref } from 'vue';
import { Button } from '@ui/registry/css/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';

const position = ref('bottom');
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        Open
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="example-sigma-ui-dropdown-radio__content">
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="position">
        <DropdownMenuRadioItem value="top">
          Top
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">
          Bottom
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">
          Right
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
.example-sigma-ui-dropdown-radio__content {
  width: 14rem;
}
</style>
