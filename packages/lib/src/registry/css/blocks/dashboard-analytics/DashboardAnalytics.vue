<script setup lang="ts">
import AnalyticsHeader from './components/AnalyticsHeader.vue';
import MetricCards from './components/MetricCards.vue';
import RecentSales from './components/RecentSales.vue';
import TransactionsTable from './components/TransactionsTable.vue';
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
    <AnalyticsHeader
      :brand-name="brandName"
      :brand-href="brandHref"
      :links="headerLinks"
      :search-placeholder="searchPlaceholder"
      :navigation-label="navigationLabel"
      :user-menu-label="userMenuLabel"
      :account-menu="accountMenu"
    />
    <main class="dashboard-analytics__main">
      <MetricCards :cards="statCards" />
      <div class="dashboard-analytics__panels">
        <TransactionsTable
          :title="transactionsTitle"
          :description="transactionsDescription"
          :action-label="transactionsActionLabel"
          :action-href="transactionsActionHref"
          :columns="transactionColumnLabels"
          :rows="transactions"
        />
        <RecentSales
          :title="recentSalesTitle"
          :sales="recentSales"
        />
      </div>
    </main>
  </div>
</template>

<style>
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
  gap: 1rem;
  padding: 1rem;
}

@media (width >= 768px) {
  .dashboard-analytics__main {
    gap: 2rem;
    padding: 2rem;
  }
}

.dashboard-analytics__panels {
  display: grid;
  gap: 1rem;
}

@media (width >= 768px) {
  .dashboard-analytics__panels {
    gap: 2rem;
  }
}

@media (width >= 1024px) {
  .dashboard-analytics__panels {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width >= 1280px) {
  .dashboard-analytics__panels {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .dashboard-analytics__panels .dashboard-analytics__transactions {
    grid-column: span 2 / span 2;
  }
}
</style>
