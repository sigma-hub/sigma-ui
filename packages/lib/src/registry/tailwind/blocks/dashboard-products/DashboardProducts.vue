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
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <AppSidebar
      :nav-items="sidebarLinks"
      :footer-items="sidebarFooterLinks"
      :brand-name="brandName"
    />
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AppHeader
        :mobile-nav-items="mobileNavLinks"
        :breadcrumb-links="breadcrumbLinks"
        :breadcrumb-page="currentBreadcrumb"
        :account-menu-groups="accountMenuGroups"
        :brand-name="brandName"
        :header="headerCopy"
      />
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
