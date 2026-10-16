<script setup lang="ts">
import type { Component } from 'vue';
import { ref } from 'vue';
import { Card } from '@ui/registry/tailwind/ui/card';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import AccountForm from './components/AccountForm.vue';
import AppearanceForm from './components/AppearanceForm.vue';
import DisplayForm from './components/DisplayForm.vue';
import NotificationsForm from './components/NotificationsForm.vue';
import ProfileForm from './components/ProfileForm.vue';
import SettingsNav from './components/SettingsNav.vue';

type FormType = 'profile' | 'account' | 'appearance' | 'notifications' | 'display';

const selectedForm = ref<FormType>('profile');

const formComponents: Record<FormType, Component> = {
  profile: ProfileForm,
  account: AccountForm,
  appearance: AppearanceForm,
  notifications: NotificationsForm,
  display: DisplayForm,
};
</script>

<template>
  <Card>
    <div class="space-y-6 p-10 pb-16">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">
          Settings
        </h2>
        <p class="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator class="my-6" />
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside class="lg:w-1/5">
          <SettingsNav v-model="selectedForm" />
        </aside>
        <div class="flex-1 lg:max-w-2xl">
          <div class="space-y-6">
            <component :is="formComponents[selectedForm]" />
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style>
.settings-forms__toast {
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: var(--radius);
  background: color-mix(in oklch, var(--muted) 50%, transparent);
}
</style>
