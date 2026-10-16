<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Checkbox } from '@ui/registry/css/ui/checkbox';
import { Input } from '@ui/registry/css/ui/input';
import type { NavLink, SettingsField } from '../data';

defineProps<{
  pageTitle: string;
  links: NavLink[];
  fields: SettingsField[];
}>();

function sectionClass(isActive: boolean) {
  return isActive ? 'dashboard-settings__section--active' : undefined;
}

function formClass(field: SettingsField) {
  return field.checkbox ? 'dashboard-settings__form' : undefined;
}
</script>

<template>
  <main class="dashboard-settings__main">
    <div class="dashboard-settings__title-wrap">
      <h1 class="dashboard-settings__title">
        {{ pageTitle }}
      </h1>
    </div>
    <div class="dashboard-settings__layout">
      <nav class="dashboard-settings__sections">
        <a
          v-for="link in links"
          :key="link.label"
          href="#"
          class="dashboard-settings__section"
          :class="sectionClass(link.isActive)"
        >
          {{ link.label }}
        </a>
      </nav>
      <div class="dashboard-settings__cards">
        <Card
          v-for="field in fields"
          :key="field.title"
        >
          <CardHeader>
            <CardTitle>{{ field.title }}</CardTitle>
            <CardDescription>
              {{ field.description }}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form :class="formClass(field)">
              <Input
                :placeholder="field.placeholder"
                :model-value="field.modelValue"
              />
              <div
                v-if="field.checkbox"
                class="dashboard-settings__checkbox"
              >
                <Checkbox
                  :id="field.checkbox.id"
                  :model-value="true"
                />
                <label
                  :for="field.checkbox.id"
                  class="dashboard-settings__checkbox-label"
                >
                  {{ field.checkbox.label }}
                </label>
              </div>
            </form>
          </CardContent>
          <CardFooter class="dashboard-settings__card-footer">
            <Button>{{ field.saveLabel }}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </main>
</template>

<style>
.dashboard-settings__main {
  display: flex;
  min-height: calc(100vh - 4rem);
  flex: 1 1 0%;
  flex-direction: column;
  gap: 1rem;
  background-color: hsl(var(--muted) / 40%);
  padding: 1rem;
}

@media (width >= 768px) {
  .dashboard-settings__main {
    gap: 2rem;
    padding: 2.5rem;
  }
}

.dashboard-settings__title-wrap,
.dashboard-settings__layout {
  display: grid;
  width: 100%;
  max-width: 72rem;
  margin-right: auto;
  margin-left: auto;
}

.dashboard-settings__title-wrap {
  gap: 0.5rem;
}

.dashboard-settings__title {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 2.25rem;
}

.dashboard-settings__layout {
  align-items: start;
  gap: 1.5rem;
}

@media (width >= 768px) {
  .dashboard-settings__layout {
    grid-template-columns: 180px 1fr;
  }
}

@media (width >= 1024px) {
  .dashboard-settings__layout {
    grid-template-columns: 250px 1fr;
  }
}

.dashboard-settings__sections {
  display: grid;
  gap: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(var(--muted-foreground));
}

.dashboard-settings__section--active {
  font-weight: 600;
  color: hsl(var(--primary));
}

.dashboard-settings__cards {
  display: grid;
  gap: 1.5rem;
}

.dashboard-settings__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard-settings__checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dashboard-settings__checkbox-label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.dashboard-settings__card-footer {
  border-top: 1px solid hsl(var(--border));
  padding: 1rem 1.5rem;
}
</style>
