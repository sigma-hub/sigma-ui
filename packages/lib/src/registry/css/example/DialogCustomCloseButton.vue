<script setup lang="ts">
import { CopyIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/registry/css/ui/dialog';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Share
      </Button>
    </DialogTrigger>
    <DialogContent class="example-sigma-ui-dialog__content">
      <DialogHeader>
        <DialogTitle>Share link</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <div class="example-sigma-ui-dialog__share">
        <div class="example-sigma-ui-dialog__share-input">
          <Label
            for="link"
            class="sr-only"
          >
            Link
          </Label>
          <Input
            id="link"
            model-value="https://sigma-ui.dev/docs/installation"
            read-only
          />
        </div>
        <Button
          type="submit"
          size="sm"
          class="example-sigma-ui-dialog__share-button"
        >
          <span class="sr-only">Copy</span>
          <CopyIcon class="example-sigma-ui-dialog__share-icon" />
        </Button>
      </div>
      <DialogFooter class="example-sigma-ui-dialog__footer">
        <DialogClose as-child>
          <Button
            type="button"
            variant="secondary"
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style>
.example-sigma-ui-dialog__content {
  max-width: 425px;
}

@media (min-width: 640px) {
  .example-sigma-ui-dialog__content {
    max-width: 425px;
  }
}

.example-sigma-ui-dialog__share {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.example-sigma-ui-dialog__share-input {
  display: grid;
  flex: 1;
  gap: 0.5rem;
}

.example-sigma-ui-dialog__share-button {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.example-sigma-ui-dialog__share-icon {
  width: 1rem;
  height: 1rem;
}

.example-sigma-ui-dialog__footer {
  justify-content: flex-start;
}

@media (min-width: 640px) {
  .example-sigma-ui-dialog__footer.sigma-ui-dialog-footer {
    justify-content: flex-start;
  }
}
</style>
