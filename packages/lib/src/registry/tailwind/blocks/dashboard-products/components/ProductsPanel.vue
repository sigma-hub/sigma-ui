<script setup lang="ts">
import { FileIcon, ListFilterIcon, MoreHorizontalIcon, PlusCircleIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
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
import type { FilterOption, Product, ProductTab, ProductsCopy } from '../data';

defineProps<{
  tabs: ProductTab[];
  activeTab: string;
  filterOptions: FilterOption[];
  products: Product[];
  detailColumns: string[];
  actions: string[];
  summary: { range: string; total: number };
  copy: ProductsCopy;
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
          :class="{ 'hidden sm:flex': tab.isHiddenOnMobile }"
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
              class="h-7 gap-1"
            >
              <ListFilterIcon class="h-3.5 w-3.5" />
              <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {{ copy.filter }}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{{ copy.filterBy }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="option in filterOptions"
              :key="option.label"
              v-bind="option.isSelected ? { modelValue: true } : {}"
            >
              {{ option.label }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          size="sm"
          variant="outline"
          class="h-7 gap-1"
        >
          <FileIcon class="h-3.5 w-3.5" />
          <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {{ copy.export }}
          </span>
        </Button>
        <Button
          size="sm"
          class="h-7 gap-1"
        >
          <PlusCircleIcon class="h-3.5 w-3.5" />
          <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {{ copy.addProduct }}
          </span>
        </Button>
      </div>
    </div>
    <TabsContent :value="activeTab">
      <Card>
        <CardHeader>
          <CardTitle>{{ copy.title }}</CardTitle>
          <CardDescription>
            {{ copy.description }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="hidden w-[100px] sm:table-cell">
                  <span class="sr-only">{{ copy.imageColumn }}</span>
                </TableHead>
                <TableHead>{{ copy.nameColumn }}</TableHead>
                <TableHead>{{ copy.statusColumn }}</TableHead>
                <TableHead
                  v-for="column in detailColumns"
                  :key="column"
                  class="hidden md:table-cell"
                >
                  {{ column }}
                </TableHead>
                <TableHead>
                  <span class="sr-only">{{ copy.actionsColumn }}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="product in products"
                :key="product.name"
              >
                <TableCell class="hidden sm:table-cell">
                  <img
                    :alt="copy.imageAlt"
                    class="aspect-square rounded-md object-cover"
                    height="64"
                    :src="product.imageUrl"
                    width="64"
                  >
                </TableCell>
                <TableCell class="font-medium">
                  {{ product.name }}
                </TableCell>
                <TableCell>
                  <Badge :variant="product.badgeVariant">
                    {{ product.status }}
                  </Badge>
                </TableCell>
                <TableCell class="hidden md:table-cell">
                  {{ product.price }}
                </TableCell>
                <TableCell class="hidden md:table-cell">
                  {{ product.totalSales }}
                </TableCell>
                <TableCell class="hidden md:table-cell">
                  {{ product.createdAt }}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontalIcon class="h-4 w-4" />
                        <span class="sr-only">{{ copy.rowMenu }}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{{ copy.actionsMenu }}</DropdownMenuLabel>
                      <DropdownMenuItem
                        v-for="action in actions"
                        :key="action"
                      >
                        {{ action }}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div class="text-xs text-muted-foreground">
            {{ copy.showing }} <strong>{{ summary.range }}</strong> {{ copy.of }} <strong>{{ summary.total }}</strong>
            {{ copy.products }}
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>
