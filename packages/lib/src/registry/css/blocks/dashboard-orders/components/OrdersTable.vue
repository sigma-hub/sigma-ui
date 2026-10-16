<script setup lang="ts">
import { FileIcon, ListFilterIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Checkbox } from '@ui/registry/css/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/registry/css/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/registry/css/ui/tabs';
import type { Order, OrderColumns, OrderTab, OrdersTableCopy } from '../data';

defineProps<{
  tabs: OrderTab[];
  activeTab: string;
  filters: string[];
  orders: Order[];
  columns: OrderColumns;
  copy: OrdersTableCopy;
}>();
</script>

<template>
  <Tabs :default-value="activeTab">
    <div class="dashboard-orders__toolbar">
      <TabsList>
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <div class="dashboard-orders__toolbar-actions">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              size="sm"
              class="dashboard-orders__toolbar-button"
            >
              <ListFilterIcon />
              <span class="dashboard-orders__action-label">{{ copy.filter }}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{{ copy.filterBy }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="filter in filters"
              :key="filter"
            >
              <div class="dashboard-orders__filter-option">
                <Checkbox id="terms1" />
                <label
                  for="terms2"
                  class="dashboard-orders__filter-label"
                >
                  {{ filter }}
                </label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="sm"
          class="dashboard-orders__toolbar-button"
        >
          <FileIcon />
          <span class="dashboard-orders__action-label">{{ copy.export }}</span>
        </Button>
      </div>
    </div>
    <TabsContent :value="activeTab">
      <Card>
        <CardHeader class="dashboard-orders__table-header">
          <CardTitle>{{ copy.title }}</CardTitle>
          <CardDescription>
            {{ copy.description }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{{ columns.customer }}</TableHead>
                <TableHead class="dashboard-orders__cell--from-sm">
                  {{ columns.type }}
                </TableHead>
                <TableHead class="dashboard-orders__cell--from-sm">
                  {{ columns.status }}
                </TableHead>
                <TableHead class="dashboard-orders__cell--from-md">
                  {{ columns.date }}
                </TableHead>
                <TableHead class="dashboard-orders__cell--end">
                  {{ columns.amount }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(order, orderIndex) in orders"
                :key="orderIndex"
                :class="{ 'dashboard-orders__row--selected': order.isSelected }"
              >
                <TableCell>
                  <div class="dashboard-orders__customer-name">
                    {{ order.customer }}
                  </div>
                  <div class="dashboard-orders__email">
                    {{ order.email }}
                  </div>
                </TableCell>
                <TableCell class="dashboard-orders__cell--from-sm">
                  {{ order.type }}
                </TableCell>
                <TableCell class="dashboard-orders__cell--from-sm">
                  <Badge :variant="order.badgeVariant">
                    {{ order.status }}
                  </Badge>
                </TableCell>
                <TableCell class="dashboard-orders__cell--from-md">
                  {{ order.date }}
                </TableCell>
                <TableCell class="dashboard-orders__cell--end">
                  {{ order.amount }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</template>

<style>
.dashboard-orders__toolbar {
  display: flex;
  align-items: center;
}

.dashboard-orders__toolbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.dashboard-orders .dashboard-orders__toolbar-button {
  height: 1.75rem;
  gap: 0.25rem;
  border-radius: calc(var(--radius) - 2px);
  padding-right: 0.75rem;
  padding-left: 0.75rem;
}

.dashboard-orders .dashboard-orders__toolbar-button svg {
  width: 0.875rem;
  height: 0.875rem;
}

.dashboard-orders__action-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (width >= 640px) {
  .dashboard-orders__action-label {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
}

.dashboard-orders__filter-option {
  display: flex;
}

.dashboard-orders__filter-option > * + * {
  margin-left: 0.5rem;
}

.dashboard-orders__filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.dashboard-orders .dashboard-orders__table-header {
  padding-right: 1.75rem;
  padding-left: 1.75rem;
}

.dashboard-orders__cell--from-sm,
.dashboard-orders__cell--from-md {
  display: none;
}

@media (width >= 640px) {
  .dashboard-orders__cell--from-sm {
    display: table-cell;
  }
}

@media (width >= 768px) {
  .dashboard-orders__cell--from-md {
    display: table-cell;
  }
}

.dashboard-orders .dashboard-orders__cell--end {
  text-align: right;
}

.dashboard-orders__customer-name {
  font-weight: 500;
}

.dashboard-orders__email {
  display: none;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

@media (width >= 768px) {
  .dashboard-orders__email {
    display: inline;
  }
}

.dashboard-orders__row--selected {
  background-color: var(--secondary);
}
</style>
