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
  columnLabels: TransactionColumnLabels;
  rows: TransactionRow[];
}>();
</script>

<template>
  <Card>
    <CardHeader class="dashboard-analytics__transactions-header">
      <div class="dashboard-analytics__transactions-heading">
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
          <ArrowUpRightIcon class="dashboard-analytics__icon-sm" />
        </a>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{{ columnLabels.customer }}</TableHead>
            <TableHead class="dashboard-analytics__column--optional">
              {{ columnLabels.type }}
            </TableHead>
            <TableHead class="dashboard-analytics__column--optional">
              {{ columnLabels.status }}
            </TableHead>
            <TableHead class="dashboard-analytics__column--optional">
              {{ columnLabels.date }}
            </TableHead>
            <TableHead class="dashboard-analytics__amount">
              {{ columnLabels.amount }}
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
            <TableCell class="dashboard-analytics__column--optional">
              {{ row.type }}
            </TableCell>
            <TableCell class="dashboard-analytics__column--optional">
              <Badge
                class="dashboard-analytics__status"
                variant="outline"
              >
                {{ row.status }}
              </Badge>
            </TableCell>
            <TableCell class="dashboard-analytics__date">
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
.dashboard-analytics__transactions-header.dashboard-analytics__transactions-header {
  flex-direction: row;
  align-items: center;
}

.dashboard-analytics__transactions-heading {
  display: grid;
  gap: 0.5rem;
}

.dashboard-analytics__view-all.dashboard-analytics__view-all {
  margin-left: auto;
  gap: 0.25rem;
}

.dashboard-analytics__icon-sm {
  width: 1rem;
  height: 1rem;
}

.dashboard-analytics__customer {
  font-weight: 500;
}

.dashboard-analytics__email {
  display: none;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.dashboard-analytics__column--optional {
  display: none;
}

.dashboard-analytics__date {
  display: none;
}

.dashboard-analytics__amount.dashboard-analytics__amount {
  text-align: right;
}

.dashboard-analytics__status.dashboard-analytics__status {
  font-size: 0.75rem;
  line-height: 1rem;
}

@media (width >= 768px) {
  .dashboard-analytics__email {
    display: inline;
  }

  .dashboard-analytics__date.dashboard-analytics__date {
    display: table-cell;
  }
}

@media (width >= 1024px) {
  .dashboard-analytics__date.dashboard-analytics__date {
    display: none;
  }
}

@media (width >= 1280px) {
  .dashboard-analytics__column--optional.dashboard-analytics__column--optional,
  .dashboard-analytics__date.dashboard-analytics__date {
    display: table-column;
  }
}
</style>
