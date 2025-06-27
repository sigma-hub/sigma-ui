<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/registry/css/ui/table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="example-sigma-ui-table__head-invoice">
          Invoice
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="example-sigma-ui-table__head-amount">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="invoice in invoices"
        :key="invoice.invoice"
      >
        <TableCell class="example-sigma-ui-table__cell-invoice">
          {{ invoice.invoice }}
        </TableCell>
        <TableCell>{{ invoice.paymentStatus }}</TableCell>
        <TableCell>{{ invoice.paymentMethod }}</TableCell>
        <TableCell class="example-sigma-ui-table__cell-amount">
          {{ invoice.totalAmount }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style>
.example-sigma-ui-table__head-invoice {
  width: 6.25rem;
}

.example-sigma-ui-table__head-amount {
  text-align: right;
}

.example-sigma-ui-table__cell-invoice {
  font-weight: 500;
}

.example-sigma-ui-table__cell-amount {
  text-align: right;
}
</style>
