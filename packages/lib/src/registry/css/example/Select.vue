<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/css/ui/select';
</script>

<template>
  <Select>
    <SelectTrigger class="example-sigma-ui-select__trigger">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">
          Apple
        </SelectItem>
        <SelectItem value="banana">
          Banana
        </SelectItem>
        <SelectItem value="blueberry">
          Blueberry
        </SelectItem>
        <SelectItem value="grapes">
          Grapes
        </SelectItem>
        <SelectItem value="pineapple">
          Pineapple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style>
.example-sigma-ui-select__trigger {
  width: 11.25rem;
}
</style>
