<script setup lang="ts">
import { ArrowUpRightIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/registry/tailwind/ui/table';
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
  <Card class="xl:col-span-2">
    <CardHeader class="flex flex-row items-center">
      <div class="grid gap-2">
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription>
          {{ description }}
        </CardDescription>
      </div>
      <Button
        as-child
        size="sm"
        class="ml-auto gap-1"
      >
        <a :href="actionHref">
          {{ actionLabel }}
          <ArrowUpRightIcon class="h-4 w-4" />
        </a>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{{ columns.customer }}</TableHead>
            <TableHead class="hidden xl:table-column">
              {{ columns.type }}
            </TableHead>
            <TableHead class="hidden xl:table-column">
              {{ columns.status }}
            </TableHead>
            <TableHead class="hidden xl:table-column">
              {{ columns.date }}
            </TableHead>
            <TableHead class="text-right">
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
              <div class="font-medium">
                {{ row.customerName }}
              </div>
              <div class="hidden text-sm text-muted-foreground md:inline">
                {{ row.email }}
              </div>
            </TableCell>
            <TableCell class="hidden xl:table-column">
              {{ row.type }}
            </TableCell>
            <TableCell class="hidden xl:table-column">
              <Badge
                class="text-xs"
                variant="outline"
              >
                {{ row.status }}
              </Badge>
            </TableCell>
            <TableCell class="hidden md:table-cell lg:hidden xl:table-column">
              {{ row.date }}
            </TableCell>
            <TableCell class="text-right">
              {{ row.amount }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
