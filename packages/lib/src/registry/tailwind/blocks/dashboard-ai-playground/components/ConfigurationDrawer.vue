<script setup lang="ts">
import { Settings2Icon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@ui/registry/tailwind/ui/drawer';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
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
        class="md:hidden"
      >
        <Settings2Icon class="size-4" />
        <span class="sr-only">Settings</span>
      </Button>
    </DrawerTrigger>
    <DrawerContent class="max-h-[80vh]">
      <DrawerHeader>
        <DrawerTitle>Configuration</DrawerTitle>
        <DrawerDescription>
          Configure the settings for the model and messages.
        </DrawerDescription>
      </DrawerHeader>
      <form class="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
        <fieldset class="grid gap-6 rounded-lg border p-4">
          <legend class="-ml-1 px-1 text-sm font-medium">
            Settings
          </legend>
          <div class="grid gap-3">
            <Label for="model">Model</Label>
            <ModelSelect />
          </div>
          <div
            v-for="field in parameterFields"
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
            />
          </div>
        </fieldset>
      </form>
    </DrawerContent>
  </Drawer>
</template>
