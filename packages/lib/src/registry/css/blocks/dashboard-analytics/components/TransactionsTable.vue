<script setup lang="ts">
import { ArrowUpRightIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/registry/css/ui/table';
import type { TransactionColumnLabels, TransactionRow } from '../data';

defineProps<{
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  columns: TransactionColumnLabels;
  rows: TransactionRow[];
}>();
</script>

<template>
  <Card class="dashboard-analytics__transactions">
    <CardHeader class="dashboard-analytics__transactions-header">
      <div class="dashboard-analytics__transactions-copy">
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription>
          {{ description }}
        </CardDescription>
      </div>
      <Button
        as-child
        size="sm"
        class="dashboard-analytics__view-all"
      >
        <a :href="actionHref">
          {{ actionLabel }}
          <ArrowUpRightIcon />
        </a>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{{ columns.customer }}</TableHead>
            <TableHead class="dashboard-analytics__col--detail">
              {{ columns.type }}
            </TableHead>
            <TableHead class="dashboard-analytics__col--detail">
              {{ columns.status }}
            </TableHead>
            <TableHead class="dashboard-analytics__col--detail">
              {{ columns.date }}
            </TableHead>
            <TableHead class="dashboard-analytics__amount">
              {{ columns.amount }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in rows"
            :key="row.id"
          >
            <TableCell>
              <div class="dashboard-analytics__customer">
                {{ row.customerName }}
              </div>
              <div class="dashboard-analytics__email">
                {{ row.email }}
              </div>
            </TableCell>
            <TableCell class="dashboard-analytics__col--detail">
              {{ row.type }}
            </TableCell>
            <TableCell class="dashboard-analytics__col--detail">
              <Badge
                class="dashboard-analytics__status"
                variant="outline"
              >
                {{ row.status }}
              </Badge>
            </TableCell>
            <TableCell class="dashboard-analytics__col--date">
              {{ row.date }}
            </TableCell>
            <TableCell class="dashboard-analytics__amount">
              {{ row.amount }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<style>
.dashboard-analytics__transactions .dashboard-analytics__transactions-header {
  flex-direction: row;
  align-items: center;
}

.dashboard-analytics__transactions-copy {
  display: grid;
  gap: 0.5rem;
}

.dashboard-analytics__transactions .dashboard-analytics__view-all {
  margin-left: auto;
  gap: 0.25rem;
}

.dashboard-analytics__view-all svg {
  width: 1rem;
  height: 1rem;
}

.dashboard-analytics__customer {
  font-weight: 500;
}

.dashboard-analytics__email {
  display: none;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(var(--muted-foreground));
}

@media (width >= 768px) {
  .dashboard-analytics__email {
    display: inline;
  }
}

.dashboard-analytics__col--detail,
.dashboard-analytics__col--date {
  display: none;
}

@media (width >= 768px) {
  .dashboard-analytics__col--date {
    display: table-cell;
  }
}

@media (width >= 1024px) {
  .dashboard-analytics__col--date {
    display: none;
  }
}

@media (width >= 1280px) {
  .dashboard-analytics__col--detail,
  .dashboard-analytics__col--date {
    display: table-column;
  }
}

.dashboard-analytics__transactions .dashboard-analytics__amount {
  text-align: right;
}

.dashboard-analytics__status {
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>
