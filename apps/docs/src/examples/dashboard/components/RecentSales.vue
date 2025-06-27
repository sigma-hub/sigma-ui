<script setup lang="ts">
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center">
      <Avatar size="sm">
        <template #fallback>
          <div class="text-primary/50">
            OM
          </div>
        </template>
      </Avatar>

      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Olivia Martin
        </p>
        <p class="text-sm text-muted-foreground">
          olivia.martin@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$1,999.00
      </div>
    </div>
    <div class="flex items-center">
      <Avatar size="sm">
        <template #fallback>
          <div class="text-primary/50">
            JL
          </div>
        </template>
      </Avatar>

      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Jackson Lee
        </p>
        <p class="text-sm text-muted-foreground">
          jackson.lee@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$39.00
      </div>
    </div>
    <div class="flex items-center">
      <Avatar size="sm">
        <template #fallback>
          <div class="text-primary/50">
            IN
          </div>
        </template>
      </Avatar>

      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Isabella Nguyen
        </p>
        <p class="text-sm text-muted-foreground">
          isabella.nguyen@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$299.00
      </div>
    </div>
    <div class="flex items-center">
      <Avatar size="sm">
        <template #fallback>
          <div class="text-primary/50">
            WK
          </div>
        </template>
      </Avatar>

      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          William Kim
        </p>
        <p class="text-sm text-muted-foreground">
          will@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$99.00
      </div>
    </div>
    <div class="flex items-center">
      <Avatar size="sm">
        <template #fallback>
          <div class="text-primary/50">
            SD
          </div>
        </template>
      </Avatar>

      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Sofia Davis
        </p>
        <p class="text-sm text-muted-foreground">
          sofia.davis@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$39.00
      </div>
    </div>
  </div>
</template>
