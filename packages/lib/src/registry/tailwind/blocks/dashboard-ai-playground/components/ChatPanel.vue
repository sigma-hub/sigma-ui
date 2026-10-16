<script setup lang="ts">
import { CornerDownLeftIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/registry/tailwind/ui/tooltip';
import { chatActions } from '../data';
</script>

<template>
  <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
    <Badge
      variant="outline"
      class="absolute right-3 top-3"
    >
      Output
    </Badge>
    <div class="flex-1" />
    <form class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Label
        for="message"
        class="sr-only"
      >
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div class="flex items-center p-3 pt-0">
        <TooltipProvider
          v-for="action in chatActions"
          :key="action.label"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
              >
                <component
                  :is="action.icon"
                  class="size-4"
                />
                <span class="sr-only">{{ action.label }}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {{ action.tooltip }}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          type="submit"
          size="sm"
          class="ml-auto gap-1.5"
        >
          Send Message
          <CornerDownLeftIcon class="size-3.5" />
        </Button>
      </div>
    </form>
  </div>
</template>
