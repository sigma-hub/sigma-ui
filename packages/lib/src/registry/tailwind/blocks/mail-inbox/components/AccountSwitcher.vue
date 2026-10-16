<script setup lang="ts">
import { computed, ref } from 'vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/tailwind/ui/select';
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
      class="w-full"
      :class="{ 'size-9 shrink-0 justify-center p-0': collapsed }"
    >
      <SelectValue placeholder="Select an account">
        <span class="flex items-center gap-2">
          <span class="flex size-4 items-center justify-center text-xs font-medium">{{ selectedAccount?.mark }}</span>
          <span
            v-if="!collapsed"
            class="truncate"
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
        <span class="flex items-center gap-2">
          <span class="flex size-4 items-center justify-center text-xs font-medium">{{ account.mark }}</span>
          {{ account.email }}
        </span>
      </SelectItem>
    </SelectContent>
  </Select>
</template>
