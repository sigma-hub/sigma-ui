<script setup lang="ts">
import { CopyIcon, CreditCardIcon, MoreVerticalIcon, TruckIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPrev,
} from '@ui/registry/css/ui/pagination';
import { Separator } from '@ui/registry/css/ui/separator';
import type { CustomerField, OrderDetailCopy, OrderLineItem, OrderSummaryLine, PaymentMethod, SelectedOrder } from '../data';

defineProps<{
  order: SelectedOrder;
  actionGroups: string[][];
  lineItems: OrderLineItem[];
  summaryLines: OrderSummaryLine[];
  shippingAddressLines: string[];
  billingInformation: string;
  customerFields: CustomerField[];
  paymentMethod: PaymentMethod;
  pageSize: number;
  copy: OrderDetailCopy;
}>();
</script>

<template>
  <Card class="dashboard-orders__detail-card">
    <CardHeader class="dashboard-orders__detail-header">
      <div class="dashboard-orders__detail-heading">
        <CardTitle class="dashboard-orders__detail-title">
          {{ copy.id }} {{ order.id }}
          <Button
            size="icon"
            variant="outline"
            class="dashboard-orders__copy-button"
          >
            <CopyIcon />
            <span class="dashboard-orders__sr-only">{{ copy.copyId }}</span>
          </Button>
        </CardTitle>
        <CardDescription>{{ copy.date }} {{ order.date }}</CardDescription>
      </div>
      <div class="dashboard-orders__detail-actions">
        <Button
          size="sm"
          variant="outline"
          class="dashboard-orders__track-button"
        >
          <TruckIcon />
          <span class="dashboard-orders__track-label">
            {{ copy.trackOrder }}
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              size="icon"
              variant="outline"
              class="dashboard-orders__more-button"
            >
              <MoreVerticalIcon />
              <span class="dashboard-orders__sr-only">{{ copy.more }}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <template
              v-for="(group, groupIndex) in actionGroups"
              :key="groupIndex"
            >
              <DropdownMenuSeparator v-if="groupIndex > 0" />
              <DropdownMenuItem
                v-for="item in group"
                :key="item"
              >
                {{ item }}
              </DropdownMenuItem>
            </template>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent class="dashboard-orders__detail-content">
      <div class="dashboard-orders__stack">
        <div class="dashboard-orders__section-title">
          {{ copy.details }}
        </div>
        <ul class="dashboard-orders__lines">
          <li
            v-for="item in lineItems"
            :key="item.name"
            class="dashboard-orders__line"
          >
            <span class="dashboard-orders__muted">
              {{ item.name }} x <span>{{ item.quantity }}</span>
            </span>
            <span>{{ item.price }}</span>
          </li>
        </ul>
        <Separator class="dashboard-orders__separator--tight" />
        <ul class="dashboard-orders__lines">
          <li
            v-for="line in summaryLines"
            :key="line.label"
            class="dashboard-orders__line"
            :class="{ 'dashboard-orders__line--total': line.isTotal }"
          >
            <span class="dashboard-orders__muted">{{ line.label }}</span>
            <span>{{ line.value }}</span>
          </li>
        </ul>
      </div>
      <Separator class="dashboard-orders__separator" />
      <div class="dashboard-orders__split">
        <div class="dashboard-orders__stack">
          <div class="dashboard-orders__section-title">
            {{ copy.shipping }}
          </div>
          <address class="dashboard-orders__address">
            <span
              v-for="line in shippingAddressLines"
              :key="line"
            >{{ line }}</span>
          </address>
        </div>
        <div class="dashboard-orders__billing">
          <div class="dashboard-orders__section-title">
            {{ copy.billing }}
          </div>
          <div class="dashboard-orders__muted">
            {{ billingInformation }}
          </div>
        </div>
      </div>
      <Separator class="dashboard-orders__separator" />
      <div class="dashboard-orders__stack">
        <div class="dashboard-orders__section-title">
          {{ copy.customer }}
        </div>
        <dl class="dashboard-orders__lines">
          <div
            v-for="field in customerFields"
            :key="field.label"
            class="dashboard-orders__line"
          >
            <dt class="dashboard-orders__muted">
              {{ field.label }}
            </dt>
            <dd>
              <a
                v-if="field.href"
                :href="field.href"
              >{{ field.value }}</a>
              <template v-else>
                {{ field.value }}
              </template>
            </dd>
          </div>
        </dl>
      </div>
      <Separator class="dashboard-orders__separator" />
      <div class="dashboard-orders__stack">
        <div class="dashboard-orders__section-title">
          {{ copy.payment }}
        </div>
        <dl class="dashboard-orders__lines">
          <div class="dashboard-orders__line">
            <dt class="dashboard-orders__payment-brand">
              <CreditCardIcon />
              {{ paymentMethod.brand }}
            </dt>
            <dd>{{ paymentMethod.maskedNumber }}</dd>
          </div>
        </dl>
      </div>
    </CardContent>
    <CardFooter class="dashboard-orders__detail-footer">
      <div class="dashboard-orders__updated">
        {{ copy.updated }} <time :datetime="order.updatedAt.dateTime">{{ order.updatedAt.label }}</time>
      </div>
      <Pagination
        class="dashboard-orders__pagination"
        :items-per-page="pageSize"
      >
        <PaginationList class="dashboard-orders__pagination-list">
          <PaginationPrev
            variant="outline"
            class="dashboard-orders__page-button"
          />
          <PaginationNext
            variant="outline"
            class="dashboard-orders__page-button"
          />
        </PaginationList>
      </Pagination>
    </CardFooter>
  </Card>
</template>

<style>
@layer components {
  .dashboard-orders__detail-card {
    overflow: hidden;
  }

  .dashboard-orders .dashboard-orders__detail-header {
    flex-direction: row;
    align-items: flex-start;
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }

  .dashboard-orders__detail-heading {
    display: grid;
    gap: calc(var(--spacing) * 0.5);
  }

  .dashboard-orders .dashboard-orders__detail-title {
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    gap: calc(var(--spacing) * 2);
    line-height: 1.75rem;
  }

  .dashboard-orders .dashboard-orders__copy-button {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dashboard-orders .dashboard-orders__detail-title:hover .dashboard-orders__copy-button {
    opacity: 1;
  }

  .dashboard-orders .dashboard-orders__copy-button svg {
    width: calc(var(--spacing) * 3);
    height: calc(var(--spacing) * 3);
  }

  .dashboard-orders__detail-actions {
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-orders .dashboard-orders__track-button {
    height: calc(var(--spacing) * 8);
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-orders .dashboard-orders__more-button {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
  }

  .dashboard-orders .dashboard-orders__track-button svg,
  .dashboard-orders .dashboard-orders__more-button svg {
    width: calc(var(--spacing) * 3.5);
    height: calc(var(--spacing) * 3.5);
  }

  @media (width >= 64rem) {
    .dashboard-orders__track-label {
      position: absolute;
      overflow: hidden;
      width: 1px;
      height: 1px;
      padding: 0;
      border-width: 0;
      margin: -1px;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
  }

  @media (width >= 80rem) {
    .dashboard-orders__track-label {
      position: static;
      overflow: visible;
      width: auto;
      height: auto;
      padding: 0;
      margin: 0;
      clip: auto;
      white-space: nowrap;
    }
  }

  .dashboard-orders .dashboard-orders__detail-content {
    padding: calc(var(--spacing) * 6);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .dashboard-orders__stack,
  .dashboard-orders__lines {
    display: grid;
    gap: calc(var(--spacing) * 3);
  }

  .dashboard-orders__section-title,
  .dashboard-orders__line--total {
    font-weight: 600;
  }

  .dashboard-orders__line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dashboard-orders__muted,
  .dashboard-orders__address,
  .dashboard-orders__payment-brand {
    color: var(--muted-foreground);
  }

  .dashboard-orders .dashboard-orders__separator--tight {
    margin-top: calc(var(--spacing) * 2);
    margin-bottom: calc(var(--spacing) * 2);
  }

  .dashboard-orders .dashboard-orders__separator {
    margin-top: calc(var(--spacing) * 4);
    margin-bottom: calc(var(--spacing) * 4);
  }

  .dashboard-orders__split {
    display: grid;
    gap: calc(var(--spacing) * 4);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-orders__address {
    display: grid;
    font-style: normal;
    gap: calc(var(--spacing) * 0.5);
  }

  .dashboard-orders__billing {
    display: grid;
    gap: calc(var(--spacing) * 3);
    grid-auto-rows: max-content;
  }

  .dashboard-orders__payment-brand {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-orders__payment-brand svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .dashboard-orders .dashboard-orders__detail-footer {
    flex-direction: row;
    align-items: center;
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 6);
    border-top: 1px solid var(--border);
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }

  .dashboard-orders__updated {
    color: var(--muted-foreground);
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .dashboard-orders__pagination {
    width: auto;
    margin-right: 0;
    margin-left: auto;
  }

  .dashboard-orders__pagination-list {
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-orders .dashboard-orders__page-button {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
  }

  .dashboard-orders__sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border-width: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
