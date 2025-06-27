<script lang="ts" setup>
import { ChevronDownIcon, SlashIcon } from 'lucide-vue-next';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/registry/css/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger class="example-sigma-ui-breadcrumb__trigger">
            Components
            <ChevronDownIcon class="example-sigma-ui-breadcrumb__trigger-icon" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Themes</DropdownMenuItem>
            <DropdownMenuItem>GitHub</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<style>
.example-sigma-ui-breadcrumb__trigger {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.example-sigma-ui-breadcrumb__trigger-icon {
  width: 1rem;
  height: 1rem;
}
</style>
