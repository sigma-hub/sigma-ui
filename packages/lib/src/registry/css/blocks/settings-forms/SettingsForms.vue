<script setup lang="ts">
import type { Component } from 'vue';
import { ref } from 'vue';
import { Card } from '@ui/registry/css/ui/card';
import { Separator } from '@ui/registry/css/ui/separator';
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
  <Card class="settings-forms">
    <div class="settings-forms__body">
      <div class="settings-forms__intro">
        <h2 class="settings-forms__title">
          Settings
        </h2>
        <p class="settings-forms__description">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator class="settings-forms__separator" />
      <div class="settings-forms__layout">
        <aside class="settings-forms__nav">
          <SettingsNav v-model="selectedForm" />
        </aside>
        <div class="settings-forms__content">
          <div class="settings-forms__panel">
            <component :is="formComponents[selectedForm]" />
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style>
.settings-forms__body {
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2.5rem 4rem;
  gap: 1.5rem;
}

.settings-forms__intro {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.settings-forms__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 2rem;
}

.settings-forms__description,
.settings-forms__section-description {
  margin: 0;
  color: var(--muted-foreground);
}

.settings-forms__separator {
  margin: 1.5rem 0;
}

.settings-forms__layout,
.settings-forms__panel,
.settings-forms__section {
  display: flex;
  flex-direction: column;
}

.settings-forms__layout {
  gap: 2rem;
}

.settings-forms__content {
  flex: 1;
}

.settings-forms__panel,
.settings-forms__section {
  gap: 1.5rem;
}

.settings-forms__section-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
}

.settings-forms__section-description {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.settings-forms__form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-forms__actions {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
}

.settings-forms__sr-only {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  border-width: 0;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.settings-forms__toast {
  padding: 1rem;
  border-radius: var(--radius);
  margin-top: 0.5rem;
  background: color-mix(in oklch, var(--muted) 50%, transparent);
}

@media (width >= 64rem) {
  .settings-forms__layout {
    flex-direction: row;
    gap: 3rem;
  }

  .settings-forms__nav {
    width: 20%;
  }

  .settings-forms__content {
    max-width: 42rem;
  }
}
</style>
