<script setup lang="ts">
import { CalendarDaysIcon } from 'lucide-vue-next';
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@ui/registry/tailwind/ui/hover-card';
</script>

<template>
  <HoverCard
    :open-delay="0"
    :close-delay="100"
  >
    <HoverCardTrigger as-child>
      <Button variant="link">
        @vuejs
      </Button>
    </HoverCardTrigger>
    <HoverCardContent class="w-80">
      <div class="flex justify-between space-x-4">
        <Avatar size="sm" />

        <div class="space-y-1">
          <h4 class="text-sm font-semibold">
            @vuejs
          </h4>
          <p class="text-sm">
            Progressive JavaScript framework for building modern web interfaces.
          </p>
          <div class="flex items-center pt-2">
            <CalendarDaysIcon class="mr-2 h-4 w-4 opacity-70" />
            <span class="text-xs text-muted-foreground">
              Joined January 2014
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
