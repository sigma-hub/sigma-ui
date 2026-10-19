<script setup lang="ts">
import { computed, ref } from 'vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/css/ui/select';
import type { Account } from '../data';

const props = defineProps<{
  collapsed: boolean;
  accounts: Account[];
}>();

const selectedEmail = ref(props.accounts[0]?.email ?? '');
const selectedAccount = computed(() => props.accounts.find(account => account.email === selectedEmail.value));
</script>

<template>
  <Select v-model="selectedEmail">
    <SelectTrigger
      aria-label="Select account"
      class="dashboard-mail__account"
      :class="{ 'dashboard-mail__account--collapsed': collapsed }"
    >
      <SelectValue placeholder="Select an account">
        <span class="dashboard-mail__account-value">
          <span class="dashboard-mail__mark">{{ selectedAccount?.mark }}</span>
          <span
            v-if="!collapsed"
            class="dashboard-mail__account-label"
          >
            {{ selectedAccount?.label }}
          </span>
        </span>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="account in accounts"
        :key="account.email"
        :value="account.email"
      >
        <span class="dashboard-mail__account-value">
          <span class="dashboard-mail__mark">{{ account.mark }}</span>
          {{ account.email }}
        </span>
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-mail__account {
    width: 100%;
  }

  .dashboard-mail__account--collapsed.dashboard-mail__account--collapsed {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
    flex-shrink: 0;
    justify-content: center;
    padding: 0;
  }

  .dashboard-mail__account-value {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-mail__mark {
    display: flex;
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .dashboard-mail__account-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
