<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import ProductsPanel from './components/ProductsPanel.vue';
import {
  accountMenuGroups,
  brandName,
  breadcrumbLinks,
  currentBreadcrumb,
  defaultProductTab,
  filterOptions,
  headerCopy,
  mobileNavLinks,
  productActions,
  productDetailColumns,
  productTabs,
  products,
  productsCopy,
  productsSummary,
  sidebarFooterLinks,
  sidebarLinks,
} from './data';
</script>

<template>
  <div class="dashboard-products">
    <AppSidebar
      :nav-items="sidebarLinks"
      :footer-items="sidebarFooterLinks"
      :brand-name="brandName"
    />
    <div class="dashboard-products__shell">
      <AppHeader
        :mobile-nav-items="mobileNavLinks"
        :breadcrumb-links="breadcrumbLinks"
        :breadcrumb-page="currentBreadcrumb"
        :account-menu-groups="accountMenuGroups"
        :brand-name="brandName"
        :header="headerCopy"
      />
      <main class="dashboard-products__main">
        <ProductsPanel
          :tabs="productTabs"
          :active-tab="defaultProductTab"
          :filter-options="filterOptions"
          :products="products"
          :detail-columns="productDetailColumns"
          :actions="productActions"
          :summary="productsSummary"
          :copy="productsCopy"
        />
      </main>
    </div>
  </div>
</template>

<style>
.dashboard-products {
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: color-mix(in oklch, var(--muted) 40%, transparent);
}

.dashboard-products__shell {
  display: flex;
  flex-direction: column;
}

@media (width >= 40rem) {
  .dashboard-products__shell {
    padding-top: calc(var(--spacing) * 4);
    padding-bottom: calc(var(--spacing) * 4);
    padding-left: calc(var(--spacing) * 14);
    gap: calc(var(--spacing) * 4);
  }
}

.dashboard-products__main {
  display: grid;
  flex: 1 1 0%;
  align-items: flex-start;
  padding: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 4);
}

@media (width >= 40rem) {
  .dashboard-products__main {
    padding: 0 calc(var(--spacing) * 6);
  }
}

@media (width >= 48rem) {
  .dashboard-products__main {
    gap: calc(var(--spacing) * 8);
  }
}
</style>
