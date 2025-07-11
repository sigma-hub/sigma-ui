<script setup lang="ts">
import { type Ref, ref } from 'vue';
import type { DateRange } from 'reka-ui';
import { getLocalTimeZone, today } from '@internationalized/date';
import CardChat from '@ui/registry/tailwind/example/CardChat.vue';
import ActivityGoal from '@ui/registry/tailwind/example/Cards/ActivityGoal.vue';
import Metric from '@ui/registry/tailwind/example/Cards/Metric.vue';
import DataTable from '@ui/registry/tailwind/example/Cards/DataTable.vue';
import CardStats from '@ui/registry/tailwind/example/CardStats.vue';
import { Card } from '@ui/registry/tailwind/ui/card';
import { RangeCalendar } from '@ui/registry/tailwind/ui/range-calendar';
import TeamMembers from './components/TeamMembers.vue';
import ShareDocument from './components/ShareDocument.vue';
import ReportAnIssue from './components/ReportAnIssue.vue';
import CookieSettings from './components/CookieSettings.vue';
import CreateAccount from './components/CreateAccount.vue';
import PaymentMethod from './components/PaymentMethod.vue';
import DatePicker from './components/DatePicker.vue';
import GitHubCard from './components/GitHubCard.vue';
import Notifications from './components/Notifications.vue';

const now = today(getLocalTimeZone());

const range = ref({
  start: now,
  end: now.add({ days: 8 }),
}) as Ref<DateRange>;
</script>

<template>
  <div class="items-start justify-center gap-6 rounded-lg md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
    <div class="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
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
    <div class="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
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
