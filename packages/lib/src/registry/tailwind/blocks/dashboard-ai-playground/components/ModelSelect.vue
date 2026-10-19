<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/tailwind/ui/select';
import { modelOptions } from '../data';
</script>

<template>
  <Select>
    <SelectTrigger
      id="model"
      class="items-start [&_[data-description]]:hidden"
    >
      <SelectValue placeholder="Select a model" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="option in modelOptions"
        :key="option.value"
        :value="option.value"
      >
        <div class="flex items-start gap-3 text-muted-foreground">
          <component
            :is="option.icon"
            class="size-5"
          />
          <div class="grid gap-0.5">
            <p>
              Neural
              <span class="font-medium text-foreground">
                {{ option.name }}
              </span>
            </p>
            <p
              class="text-xs"
              data-description
            >
              {{ option.description }}
            </p>
          </div>
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
</template>
