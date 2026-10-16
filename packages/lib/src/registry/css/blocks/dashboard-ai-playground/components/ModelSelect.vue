<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/css/ui/select';
import { modelOptions } from '../data';
</script>

<template>
  <Select>
    <SelectTrigger
      id="model"
      class="dashboard-ai-playground__model-trigger"
    >
      <SelectValue placeholder="Select a model" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="option in modelOptions"
        :key="option.value"
        :value="option.value"
      >
        <div class="dashboard-ai-playground__model-option">
          <component :is="option.icon" />
          <div class="dashboard-ai-playground__model-copy">
            <p class="dashboard-ai-playground__model-line">
              Neural
              <span class="dashboard-ai-playground__model-name">
                {{ option.name }}
              </span>
            </p>
            <p
              class="dashboard-ai-playground__model-description"
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

<style>
.sigma-ui-select-trigger.dashboard-ai-playground__model-trigger {
  align-items: flex-start;
}

.dashboard-ai-playground__model-trigger [data-description] {
  display: none;
}

.dashboard-ai-playground__model-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: hsl(var(--muted-foreground));
}

.dashboard-ai-playground__model-option svg {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.dashboard-ai-playground__model-copy {
  display: grid;
  gap: 0.125rem;
}

.dashboard-ai-playground__model-line {
  margin: 0;
}

.dashboard-ai-playground__model-name {
  font-weight: 500;
  color: hsl(var(--foreground));
}

.dashboard-ai-playground__model-description {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>
