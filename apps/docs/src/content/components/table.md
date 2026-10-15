---
title: Table
description: A responsive table component.
source: table
---

## Preview

<ComponentPreview name="Table" />

## Installation

<ComponentInstall name="table" />

## Usage

```vue
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead class="text-right">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>INV001</TableCell>
        <TableCell class="text-right">
          $250.00
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

- `Table` wraps a native `<table>` in a container that scrolls horizontally on small screens.
- Use `TableFooter` for totals and `TableEmpty` to render a full-width row when there is no data.

### Data Table

You can use the `<Table />` component with [@tanstack/vue-table](https://tanstack.com/table/v8) to build more complex data tables with sorting, filtering and pagination.

See examples on the [Data Table](./data-table) page.

## Examples

### Basic

<ComponentPreview name="Table" />

### Footer and Empty State

Use `TableFooter` for a summary row, and `TableEmpty` with `colspan` set to the number of columns when there are no rows.

```vue
<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead class="text-right">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableEmpty
        v-if="!invoices.length"
        :colspan="2"
      >
        No invoices.
      </TableEmpty>
      <TableRow
        v-for="invoice in invoices"
        :key="invoice.id"
      >
        <TableCell>{{ invoice.id }}</TableCell>
        <TableCell class="text-right">
          {{ invoice.amount }}
        </TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell>Total</TableCell>
        <TableCell class="text-right">
          $2,500.00
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>
```

## API Reference

<!-- @include: @/content/meta/table.md -->

## Accessibility

Renders native `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements, so screen readers can announce rows, columns, and headers. Use `TableCaption` to describe the table. The table has no keyboard interactions of its own.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next focusable element inside the table, such as a button or a link in a cell. |
