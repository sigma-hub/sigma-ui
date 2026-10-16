<script setup lang="ts">
import type { DateRange } from 'reka-ui';
import { ref } from 'vue';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Card } from '@ui/registry/tailwind/ui/card';
import { RangeCalendar } from '@ui/registry/tailwind/ui/range-calendar';
import ActivityGoal from './components/ActivityGoal.vue';
import CardChat from './components/CardChat.vue';
import CardStats from './components/CardStats.vue';
import CookieSettings from './components/CookieSettings.vue';
import CreateAccount from './components/CreateAccount.vue';
import DataTable from './components/DataTable.vue';
import DatePicker from './components/DatePicker.vue';
import GitHubCard from './components/GitHubCard.vue';
import Metric from './components/Metric.vue';
import Notifications from './components/Notifications.vue';
import PaymentMethod from './components/PaymentMethod.vue';
import ReportAnIssue from './components/ReportAnIssue.vue';
import ShareDocument from './components/ShareDocument.vue';
import TeamMembers from './components/TeamMembers.vue';

const now = today(getLocalTimeZone());

const range = ref<DateRange>({
  start: now,
  end: now.add({ days: 8 }),
});
</script>

<template>
  <div class="grid items-start justify-center gap-6 rounded-lg md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
    <div class="space-y-4 lg:col-span-4 xl:col-span-6">
      <CardStats />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div class="space-y-4">
          <TeamMembers />
          <CookieSettings />
          <PaymentMethod />
          <DatePicker />
          <Notifications />
        </div>
        <div class="space-y-4">
          <CardChat />
          <CreateAccount />
          <ReportAnIssue />
          <GitHubCard />
        </div>
      </div>
    </div>
    <div class="space-y-4 lg:col-span-6 xl:col-span-5">
      <div class="hidden gap-1 sm:grid-cols-[280px_1fr] md:grid">
        <Card class="max-w-[280px]">
          <RangeCalendar v-model="range" />
        </Card>
        <div class="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
          <ActivityGoal />
        </div>
        <div class="pt-3 sm:col-span-2 xl:pt-3">
          <Metric />
        </div>
        <div class="pt-3 sm:col-span-2 xl:pt-3">
          <DataTable />
        </div>
        <div class="pt-3 sm:col-span-2 xl:pt-3">
          <ShareDocument />
        </div>
      </div>
    </div>
  </div>
</template>
