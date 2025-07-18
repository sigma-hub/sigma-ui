<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/registry/css/ui/sheet';
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">
        Open
      </Button>
    </SheetTrigger>
    <SheetContent class="example-sigma-ui-sheet">
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div class="example-sigma-ui-sheet__form">
        <div class="example-sigma-ui-sheet__form-row">
          <Label
            for="name"
            class="example-sigma-ui-sheet__label"
          >
            Name
          </Label>
          <Input
            id="name"
            value="Pedro Duarte"
            class="example-sigma-ui-sheet__input"
          />
        </div>
        <div class="example-sigma-ui-sheet__form-row">
          <Label
            for="username"
            class="example-sigma-ui-sheet__label"
          >
            Username
          </Label>
          <Input
            id="username"
            value="@peduarte"
            class="example-sigma-ui-sheet__input"
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit">
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<style>
.example-sigma-ui-sheet {
  padding: 1.5rem;
}

.example-sigma-ui-sheet__form {
  display: grid;
  padding: 1rem 0;
  gap: 1rem;
}

.example-sigma-ui-sheet__form-row {
  display: grid;
  align-items: center;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

.example-sigma-ui-sheet__label {
  text-align: right;
}

.example-sigma-ui-sheet__input {
  grid-column: span 3;
}
</style>
