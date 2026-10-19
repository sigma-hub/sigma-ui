<script setup lang="ts">
import { ArchiveIcon, ArrowLeftIcon, ClockIcon, MoreHorizontalIcon, TagIcon, Trash2Icon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { ButtonGroup } from '@ui/registry/tailwind/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
</script>

<template>
  <ButtonGroup>
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon"
        aria-label="Go back"
      >
        <ArrowLeftIcon class="size-4" />
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
            <MoreHorizontalIcon class="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <ArchiveIcon class="mr-2 size-4" />
            Move to archive
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ClockIcon class="mr-2 size-4" />
            Remind me later
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TagIcon class="mr-2 size-4" />
            Add label
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-destructive">
            <Trash2Icon class="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  </ButtonGroup>
</template>
