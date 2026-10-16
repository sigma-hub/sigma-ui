<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
import DateRangeField from './components/DateRangeField.vue';
import OverviewChart from './components/OverviewChart.vue';
import RecentSalesCard from './components/RecentSalesCard.vue';
import StatCard from './components/StatCard.vue';
import TeamSwitcher from './components/TeamSwitcher.vue';
import UserMenu from './components/UserMenu.vue';
import {
  accountMenu,
  analyticsTabLabel,
  cancelLabel,
  continueLabel,
  createTeamDescription,
  createTeamLabel,
  createTeamTitle,
  datePlaceholder,
  downloadLabel,
  emptyTeamLabel,
  navigation,
  notificationsTabLabel,
  overview,
  overviewCardTitle,
  overviewTabLabel,
  pageTitle,
  planLabel,
  planPlaceholder,
  plans,
  recentSales,
  recentSalesDescription,
  recentSalesTitle,
  reportsTabLabel,
  searchPlaceholder,
  statCards,
  teamGroups,
  teamNameLabel,
  teamNamePlaceholder,
  teamPlaceholder,
  userMenuLabel,
} from './data';
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="border-b">
      <div class="flex h-16 items-center gap-4 px-4">
        <TeamSwitcher
          :groups="teamGroups"
          :plans="plans"
          :search-placeholder="teamPlaceholder"
          :empty-label="emptyTeamLabel"
          :create-label="createTeamLabel"
          :dialog-title="createTeamTitle"
          :dialog-description="createTeamDescription"
          :name-label="teamNameLabel"
          :name-placeholder="teamNamePlaceholder"
          :plan-label="planLabel"
          :plan-placeholder="planPlaceholder"
          :cancel-label="cancelLabel"
          :continue-label="continueLabel"
        />
        <nav class="flex items-center gap-4 lg:gap-6">
          <button
            v-for="link in navigation"
            :key="link.label"
            type="button"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="link.isActive ? 'text-primary' : 'text-muted-foreground'"
          >
            {{ link.label }}
          </button>
        </nav>
        <div class="ml-auto flex items-center gap-4">
          <Input
            type="search"
            :placeholder="searchPlaceholder"
            class="md:w-[100px] lg:w-[300px]"
          />
          <UserMenu
            :entries="accountMenu"
            :trigger-label="userMenuLabel"
          />
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-3xl font-bold tracking-tight">
          {{ pageTitle }}
        </h2>
        <div class="flex items-center gap-2">
          <DateRangeField :placeholder="datePlaceholder" />
          <Button>{{ downloadLabel }}</Button>
        </div>
      </div>
      <Tabs
        default-value="overview"
        class="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">
            {{ overviewTabLabel }}
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            disabled
          >
            {{ analyticsTabLabel }}
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            disabled
          >
            {{ reportsTabLabel }}
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            disabled
          >
            {{ notificationsTabLabel }}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          class="space-y-4"
        >
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              v-for="stat in statCards"
              :key="stat.title"
              :title="stat.title"
              :value="stat.value"
              :change="stat.change"
              :icon="stat.icon"
            />
          </div>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <OverviewChart
              :title="overviewCardTitle"
              :data="overview"
            />
            <RecentSalesCard
              :title="recentSalesTitle"
              :description="recentSalesDescription"
              :sales="recentSales"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
