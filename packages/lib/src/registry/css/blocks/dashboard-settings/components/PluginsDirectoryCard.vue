<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Checkbox } from '@ui/registry/css/ui/checkbox';
import { Input } from '@ui/registry/css/ui/input';
import type { PluginsDirectoryCardData } from '../data';

defineProps<PluginsDirectoryCardData>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="dashboard-settings__plugin-form">
        <Input
          :placeholder="placeholder"
          :model-value="directory"
        />
        <div class="dashboard-settings__checkbox-row">
          <Checkbox
            :id="checkboxId"
            :model-value="includeChecked"
          />
          <label
            :for="checkboxId"
            class="dashboard-settings__checkbox-label"
          >
            {{ checkboxLabel }}
          </label>
        </div>
      </form>
    </CardContent>
    <CardFooter class="dashboard-settings__card-footer">
      <Button>{{ saveLabel }}</Button>
    </CardFooter>
  </Card>
</template>

<style>
.dashboard-settings__plugin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard-settings__checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dashboard-settings__checkbox-label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.dashboard-settings__card-footer.dashboard-settings__card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
}
</style>
