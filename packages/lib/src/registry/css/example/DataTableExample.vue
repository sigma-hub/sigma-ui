<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table';
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import { ArrowUpDownIcon, ChevronDownIcon } from 'lucide-vue-next';
import { h, ref } from 'vue';
import DropdownAction from './DataTableMenu.vue';
import { Button } from '@ui/registry/css/ui/button';
import { Checkbox } from '@ui/registry/css/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import { Input } from '@ui/registry/css/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/registry/css/ui/table';
import { valueUpdater } from '@ui/utils';

export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
];

const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': value => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h('div', { class: 'example-sigma-ui-data-table__cell-content--capitalize' }, row.getValue('status')),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Email', h(ArrowUpDownIcon, { class: 'example-sigma-ui-data-table__sort-icon' })]);
    },
    cell: ({ row }) => h('div', { class: 'example-sigma-ui-data-table__cell-content--lowercase' }, row.getValue('email')),
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'example-sigma-ui-data-table__cell-content--right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return h('div', { class: 'example-sigma-ui-data-table__cell-content--right example-sigma-ui-data-table__cell-content--medium' }, formatted);
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return h('div', { class: 'example-sigma-ui-data-table__cell-content--relative' }, h(DropdownAction, {
        payment,
        onExpand: row.toggleExpanded,
      }));
    },
  },
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
});
</script>

<template>
  <div class="example-sigma-ui-data-table">
    <div class="example-sigma-ui-data-table__toolbar">
      <Input
        class="example-sigma-ui-data-table__search"
        placeholder="Filter emails..."
        :model-value="table.getColumn('email')?.getFilterValue()?.toString() ?? ''"
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="outline"
            class="example-sigma-ui-data-table__column-button"
          >
            Columns <ChevronDownIcon class="example-sigma-ui-data-table__column-button-icon" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="example-sigma-ui-data-table__column-item"
            :model-value="column.getIsVisible()"
            @update:model-value="(value) => {
              column.toggleVisibility(!!value)
            }"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="example-sigma-ui-data-table__container">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template
              v-for="row in table.getRowModel().rows"
              :key="row.id"
            >
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="example-sigma-ui-data-table__empty"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="example-sigma-ui-data-table__footer">
      <div class="example-sigma-ui-data-table__footer-info">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="example-sigma-ui-data-table__footer-pagination">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<style>
.example-sigma-ui-data-table {
  width: 100%;
}

.example-sigma-ui-data-table__toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 1rem 0;
}

.example-sigma-ui-data-table__search {
  max-width: 24rem;
}

.example-sigma-ui-data-table__column-button {
  margin-left: auto;
}

.example-sigma-ui-data-table__column-button-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.example-sigma-ui-data-table__column-item {
  text-transform: capitalize;
}

.example-sigma-ui-data-table__container {
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
}

.example-sigma-ui-data-table__empty {
  height: 6rem;
  text-align: center;
}

.example-sigma-ui-data-table__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 0;
}

.example-sigma-ui-data-table__footer-info {
  flex: 1;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-data-table__footer-pagination {
  display: flex;
  gap: 0.5rem;
}

.example-sigma-ui-data-table__sort-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
}

.example-sigma-ui-data-table__cell-content--right {
  text-align: right;
}

.example-sigma-ui-data-table__cell-content--medium {
  font-weight: 500;
}

.example-sigma-ui-data-table__cell-content--capitalize {
  text-transform: capitalize;
}

.example-sigma-ui-data-table__cell-content--lowercase {
  text-transform: lowercase;
}

.example-sigma-ui-data-table__cell-content--relative {
  position: relative;
}
</style>
