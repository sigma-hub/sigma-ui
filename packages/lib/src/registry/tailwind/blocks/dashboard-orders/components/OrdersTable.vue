<script setup lang="ts">
import { FileIcon, ListFilterIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/registry/tailwind/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/registry/tailwind/ui/tabs';
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
    <div class="flex items-center">
      <TabsList>
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <div class="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              size="sm"
              class="h-7 gap-1 rounded-md px-3"
            >
              <ListFilterIcon class="h-3.5 w-3.5" />
              <span class="sr-only sm:not-sr-only">{{ copy.filter }}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{{ copy.filterBy }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="filter in filters"
              :key="filter"
            >
              <div class="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <label
                  for="terms2"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          class="h-7 gap-1 rounded-md px-3"
        >
          <FileIcon class="h-3.5 w-3.5" />
          <span class="sr-only sm:not-sr-only">{{ copy.export }}</span>
        </Button>
      </div>
    </div>
    <TabsContent :value="activeTab">
      <Card>
        <CardHeader class="px-7">
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
                <TableHead class="hidden sm:table-cell">
                  {{ columns.type }}
                </TableHead>
                <TableHead class="hidden sm:table-cell">
                  {{ columns.status }}
                </TableHead>
                <TableHead class="hidden md:table-cell">
                  {{ columns.date }}
                </TableHead>
                <TableHead class="text-right">
                  {{ columns.amount }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(order, orderIndex) in orders"
                :key="orderIndex"
                :class="{ 'bg-secondary': order.isSelected }"
              >
                <TableCell>
                  <div class="font-medium">
                    {{ order.customer }}
                  </div>
                  <div class="hidden text-sm text-muted-foreground md:inline">
                    {{ order.email }}
                  </div>
                </TableCell>
                <TableCell class="hidden sm:table-cell">
                  {{ order.type }}
                </TableCell>
                <TableCell class="hidden sm:table-cell">
                  <Badge
                    class="text-xs"
                    :variant="order.badgeVariant"
                  >
                    {{ order.status }}
                  </Badge>
                </TableCell>
                <TableCell class="hidden md:table-cell">
                  {{ order.date }}
                </TableCell>
                <TableCell class="text-right">
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
