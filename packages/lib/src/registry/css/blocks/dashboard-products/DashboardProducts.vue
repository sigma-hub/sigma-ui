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

@media (width >= 640px) {
  .dashboard-products__shell {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3.5rem;
    gap: 1rem;
  }
}

.dashboard-products__main {
  display: grid;
  flex: 1 1 0%;
  align-items: flex-start;
  padding: 1rem;
  gap: 1rem;
}

@media (width >= 640px) {
  .dashboard-products__main {
    padding: 0 1.5rem;
  }
}

@media (width >= 768px) {
  .dashboard-products__main {
    gap: 2rem;
  }
}
</style>
