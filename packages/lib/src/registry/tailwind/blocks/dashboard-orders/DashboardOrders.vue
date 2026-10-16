<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import OrderDetails from './components/OrderDetails.vue';
import OrdersSummary from './components/OrdersSummary.vue';
import OrdersTable from './components/OrdersTable.vue';
import {
  accountMenuGroups,
  billingInformation,
  brandName,
  breadcrumbLinks,
  breadcrumbPage,
  customerFields,
  defaultOrderTab,
  headerCopy,
  mobileNavItems,
  orderActionGroups,
  orderColumns,
  orderDetailCopy,
  orderFilters,
  orderLineItems,
  orderSummaryLines,
  orderTabs,
  orders,
  ordersIntro,
  ordersTableCopy,
  paginationPageSize,
  paymentMethod,
  selectedOrder,
  shippingAddressLines,
  sidebarFooterItems,
  sidebarNavItems,
  statCards,
} from './data';
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <AppSidebar
      :nav-items="sidebarNavItems"
      :footer-items="sidebarFooterItems"
      :brand-name="brandName"
    />
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AppHeader
        :mobile-nav-items="mobileNavItems"
        :breadcrumb-links="breadcrumbLinks"
        :breadcrumb-page="breadcrumbPage"
        :account-menu-groups="accountMenuGroups"
        :brand-name="brandName"
        :header="headerCopy"
      />
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <OrdersSummary
            :intro="ordersIntro"
            :stat-cards="statCards"
          />
          <OrdersTable
            :tabs="orderTabs"
            :active-tab="defaultOrderTab"
            :filters="orderFilters"
            :orders="orders"
            :columns="orderColumns"
            :copy="ordersTableCopy"
          />
        </div>
        <div>
          <OrderDetails
            :order="selectedOrder"
            :action-groups="orderActionGroups"
            :line-items="orderLineItems"
            :summary-lines="orderSummaryLines"
            :shipping-address-lines="shippingAddressLines"
            :billing-information="billingInformation"
            :customer-fields="customerFields"
            :payment-method="paymentMethod"
            :page-size="paginationPageSize"
            :copy="orderDetailCopy"
          />
        </div>
      </main>
    </div>
  </div>
</template>
