<script setup lang="ts">
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/registry/tailwind/ui/dialog';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Dialog with toast
      </Button>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-md"
      @interact-outside="event => {
        const target = event.target as HTMLElement;
        if (target?.closest('[data-sonner-toaster]')) { return event.preventDefault() }
      }"
    >
      <DialogHeader>
        <DialogTitle>Toast within a dialog</DialogTitle>
        <DialogDescription> Dialog with toast </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4">
        <Button
          size="sm"
          class="px-3"
          @click="
            () => {
              toast('Event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
                action: {
                  label: 'Undo',
                  onClick: () => console.log('Undo'),
                },
              });
            }
          "
        >
          Toast
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
