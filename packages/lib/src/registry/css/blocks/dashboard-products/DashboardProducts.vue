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
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  background-color: color-mix(in oklch, var(--muted) 40%, transparent);
}

.dashboard-products__shell {
  display: flex;
  flex-direction: column;
}

@media (width >= 640px) {
  .dashboard-products__shell {
    gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3.5rem;
  }
}

.dashboard-products__main {
  display: grid;
  flex: 1 1 0%;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
}

@media (width >= 640px) {
  .dashboard-products__main {
    padding-top: 0;
    padding-right: 1.5rem;
    padding-bottom: 0;
    padding-left: 1.5rem;
  }
}

@media (width >= 768px) {
  .dashboard-products__main {
    gap: 2rem;
  }
}
</style>
