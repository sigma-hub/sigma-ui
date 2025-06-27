<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/tailwind/ui/select';
import { cn } from '@ui/utils';
import { useConfigStore } from '@/stores/config';

const { config } = useConfigStore();

const stylesSystems = [
  { name: 'tailwind', label: 'Tailwind' },
  { name: 'css', label: 'CSS' },
];
</script>

<template>
  <Select v-model="config.styleSystem">
    <SelectTrigger :class="cn('h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4', $attrs.class ?? '')">
      <div>
        <span class="text-muted-foreground">Style: </span>
        <SelectValue placeholder="Select style" />
      </div>
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="style in stylesSystems"
        :key="style.name"
        :value="style.name"
        class="text-xs"
      >
        {{ style.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
