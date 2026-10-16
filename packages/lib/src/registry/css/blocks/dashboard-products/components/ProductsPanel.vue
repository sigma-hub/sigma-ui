<script setup lang="ts">
import { FileIcon, ListFilterIcon, MoreHorizontalIcon, PlusCircleIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
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
    <div class="dashboard-products__toolbar">
      <TabsList>
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          :class="{ 'dashboard-products__tab--desktop': tab.isHiddenOnMobile }"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <div class="dashboard-products__toolbar-actions">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              size="sm"
              class="dashboard-products__toolbar-button"
            >
              <ListFilterIcon />
              <span class="dashboard-products__action-label">
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
          class="dashboard-products__toolbar-button"
        >
          <FileIcon />
          <span class="dashboard-products__action-label">
            {{ copy.export }}
          </span>
        </Button>
        <Button
          size="sm"
          class="dashboard-products__toolbar-button"
        >
          <PlusCircleIcon />
          <span class="dashboard-products__action-label">
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
                <TableHead class="dashboard-products__image-head">
                  <span class="dashboard-products__sr-only">{{ copy.imageColumn }}</span>
                </TableHead>
                <TableHead>{{ copy.nameColumn }}</TableHead>
                <TableHead>{{ copy.statusColumn }}</TableHead>
                <TableHead
                  v-for="column in detailColumns"
                  :key="column"
                  class="dashboard-products__detail-cell"
                >
                  {{ column }}
                </TableHead>
                <TableHead>
                  <span class="dashboard-products__sr-only">{{ copy.actionsColumn }}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="product in products"
                :key="product.name"
              >
                <TableCell class="dashboard-products__image-cell">
                  <img
                    :alt="copy.imageAlt"
                    class="dashboard-products__image"
                    height="64"
                    :src="product.imageUrl"
                    width="64"
                  >
                </TableCell>
                <TableCell class="dashboard-products__name">
                  {{ product.name }}
                </TableCell>
                <TableCell>
                  <Badge :variant="product.badgeVariant">
                    {{ product.status }}
                  </Badge>
                </TableCell>
                <TableCell class="dashboard-products__detail-cell">
                  {{ product.price }}
                </TableCell>
                <TableCell class="dashboard-products__detail-cell">
                  {{ product.totalSales }}
                </TableCell>
                <TableCell class="dashboard-products__detail-cell">
                  {{ product.createdAt }}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        class="dashboard-products__row-button"
                      >
                        <MoreHorizontalIcon />
                        <span class="dashboard-products__sr-only">{{ copy.rowMenu }}</span>
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
          <div class="dashboard-products__summary">
            {{ copy.showing }} <strong>{{ summary.range }}</strong> {{ copy.of }} <strong>{{ summary.total }}</strong>
            {{ copy.products }}
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>

<style>
.dashboard-products__toolbar {
  display: flex;
  align-items: center;
}

.dashboard-products__toolbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.dashboard-products .dashboard-products__tab--desktop {
  display: none;
}

@media (width >= 640px) {
  .dashboard-products .dashboard-products__tab--desktop {
    display: flex;
  }
}

.dashboard-products .dashboard-products__toolbar-button {
  height: 1.75rem;
  gap: 0.25rem;
}

.dashboard-products .dashboard-products__toolbar-button svg {
  width: 0.875rem;
  height: 0.875rem;
}

.dashboard-products .dashboard-products__row-button svg {
  width: 1rem;
  height: 1rem;
}

.dashboard-products__action-label {
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
  .dashboard-products__action-label {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: nowrap;
  }
}

.dashboard-products__image-head,
.dashboard-products__image-cell,
.dashboard-products__detail-cell {
  display: none;
}

.dashboard-products__image-head {
  width: 100px;
}

@media (width >= 640px) {
  .dashboard-products__image-head,
  .dashboard-products__image-cell {
    display: table-cell;
  }
}

@media (width >= 768px) {
  .dashboard-products__detail-cell {
    display: table-cell;
  }
}

.dashboard-products__image {
  aspect-ratio: 1 / 1;
  border-radius: calc(var(--radius) - 2px);
  object-fit: cover;
}

.dashboard-products__name {
  font-weight: 500;
}

.dashboard-products__summary {
  color: var(--muted-foreground);
  font-size: 0.75rem;
  line-height: 1rem;
}

.dashboard-products__sr-only {
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
</style>
