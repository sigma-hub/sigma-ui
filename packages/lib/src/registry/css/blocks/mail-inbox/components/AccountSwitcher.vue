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
      class="mail-inbox__account"
      :class="{ 'mail-inbox__account--collapsed': collapsed }"
    >
      <SelectValue placeholder="Select an account">
        <span class="mail-inbox__account-value">
          <span class="mail-inbox__mark">{{ selectedAccount?.mark }}</span>
          <span
            v-if="!collapsed"
            class="mail-inbox__account-label"
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
        <span class="mail-inbox__account-value">
          <span class="mail-inbox__mark">{{ account.mark }}</span>
          {{ account.email }}
        </span>
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<style>
.mail-inbox__account {
  width: 100%;
}

.mail-inbox__account--collapsed.mail-inbox__account--collapsed {
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  justify-content: center;
  padding: 0;
}

.mail-inbox__account-value {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;
}

.mail-inbox__mark {
  display: flex;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 500;
}

.mail-inbox__account-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
