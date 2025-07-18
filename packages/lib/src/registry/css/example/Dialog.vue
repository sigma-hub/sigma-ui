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
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Edit Profile
      </Button>
    </DialogTrigger>
    <DialogContent class="example-sigma-ui-dialog__content">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="example-sigma-ui-dialog__form">
        <div class="example-sigma-ui-dialog__form-row">
          <Label
            for="name"
            class="example-sigma-ui-dialog__label"
          >
            Name
          </Label>
          <Input
            id="name"
            value="Pedro Duarte"
            class="example-sigma-ui-dialog__input"
          />
        </div>
        <div class="example-sigma-ui-dialog__form-row">
          <Label
            for="username"
            class="example-sigma-ui-dialog__label"
          >
            Username
          </Label>
          <Input
            id="username"
            value="@peduarte"
            class="example-sigma-ui-dialog__input"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
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

.example-sigma-ui-dialog__form {
  display: grid;
  padding: 1rem 0;
  gap: 1rem;
}

.example-sigma-ui-dialog__form-row {
  display: grid;
  align-items: center;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

.example-sigma-ui-dialog__label {
  text-align: right;
}

.example-sigma-ui-dialog__input {
  grid-column: span 3 / span 3;
}
</style>
