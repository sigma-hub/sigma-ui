<script setup lang="ts">
import { ArchiveIcon, ArrowLeftIcon, ClockIcon, MoreHorizontalIcon, TagIcon, Trash2Icon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { ButtonGroup } from '@ui/registry/css/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
</script>

<template>
  <ButtonGroup>
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon"
        aria-label="Go back"
      >
        <ArrowLeftIcon class="example-button-group__icon" />
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button variant="outline">
        Archive
      </Button>
      <Button variant="outline">
        Report
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button variant="outline">
        Snooze
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            aria-label="More options"
          >
            <MoreHorizontalIcon class="example-button-group__icon" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <ArchiveIcon class="example-button-group__icon example-button-group__icon--menu" />
            Move to archive
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ClockIcon class="example-button-group__icon example-button-group__icon--menu" />
            Remind me later
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TagIcon class="example-button-group__icon example-button-group__icon--menu" />
            Add label
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="example-button-group__destructive-item">
            <Trash2Icon class="example-button-group__icon example-button-group__icon--menu" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  </ButtonGroup>
</template>

<style>
.example-button-group__icon {
  width: 1rem;
  height: 1rem;
}

.example-button-group__icon--menu {
  margin-right: 0.5rem;
}

.example-button-group__destructive-item {
  color: var(--destructive);
}
</style>
