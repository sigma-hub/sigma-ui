<script setup lang="ts">
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
import { Textarea } from '@ui/registry/css/ui/textarea';
import { samplingFields, temperatureField } from '../data';
import ModelSelect from './ModelSelect.vue';
import RoleSelect from './RoleSelect.vue';
</script>

<template>
  <div class="dashboard-ai-playground__configuration">
    <form class="dashboard-ai-playground__form">
      <fieldset class="dashboard-ai-playground__fieldset">
        <legend class="dashboard-ai-playground__legend">
          Settings
        </legend>
        <div class="dashboard-ai-playground__field">
          <Label for="model">Model</Label>
          <ModelSelect />
        </div>
        <div class="dashboard-ai-playground__field">
          <Label :for="temperatureField.id">{{ temperatureField.label }}</Label>
          <Input
            :id="temperatureField.id"
            type="number"
            :placeholder="temperatureField.placeholder"
          />
        </div>
        <div class="dashboard-ai-playground__sampling">
          <div
            v-for="field in samplingFields"
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
            class="dashboard-ai-playground__content-input"
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style>
.dashboard-ai-playground__configuration {
  position: relative;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--spacing) * 8);
}

@media (width >= 48rem) {
  .dashboard-ai-playground__configuration {
    display: flex;
  }
}

.dashboard-ai-playground__form {
  display: grid;
  width: 100%;
  align-items: start;
  gap: calc(var(--spacing) * 6);
}

.dashboard-ai-playground__fieldset {
  display: grid;
  min-width: 0;
  padding: calc(var(--spacing) * 4);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  gap: calc(var(--spacing) * 6);
}

.dashboard-ai-playground__legend {
  padding-right: calc(var(--spacing) * 1);
  padding-left: calc(var(--spacing) * 1);
  margin-left: calc(var(--spacing) * -1);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.dashboard-ai-playground__field {
  display: grid;
  gap: calc(var(--spacing) * 3);
}

.dashboard-ai-playground__sampling {
  display: grid;
  gap: calc(var(--spacing) * 4);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

textarea.dashboard-ai-playground__content-input {
  min-height: calc(var(--spacing) * 38);
}
</style>
