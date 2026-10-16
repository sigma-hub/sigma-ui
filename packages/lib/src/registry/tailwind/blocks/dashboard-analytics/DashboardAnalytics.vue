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
  <div class="flex min-h-screen w-full flex-col">
    <AppHeader
      :brand-name="brandName"
      :brand-href="brandHref"
      :links="headerLinks"
      :search-placeholder="searchPlaceholder"
      :menu-entries="accountMenu"
      :user-menu-label="userMenuLabel"
      :navigation-label="navigationLabel"
    />
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard
          v-for="stat in statCards"
          :key="stat.title"
          :title="stat.title"
          :value="stat.value"
          :change="stat.change"
          :icon="stat.icon"
        />
      </div>
      <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <TransactionsCard
          class="xl:col-span-2"
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
