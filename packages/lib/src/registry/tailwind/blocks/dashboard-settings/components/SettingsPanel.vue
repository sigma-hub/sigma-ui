<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';
import { Input } from '@ui/registry/tailwind/ui/input';
import type { NavLink, SettingsField } from '../data';

defineProps<{
  pageTitle: string;
  links: NavLink[];
  fields: SettingsField[];
}>();
</script>

<template>
  <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
    <div class="mx-auto grid w-full max-w-6xl gap-2">
      <h1 class="text-3xl font-semibold">
        {{ pageTitle }}
      </h1>
    </div>
    <div class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <nav class="grid gap-4 text-sm text-muted-foreground">
        <a
          v-for="link in links"
          :key="link.label"
          href="#"
          :class="link.isActive ? 'font-semibold text-primary' : undefined"
        >
          {{ link.label }}
        </a>
      </nav>
      <div class="grid gap-6">
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
            <form :class="field.checkbox ? 'flex flex-col gap-4' : undefined">
              <Input
                :placeholder="field.placeholder"
                :model-value="field.modelValue"
              />
              <div
                v-if="field.checkbox"
                class="flex items-center space-x-2"
              >
                <Checkbox
                  :id="field.checkbox.id"
                  :model-value="true"
                />
                <label
                  :for="field.checkbox.id"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {{ field.checkbox.label }}
                </label>
              </div>
            </form>
          </CardContent>
          <CardFooter class="border-t px-6 py-4">
            <Button>{{ field.saveLabel }}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </main>
</template>
