<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from '@ui/registry/css/ui/dialog';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Edit Profile
      </Button>
    </DialogTrigger>
    <DialogScrollContent class="example-sigma-ui-dialog__content">
      <DialogHeader>
        <DialogTitle>Modal title</DialogTitle>
        <DialogDescription>
          Here is modal with overlay scroll
        </DialogDescription>
      </DialogHeader>
      <div class="example-sigma-ui-dialog__scroll-content">
        <p>
          This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal, we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
        </p>
      </div>
      <DialogFooter>
        <Button type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>

<style>
.example-sigma-ui-dialog__content {
  max-width: 425px;
}

@media (width >= 640px) {
  .example-sigma-ui-dialog__content {
    max-width: 425px;
  }
}

.example-sigma-ui-dialog__scroll-content {
  display: grid;
  height: 300dvh;
  padding: 1rem 0;
  gap: 1rem;
}
</style>
