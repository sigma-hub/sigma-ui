---
title: Data Table
description: Customizable tables and datagrids with TanStack Table.
primitive: https://tanstack.com/table/v8/docs/guide/introduction
---

## Preview

<ComponentPreview name="DataTableExample" />

This example uses other `sigma-ui components` and `TanStack Table`. Add them if needed:

```bash
npx sigma-ui add button checkbox dropdown-menu input
```

```bash
npm install @tanstack/vue-table
```

## Introduction

`Table` is not provided as a single component because every table / datagrid is unique and requires a custom implementation and customization.

When you add `Table` component, you will get basic building blocks, from which you can build your own table / datagrid.

Follow the guide below to learn how to build it

<Callout class="mt-4">

**Tip:** If you are using the same table in multiple places in your app, extract it into a reusable component.

</Callout>

## Table of Contents

This guide will show you how to build your own custom data table with [TanStack Table](https://tanstack.com/table/v8) and the `Table` component.

- [Basic Table](#basic-table)
- [Row Actions](#row-actions)
- [Pagination](#pagination)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Visibility](#visibility)
- [Row Selection](#row-selection)
- [Reusable Components](#reusable-components)

## Installation

1. Add the `<Table />` component to your project:

```bash
npx sigma-ui add table
```

2. Add `tanstack/vue-table` dependency:

```bash
npm install @tanstack/vue-table
```

3. Create needed file structure for your `table` component, for example:

```txt
components
    └── payments
          ├── columns.ts
          ├── data-table.vue
          ├── data-table-dropdown.vue
└── app.vue
```

- `columns.ts` It will contain our column definitions.
- `data-table.vue` It will contain our `<DataTable />` component.
- `data-table-dropdown.vue` It will contain our `<DropdownAction />` component.
- `app.vue` This is where we'll fetch data and render our table.

## Examples

### Table with pinned columns
<ComponentPreview name="DataTableColumnPinning" />

This example uses other `sigma-ui components` and `TanStack Table`. Add them if needed:

```bash
npx sigma-ui add button checkbox dropdown-menu input
```

```bash
npm install @tanstack/vue-table
```

## Guide

This guide will show you how to build a basic table showing some list of recent payments, in details.

#### Data

```ts:line-numbers
interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  // ...
]
```

<Steps>

### Column Definitions

First, we'll define our columns in the `columns.ts` file.

```ts:line-numbers
import { h } from 'vue'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }
]
```

<Callout class="mt-4">

**Note:** Columns are where you define the core of what your table
will look like. They define the data that will be displayed, how it will be
formatted, sorted and filtered.

</Callout>

### `<DataTable />` component

Next, we'll create a `<DataTable />` component to render our table.

```vue
<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="border rounded-md">
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
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
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
        </template>
        <template v-else>
          <TableRow>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
```

<Callout>

**Tip**: If you are using `<DataTable />` in multiple places, make this component reusable by extracting it to `components/ui/data-table.vue`.

`<DataTable :columns="columns" :data="data" />`

</Callout>

### Render the table

Finally, we'll render our table in our index component.

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from './components/columns'
import type { Payment } from './components/columns'
import DataTable from './components/DataTable.vue'

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable
      :columns="columns"
      :data="data"
    />
  </div>
</template>
```

</Steps>

## Cell Formatting

Let's format the amount cell to display the dollar amount. We'll also align the cell to the right.

<Steps>

### Update columns definition

Update the `header` and `cell` definitions for amount as follows:

```ts
import { h } from 'vue'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }
]
```
You can use the same approach to format other cells and headers.
</Steps>

## Row Actions

Let's add row actions to our table. We'll use a `<Dropdown />` component for this.

<Steps>

### Add the following into your `DataTableDropDown.vue` component

```vue:line-numbers
<script setup lang="ts">
import { MoreHorizontalIcon } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  payment: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="w-8 h-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <MoreHorizontalIcon class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Update columns definition

Update our columns definition to add a new `actions` column. The `actions` cell returns a `<Dropdown />` component.

```ts
import { ColumnDef } from '@tanstack/vue-table'
import DropdownAction from '@/components/DataTableDropDown.vue'

export const columns: ColumnDef<Payment>[] = [
  // ...
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
      }))
    },
  },
]
```

You can access the row data using `row.original` in the `cell` function. Use this to handle actions for your row eg. use the `id` to make a DELETE call to your API.

</Steps>

## Pagination

Next, we'll add pagination to our table.

<Steps>

### Update `<DataTable>`

```ts:line-numbers {4,12}
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable,
} from "@tanstack/vue-table"

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
})
```

This will automatically paginate your rows into pages of 10. See the [pagination docs](https://tanstack.com/table/v8/docs/api/features/pagination) for more information on customizing page size and implementing manual pagination.

### Add pagination controls

We can add pagination controls to our table using the `<Button />` component and the `table.previousPage()`, `table.nextPage()` API methods.

```vue
<script lang="ts" generic="TData, TValue">
import { Button } from '@/components/ui/button'

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})
</script>

<template>
  <div>
    <div class="border rounded-md">
      <Table>
        ...
      </Table>
    </div>
    <div class="flex items-center justify-end py-4 space-x-2">
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
</template>
```

See [Reusable Components](#reusable-components) section for a more advanced pagination component.

</Steps>

## Sorting

Let's make the email column sortable.

<Steps>

### Add the following into your `utils` file

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function'
    ? updaterOrValue(ref.value)
    : updaterOrValue
}
```

The `valueUpdater` function updates a Vue `ref` object's value. It handles both direct assignments and transformations using a function. If `updaterOrValue` is a function, it's called with the current `ref` value, and the result is assigned to `ref.value`. If it's not a function, it's directly assigned to `ref.value`. This utility enhances flexibility in updating `ref` values. While Vue `ref` can manage reactive state directly, `valueUpdater` simplifies value updates, improving code readability and maintainability when the new state can be a direct value or a function generating it based on the current one.

### Update `<DataTable>`

```vue:line-numbers {4,14,17,33,40-44}
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
} from '@tanstack/vue-table'

import { ArrowUpDownIcon, ChevronDownIcon } from 'lucide-vue-next'
import { h, ref } from 'vue'

import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { valueUpdater } from '@ui/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() { return sorting.value },
  },
})
</script>

<template>
  <div>
    <div class="border rounded-md">
      <Table>{ ... }</Table>
    </div>
  </div>
</template>
```

### Make header cell sortable

We can now update the `email` header cell to add sorting controls.

```ts:line-numbers {5,10-17}
// components/payments/columns.ts
import type {
  ColumnDef,
} from '@tanstack/vue-table'
import { ArrowUpDownIcon, ChevronDownIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Email', h(ArrowUpDownIcon, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    },
]
```

This will automatically sort the table (asc and desc) when the user toggles on the header cell.

</Steps>

## Filtering

Let's add a search input to filter emails in our table.

<Steps>

### Update `<DataTable>`

```vue:line-numbers {4,11,19,39,48-49,52,60-64}
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/vue-table'

import { valueUpdater } from '@ui/utils'

import { ArrowUpDownIcon, ChevronDownIcon } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { h, ref } from 'vue'

import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
} from "@tanstack/vue-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
    },
})

</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" placeholder="Filter emails..."
                :model-value="table.getColumn('email')?.getFilterValue()?.toString() ?? ''"
                @update:model-value=" table.getColumn('email')?.setFilterValue($event)" />
        </div>
        <div class="border rounded-md">
            <Table>{ ... }</Table>
        </div>
    </div>
</template>

```

Filtering is now enabled for the `email` column. You can add filters to other columns as well. See the [filtering docs](https://tanstack.com/table/v8/docs/guide/filters) for more information on customizing filters.

</Steps>

## Visibility

Adding column visibility is fairly simple using `@tanstack/vue-table` visibility API.

<Steps>

### Update `<DataTable>`

```vue:line-numbers {6,9-14,48,59,63,75-91}
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { valueUpdater } from '@ui/utils'

import { ArrowUpDownIcon, ChevronDownIcon } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { h, ref } from 'vue'

import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
} from "@tanstack/vue-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
    },
})

</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" placeholder="Filter emails..."
                :model-value="table.getColumn('email')?.getFilterValue()?.toString() ?? ''"
                @update:model-value=" table.getColumn('email')?.setFilterValue($event)" />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Columns
                        <ChevronDownIcon class="w-4 h-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
                        :key="column.id"
                        class="capitalize" 
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
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colSpan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

```

This adds a dropdown menu that you can use to toggle column visibility.

</Steps>

## Row Selection

Next, we're going to add row selection to our table.

<Steps>

### Update column definitions

```ts:line-numbers {3,6-20}
import type { ColumnDef } from '@tanstack/vue-table'

import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Payment>[] = [
    {
        id: 'select',
        header: ({ table }) => h(Checkbox, {
            'modelValue': table.getIsAllPageRowsSelected(),
            'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
        }),
        cell: ({ row }) => h(Checkbox, {
            'modelValue': row.getIsSelected(),
            'onUpdate:modelValue': (value: boolean) => row.toggleSelected(!!value),
            'ariaLabel': 'Select row',
        }),
        enableSorting: false,
        enableHiding: false,
    },
]
```

### Update `<DataTable>`

```vue:line-numbers {10,22,27}
<script setup lang="ts" generic="TData, TValue">
const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
        get rowSelection() { return rowSelection.value },
    },
})

</script>

<template>
  <div>
    <div class="border rounded-md">
        <Table />
    </div>
  </div>
</template>

```

This adds a checkbox to each row and a checkbox in the header to select all rows.

### Show selected rows

You can show the number of selected rows using the `table.getFilteredSelectedRowModel()` API.

```vue:line-numbers {8-11}
<template>
  <div>
    <div class="border rounded-md">
        <Table />
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <PaginationButtons />
      </div>
    </div>
  </div>
</template>

```

</Steps>

<Steps>

## Expanding

Let's make rows expandable.

### Update `<DataTable>`

```vue:line-numbers {7,30,43,52,57,63,103-116}
<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ExpandedState,
} from '@tanstack/vue-table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { valueUpdater } from '@ui/utils'

import { ArrowUpDownIcon, ChevronDownIcon } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { h, ref } from 'vue'

import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    useVueTable,
} from "@tanstack/vue-table"

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
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
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
        get rowSelection() { return rowSelection.value },
        get expanded() { return expanded.value },
    },
})
</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" placeholder="Filter emails..."
                :model-value="table.getColumn('email')?.getFilterValue()?.toString() ?? ''"
                @update:model-value=" table.getColumn('email')?.setFilterValue($event)" />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Columns
                        <ChevronDownIcon class="w-4 h-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in table.getAllColumns().filter((column) => column.getCanHide())" 
                        :key="column.id"
                        class="capitalize" 
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
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                      <template v-for="row in table.getRowModel().rows" :key="row.id">
                        <TableRow :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                        <TableRow v-if="row.getIsExpanded()">
                          <TableCell :colspan="row.getAllCells().length">
                            {{ JSON.stringify(row.original) }}
                          </TableCell>
                        </TableRow>
                      </template>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colSpan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
```

### Add the expand action to the `DataTableDropDown.vue` component

```vue:line-numbers {12-14,34-36}
<script setup lang="ts">
import { MoreHorizontalIcon } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  payment: {
    id: string
  }
}>()

defineEmits<{
  (e: 'expand'): void
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontalIcon class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuItem @click="$emit('expand')">
        Expand
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

### Make rows expandable

Now we can update the action cell to add the expand control.

```vue:line-numbers {11}
<script setup lang="ts">
export const columns: ColumnDef<Payment>[] = [
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
        onExpand: row.toggleExpanded,
      }))
    },
  },
]
</script>

```

</Steps>

## Reusable Components

Here are some components you can use to build your data tables. This is from the [Table](/) demo.

### Column header

Make any column header sortable and hideable.

```vue:line-numbers
<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { type Task } from '../data/schema'
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from 'lucide-vue-next'

import { cn } from '@ui/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps {
  column: Column<Task, any>
  title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-secondary"
        >
          <span>{{ title }}</span>
          <ArrowDownIcon
            v-if="column.getIsSorted() === 'desc'"
            class="ml-2 h-4 w-4"
          />
          <ArrowUpIcon
            v-else-if=" column.getIsSorted() === 'asc'"
            class="ml-2 h-4 w-4"
          />
          <ChevronsUpDownIcon
            v-else
            class="ml-2 h-4 w-4"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeOffIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>

```

```ts:line-numbers
export const columns = [
  {
    accessorKey: "email",
    header: ({ column }) => (
        h(DataTableColumnHeader, {
            column: column,
            title: 'Email'
        })
    ),
  },
]
```

### Pagination

Add pagination controls to your table including page size and selection count.

```vue:line-numbers
<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { type Task } from '../data/schema'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps {
  table: Table<Task>
}
defineProps<DataTablePaginationProps>()
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <ChevronsLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <ChevronsRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

```

```vue
<DataTablePagination :table="table" />
```

### Column toggle

A component to toggle column visibility.

```vue:line-numbers
<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import { type Task } from '../data/schema'
import { Settings2Icon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<Task>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="hidden h-8 ml-auto lg:flex"
      >
        <Settings2Icon class="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :model-value="column.getIsVisible()"
        @update:model-value="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

```vue
<DataTableViewOptions :table="table" />
```
