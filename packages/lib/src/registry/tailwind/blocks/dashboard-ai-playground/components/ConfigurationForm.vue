<script setup lang="ts">
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { samplingFields, temperatureField } from '../data';
import ModelSelect from './ModelSelect.vue';
import RoleSelect from './RoleSelect.vue';
</script>

<template>
  <div class="relative hidden flex-col items-start gap-8 md:flex">
    <form class="grid w-full items-start gap-6">
      <fieldset class="grid gap-6 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium">
          Settings
        </legend>
        <div class="grid gap-3">
          <Label for="model">Model</Label>
          <ModelSelect />
        </div>
        <div class="grid gap-3">
          <Label :for="temperatureField.id">{{ temperatureField.label }}</Label>
          <Input
            :id="temperatureField.id"
            type="number"
            :placeholder="temperatureField.placeholder"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="field in samplingFields"
            :key="field.id"
            class="grid gap-3"
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
      <fieldset class="grid gap-6 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium">
          Messages
        </legend>
        <div class="grid gap-3">
          <Label for="role">Role</Label>
          <RoleSelect />
        </div>
        <div class="grid gap-3">
          <Label for="content">Content</Label>
          <Textarea
            id="content"
            placeholder="You are a..."
            class="min-h-[9.5rem]"
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>
