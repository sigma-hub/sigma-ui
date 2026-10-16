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
  <div class="flex min-h-screen w-full flex-col">
    <AnalyticsHeader
      :brand-name="brandName"
      :brand-href="brandHref"
      :links="headerLinks"
      :search-placeholder="searchPlaceholder"
      :navigation-label="navigationLabel"
      :user-menu-label="userMenuLabel"
      :account-menu="accountMenu"
    />
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <MetricCards :cards="statCards" />
      <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
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
