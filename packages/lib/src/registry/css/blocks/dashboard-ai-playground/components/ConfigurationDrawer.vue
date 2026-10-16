<script setup lang="ts">
import { Settings2Icon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@ui/registry/css/ui/drawer';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
import { Textarea } from '@ui/registry/css/ui/textarea';
import { samplingFields, temperatureField } from '../data';
import ModelSelect from './ModelSelect.vue';
import RoleSelect from './RoleSelect.vue';

const parameterFields = [temperatureField, ...samplingFields];
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        class="dashboard-ai-playground__settings-button"
      >
        <Settings2Icon />
        <span class="dashboard-ai-playground__visually-hidden">Settings</span>
      </Button>
    </DrawerTrigger>
    <DrawerContent class="dashboard-ai-playground__drawer">
      <DrawerHeader>
        <DrawerTitle>Configuration</DrawerTitle>
        <DrawerDescription>
          Configure the settings for the model and messages.
        </DrawerDescription>
      </DrawerHeader>
      <form class="dashboard-ai-playground__drawer-form">
        <fieldset class="dashboard-ai-playground__fieldset">
          <legend class="dashboard-ai-playground__legend">
            Settings
          </legend>
          <div class="dashboard-ai-playground__field">
            <Label for="model">Model</Label>
            <ModelSelect />
          </div>
          <div
            v-for="field in parameterFields"
            :key="field.id"
            class="dashboard-ai-playground__field"
          >
            <Label :for="field.id">{{ field.label }}</Label>
            <Input
              :id="field.id"
              type="number"
              :placeholder="field.placeholder"
            />
          </div>
        </fieldset>
        <fieldset class="dashboard-ai-playground__fieldset">
          <legend class="dashboard-ai-playground__legend">
            Messages
          </legend>
          <div class="dashboard-ai-playground__field">
            <Label for="role">Role</Label>
            <RoleSelect />
          </div>
          <div class="dashboard-ai-playground__field">
            <Label for="content">Content</Label>
            <Textarea
              id="content"
              placeholder="You are a..."
            />
          </div>
        </fieldset>
      </form>
    </DrawerContent>
  </Drawer>
</template>

<style>
@media (width >= 768px) {
  button.dashboard-ai-playground__settings-button {
    display: none;
  }
}

button.dashboard-ai-playground__settings-button svg {
  width: 1rem;
  height: 1rem;
}

.dashboard-ai-playground__drawer {
  max-height: 80vh;
}

.dashboard-ai-playground__drawer-form {
  display: grid;
  width: 100%;
  align-items: start;
  gap: 1.5rem;
  overflow: auto;
  padding: 0 1rem 1rem;
}

.dashboard-ai-playground__fieldset {
  display: grid;
  min-width: 0;
  gap: 1.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  padding: 1rem;
}

.dashboard-ai-playground__legend {
  margin-left: -0.25rem;
  padding-right: 0.25rem;
  padding-left: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.dashboard-ai-playground__field {
  display: grid;
  gap: 0.75rem;
}

.dashboard-ai-playground__visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
