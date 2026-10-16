<script setup lang="ts">
import { CopyIcon, CreditCardIcon, MoreVerticalIcon, TruckIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPrev,
} from '@ui/registry/tailwind/ui/pagination';
import { Separator } from '@ui/registry/tailwind/ui/separator';
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
  <Card class="overflow-hidden">
    <CardHeader class="flex flex-row items-start bg-muted/50">
      <div class="grid gap-0.5">
        <CardTitle class="group flex items-center gap-2 text-lg">
          {{ copy.id }} {{ order.id }}
          <Button
            size="icon"
            variant="outline"
            class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <CopyIcon class="h-3 w-3" />
            <span class="sr-only">{{ copy.copyId }}</span>
          </Button>
        </CardTitle>
        <CardDescription>{{ copy.date }} {{ order.date }}</CardDescription>
      </div>
      <div class="ml-auto flex items-center gap-1">
        <Button
          size="sm"
          variant="outline"
          class="h-8 gap-1"
        >
          <TruckIcon class="h-3.5 w-3.5" />
          <span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
            {{ copy.trackOrder }}
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              size="icon"
              variant="outline"
              class="h-8 w-8"
            >
              <MoreVerticalIcon class="h-3.5 w-3.5" />
              <span class="sr-only">{{ copy.more }}</span>
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
    <CardContent class="p-6 text-sm">
      <div class="grid gap-3">
        <div class="font-semibold">
          {{ copy.details }}
        </div>
        <ul class="grid gap-3">
          <li
            v-for="item in lineItems"
            :key="item.name"
            class="flex items-center justify-between"
          >
            <span class="text-muted-foreground">
              {{ item.name }} x <span>{{ item.quantity }}</span>
            </span>
            <span>{{ item.price }}</span>
          </li>
        </ul>
        <Separator class="my-2" />
        <ul class="grid gap-3">
          <li
            v-for="line in summaryLines"
            :key="line.label"
            class="flex items-center justify-between"
            :class="{ 'font-semibold': line.isTotal }"
          >
            <span class="text-muted-foreground">{{ line.label }}</span>
            <span>{{ line.value }}</span>
          </li>
        </ul>
      </div>
      <Separator class="my-4" />
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-3">
          <div class="font-semibold">
            {{ copy.shipping }}
          </div>
          <address class="grid gap-0.5 not-italic text-muted-foreground">
            <span
              v-for="line in shippingAddressLines"
              :key="line"
            >{{ line }}</span>
          </address>
        </div>
        <div class="grid auto-rows-max gap-3">
          <div class="font-semibold">
            {{ copy.billing }}
          </div>
          <div class="text-muted-foreground">
            {{ billingInformation }}
          </div>
        </div>
      </div>
      <Separator class="my-4" />
      <div class="grid gap-3">
        <div class="font-semibold">
          {{ copy.customer }}
        </div>
        <dl class="grid gap-3">
          <div
            v-for="field in customerFields"
            :key="field.label"
            class="flex items-center justify-between"
          >
            <dt class="text-muted-foreground">
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
      <Separator class="my-4" />
      <div class="grid gap-3">
        <div class="font-semibold">
          {{ copy.payment }}
        </div>
        <dl class="grid gap-3">
          <div class="flex items-center justify-between">
            <dt class="flex items-center gap-1 text-muted-foreground">
              <CreditCardIcon class="h-4 w-4" />
              {{ paymentMethod.brand }}
            </dt>
            <dd>{{ paymentMethod.maskedNumber }}</dd>
          </div>
        </dl>
      </div>
    </CardContent>
    <CardFooter class="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
      <div class="text-xs text-muted-foreground">
        {{ copy.updated }} <time :datetime="order.updatedAt.dateTime">{{ order.updatedAt.label }}</time>
      </div>
      <Pagination
        class="ml-auto mr-0 w-auto"
        :items-per-page="pageSize"
      >
        <PaginationList class="gap-1">
          <PaginationPrev
            variant="outline"
            class="h-6 w-6"
          />
          <PaginationNext
            variant="outline"
            class="h-6 w-6"
          />
        </PaginationList>
      </Pagination>
    </CardFooter>
  </Card>
</template>
