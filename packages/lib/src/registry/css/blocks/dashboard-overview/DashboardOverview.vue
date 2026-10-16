<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/css/ui/tabs';
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
  <div class="dashboard-overview">
    <div class="dashboard-overview__header">
      <div class="dashboard-overview__header-bar">
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
        <nav class="dashboard-overview__nav">
          <button
            v-for="link in navigation"
            :key="link.label"
            type="button"
            class="dashboard-overview__nav-link"
            :class="{ 'dashboard-overview__nav-link--active': link.isActive }"
          >
            {{ link.label }}
          </button>
        </nav>
        <div class="dashboard-overview__header-actions">
          <Input
            type="search"
            :placeholder="searchPlaceholder"
            class="dashboard-overview__search"
          />
          <UserMenu
            :entries="accountMenu"
            :trigger-label="userMenuLabel"
          />
        </div>
      </div>
    </div>
    <div class="dashboard-overview__main">
      <div class="dashboard-overview__title-row">
        <h2 class="dashboard-overview__title">
          {{ pageTitle }}
        </h2>
        <div class="dashboard-overview__title-actions">
          <DateRangeField :placeholder="datePlaceholder" />
          <Button>{{ downloadLabel }}</Button>
        </div>
      </div>
      <Tabs
        default-value="overview"
        class="dashboard-overview__tabs"
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
          class="dashboard-overview__panel"
        >
          <div class="dashboard-overview__stats">
            <StatCard
              v-for="stat in statCards"
              :key="stat.title"
              :title="stat.title"
              :value="stat.value"
              :change="stat.change"
              :icon="stat.icon"
            />
          </div>
          <div class="dashboard-overview__lower">
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

<style>
.dashboard-overview {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.dashboard-overview__header {
  border-bottom: 1px solid var(--border);
}

.dashboard-overview__header-bar,
.dashboard-overview__nav,
.dashboard-overview__header-actions,
.dashboard-overview__title-row,
.dashboard-overview__title-actions {
  display: flex;
  align-items: center;
}

.dashboard-overview__header-bar {
  height: 4rem;
  padding: 0 1rem;
  gap: 1rem;
}

.dashboard-overview__nav {
  gap: 1rem;
}

.dashboard-overview__nav-link {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted-foreground);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.dashboard-overview__nav-link:hover,
.dashboard-overview__nav-link--active {
  color: var(--primary);
}

.dashboard-overview__header-actions {
  margin-left: auto;
  gap: 1rem;
}

.dashboard-overview__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem 2rem 2rem;
  gap: 1rem;
}

.dashboard-overview__title-row {
  justify-content: space-between;
  gap: 0.5rem;
}

.dashboard-overview__title {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 2.25rem;
}

.dashboard-overview__title-actions {
  gap: 0.5rem;
}

.dashboard-overview__tabs,
.dashboard-overview__panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard-overview__stats,
.dashboard-overview__lower {
  display: grid;
  gap: 1rem;
}

@media (width >= 768px) {
  .dashboard-overview__search {
    width: 100px;
  }

  .dashboard-overview__stats,
  .dashboard-overview__lower {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width >= 1024px) {
  .dashboard-overview__nav {
    gap: 1.5rem;
  }

  .dashboard-overview__search {
    width: 300px;
  }

  .dashboard-overview__stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .dashboard-overview__lower {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}
</style>
