<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import RecentSalesCard from './components/RecentSalesCard.vue';
import StatCard from './components/StatCard.vue';
import TransactionsCard from './components/TransactionsCard.vue';
import {
  accountMenu,
  brandHref,
  brandName,
  headerLinks,
  navigationLabel,
  recentSales,
  recentSalesTitle,
  searchPlaceholder,
  statCards,
  transactionColumnLabels,
  transactions,
  transactionsActionHref,
  transactionsActionLabel,
  transactionsDescription,
  transactionsTitle,
  userMenuLabel,
} from './data';
</script>

<template>
  <div class="dashboard-analytics">
    <AppHeader
      :brand-name="brandName"
      :brand-href="brandHref"
      :links="headerLinks"
      :search-placeholder="searchPlaceholder"
      :menu-entries="accountMenu"
      :user-menu-label="userMenuLabel"
      :navigation-label="navigationLabel"
    />
    <main class="dashboard-analytics__main">
      <div class="dashboard-analytics__stats">
        <StatCard
          v-for="stat in statCards"
          :key="stat.title"
          :title="stat.title"
          :value="stat.value"
          :change="stat.change"
          :icon="stat.icon"
        />
      </div>
      <div class="dashboard-analytics__panels">
        <TransactionsCard
          class="dashboard-analytics__transactions"
          :title="transactionsTitle"
          :description="transactionsDescription"
          :action-label="transactionsActionLabel"
          :action-href="transactionsActionHref"
          :column-labels="transactionColumnLabels"
          :rows="transactions"
        />
        <RecentSalesCard
          :title="recentSalesTitle"
          :sales="recentSales"
        />
      </div>
    </main>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-analytics {
    display: flex;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
  }

  .dashboard-analytics__main {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-analytics__stats,
  .dashboard-analytics__panels {
    display: grid;
    gap: calc(var(--spacing) * 4);
  }

  @media (width >= 48rem) {
    .dashboard-analytics__main {
      padding: calc(var(--spacing) * 8);
      gap: calc(var(--spacing) * 8);
    }

    .dashboard-analytics__stats {
      gap: calc(var(--spacing) * 8);
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .dashboard-analytics__panels {
      gap: calc(var(--spacing) * 8);
    }
  }

  @media (width >= 64rem) {
    .dashboard-analytics__stats {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .dashboard-analytics__panels {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (width >= 80rem) {
    .dashboard-analytics__panels {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .dashboard-analytics__transactions {
      grid-column: span 2 / span 2;
    }
  }
}
</style>
