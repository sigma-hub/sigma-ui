<script setup lang="ts">
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/registry/css/ui/dialog';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Dialog with toast
      </Button>
    </DialogTrigger>
    <DialogContent
      class="example-sigma-ui-toaster-dialog"
      @interact-outside="event => {
        const target = event.target as HTMLElement;
        if (target?.closest('[data-sonner-toaster]')) { return event.preventDefault() }
      }"
    >
      <DialogHeader>
        <DialogTitle>Toast within a dialog</DialogTitle>
        <DialogDescription>Dialog with toast</DialogDescription>
      </DialogHeader>
      <div class="example-sigma-ui-toaster-dialog__actions">
        <Button
          size="sm"
          class="example-sigma-ui-toaster-dialog__button"
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

<style>
@layer components {
  .example-sigma-ui-toaster-dialog {
    max-width: 28rem;
  }

  .example-sigma-ui-toaster-dialog__actions {
    display: grid;
    gap: calc(var(--spacing) * 4);
  }

  .example-sigma-ui-toaster-dialog__button {
    padding-right: calc(var(--spacing) * 3);
    padding-left: calc(var(--spacing) * 3);
  }

  @media (width >= 40rem) {
    .example-sigma-ui-toaster-dialog {
      max-width: 28rem;
    }
  }
}
</style>
