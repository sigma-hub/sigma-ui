<script setup lang="ts">
import { FolderOpenIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/tailwind/ui/empty';
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderOpenIcon />
      </EmptyMedia>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>Create a project to get started.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button>Create project</Button>
    </EmptyContent>
  </Empty>
</template>
