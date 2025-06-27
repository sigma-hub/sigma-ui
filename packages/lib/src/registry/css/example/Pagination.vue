<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@ui/registry/css/ui/pagination';
import {
  Button,
} from '@ui/registry/css/ui/button';
</script>

<template>
  <Pagination
    v-slot="{ page }"
    :items-per-page="10"
    :total="100"
    :sibling-count="1"
    show-edges
    :default-page="2"
  >
    <PaginationList
      v-slot="{ items }"
      class="example-sigma-ui-pagination__list"
    >
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="example-sigma-ui-pagination__button"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="item.type"
          :index="index"
        />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>

<style>
.example-sigma-ui-pagination__list {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.example-sigma-ui-pagination__button {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}
</style>
