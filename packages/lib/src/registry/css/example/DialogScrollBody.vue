<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
    <DialogContent class="example-sigma-ui-dialog-scroll__content example-sigma-ui-dialog-scroll__content--scroll">
      <DialogHeader class="example-sigma-ui-dialog-scroll__header">
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="example-sigma-ui-dialog-scroll__body">
        <div class="example-sigma-ui-dialog-scroll__scroll-content">
          <p>
            This is some placeholder content to show the scrolling behavior for modals. We use repeated line breaks to demonstrate how content can exceed minimum inner height, thereby showing inner scrolling. When content becomes longer than the predefined max-height of modal, content will be cropped and scrollable within the modal.
          </p>

          <p>This content should appear at the bottom after you scroll.</p>
        </div>
      </div>
      <DialogFooter class="example-sigma-ui-dialog-scroll__footer">
        <Button type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style>
.example-sigma-ui-dialog-scroll__content {
  max-width: 425px;
}

.example-sigma-ui-dialog-scroll__content--scroll {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  padding: 0;
  max-height: 90dvh;
}

@media (min-width: 640px) {
  .example-sigma-ui-dialog-scroll__content {
    max-width: 425px;
  }
}

.example-sigma-ui-dialog-scroll__header {
  padding: 1.5rem;
  padding-bottom: 0;
}

.example-sigma-ui-dialog-scroll__body {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  overflow-y: auto;
}

.example-sigma-ui-dialog-scroll__scroll-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300dvh;
}

.example-sigma-ui-dialog-scroll__footer {
  padding: 1.5rem;
  padding-top: 0;
}
</style>
