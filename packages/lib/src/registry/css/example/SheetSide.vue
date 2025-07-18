<script setup lang="ts">
import { ref } from 'vue';
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

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

const username = ref('');
</script>

<template>
  <div class="example-sigma-ui-sheet-side">
    <Sheet
      v-for="side in SHEET_SIDES"
      :key="side"
    >
      <SheetTrigger as-child>
        <Button variant="outline">
          {{ side }}
        </Button>
      </SheetTrigger>
      <SheetContent
        :side="side"
        class="example-sigma-ui-sheet-side__content"
      >
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div class="example-sigma-ui-sheet-side__form">
          <div class="example-sigma-ui-sheet-side__form-row">
            <Label
              for="name"
              class="example-sigma-ui-sheet-side__label"
            >Name</Label>
            <Input
              id="name"
              v-model="username"
              class="example-sigma-ui-sheet-side__input"
            />
          </div>
          <div class="example-sigma-ui-sheet-side__form-row">
            <Label
              for="username"
              class="example-sigma-ui-sheet-side__label"
            >Username</Label>
            <Input
              id="username"
              v-model="username"
              class="example-sigma-ui-sheet-side__input"
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
  </div>
</template>

<style>
.example-sigma-ui-sheet-side {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
}

.example-sigma-ui-sheet-side__content {
  padding: 1.5rem;
}

.example-sigma-ui-sheet-side__form {
  display: grid;
  padding: 1rem 0;
  gap: 1rem;
}

.example-sigma-ui-sheet-side__form-row {
  display: grid;
  align-items: center;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

.example-sigma-ui-sheet-side__label {
  text-align: right;
}

.example-sigma-ui-sheet-side__input {
  grid-column: span 3;
}
</style>
