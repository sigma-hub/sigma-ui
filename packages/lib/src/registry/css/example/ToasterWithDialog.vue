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
.example-sigma-ui-toaster-dialog {
  max-width: 28rem;
}

.example-sigma-ui-toaster-dialog__actions {
  display: grid;
  gap: 1rem;
}

.example-sigma-ui-toaster-dialog__button {
  padding-right: 0.75rem;
  padding-left: 0.75rem;
}

@media (width >= 640px) {
  .example-sigma-ui-toaster-dialog {
    max-width: 28rem;
  }
}
</style>
