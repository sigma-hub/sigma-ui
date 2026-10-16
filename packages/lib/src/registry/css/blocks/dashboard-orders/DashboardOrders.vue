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
  <div class="dashboard-orders">
    <AppSidebar
      :nav-items="sidebarNavItems"
      :footer-items="sidebarFooterItems"
      :brand-name="brandName"
    />
    <div class="dashboard-orders__shell">
      <AppHeader
        :mobile-nav-items="mobileNavItems"
        :breadcrumb-links="breadcrumbLinks"
        :breadcrumb-page="breadcrumbPage"
        :account-menu-groups="accountMenuGroups"
        :brand-name="brandName"
        :header="headerCopy"
      />
      <main class="dashboard-orders__main">
        <div class="dashboard-orders__primary">
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

<style>
.dashboard-orders {
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  background-color: hsl(var(--muted) / 40%);
}

.dashboard-orders__shell {
  display: flex;
  flex-direction: column;
}

@media (width >= 640px) {
  .dashboard-orders__shell {
    gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3.5rem;
  }
}

.dashboard-orders__main {
  display: grid;
  flex: 1 1 0%;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
}

@media (width >= 640px) {
  .dashboard-orders__main {
    padding-top: 0;
    padding-right: 1.5rem;
    padding-bottom: 0;
    padding-left: 1.5rem;
  }
}

@media (width >= 768px) {
  .dashboard-orders__main {
    gap: 2rem;
  }
}

@media (width >= 1024px) {
  .dashboard-orders__main {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.dashboard-orders__primary {
  display: grid;
  grid-auto-rows: max-content;
  align-items: flex-start;
  gap: 1rem;
}

@media (width >= 768px) {
  .dashboard-orders__primary {
    gap: 2rem;
  }
}

@media (width >= 1024px) {
  .dashboard-orders__primary {
    grid-column: span 2 / span 2;
  }
}
</style>
