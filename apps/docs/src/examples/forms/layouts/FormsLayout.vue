<script setup lang="ts">
import { ref } from 'vue';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import SidebarNav from '../components/SidebarNav.vue';
import Example from '../Example.vue';
import Account from '../Account.vue';
import Appearance from '../Appearance.vue';
import Notifications from '../Notifications.vue';
import Display from '../Display.vue';

type FormType = 'profile' | 'account' | 'appearance' | 'notifications' | 'display';

const selectedForm = ref<FormType>('profile');

const formComponents: Record<FormType, typeof Example> = {
  profile: Example,
  account: Account,
  appearance: Appearance,
  notifications: Notifications,
  display: Display,
};
</script>

<template>
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
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="lg:w-1/5">
        <SidebarNav v-model="selectedForm" />
      </aside>
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <component :is="formComponents[selectedForm]" />
        </div>
      </div>
    </div>
  </div>
</template>
