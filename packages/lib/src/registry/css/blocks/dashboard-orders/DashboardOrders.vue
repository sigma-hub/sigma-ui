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
@layer base, components;

@layer components {
  .dashboard-orders {
    display: flex;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
    background-color: color-mix(in oklch, var(--muted) 40%, transparent);
  }

  .dashboard-orders__shell {
    display: flex;
    flex-direction: column;
  }

  @media (width >= 40rem) {
    .dashboard-orders__shell {
      padding-top: calc(var(--spacing) * 4);
      padding-bottom: calc(var(--spacing) * 4);
      padding-left: calc(var(--spacing) * 14);
      gap: calc(var(--spacing) * 4);
    }
  }

  .dashboard-orders__main {
    display: grid;
    flex: 1 1 0%;
    align-items: flex-start;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  @media (width >= 40rem) {
    .dashboard-orders__main {
      padding: 0 calc(var(--spacing) * 6);
    }
  }

  @media (width >= 48rem) {
    .dashboard-orders__main {
      gap: calc(var(--spacing) * 8);
    }
  }

  @media (width >= 64rem) {
    .dashboard-orders__main {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .dashboard-orders__primary {
    display: grid;
    align-items: flex-start;
    gap: calc(var(--spacing) * 4);
    grid-auto-rows: max-content;
  }

  @media (width >= 48rem) {
    .dashboard-orders__primary {
      gap: calc(var(--spacing) * 8);
    }
  }

  @media (width >= 64rem) {
    .dashboard-orders__primary {
      grid-column: span 2 / span 2;
    }
  }
}
</style>
