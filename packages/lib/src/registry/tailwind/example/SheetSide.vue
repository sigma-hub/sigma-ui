<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/registry/tailwind/ui/sheet';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

const username = ref('');
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <Sheet
      v-for="side in SHEET_SIDES"
      :key="side"
    >
      <SheetTrigger as-child>
        <Button variant="outline">
          {{ side }}
        </Button>
      </SheetTrigger>
      <SheetContent :side="side">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div class="grid gap-4 py-4">
          <div class="grid items-center grid-cols-4 gap-4">
            <Label
              for="name"
              class="text-right"
            >Name</Label>
            <Input
              id="name"
              v-model="username"
              class="col-span-3"
            />
          </div>
          <div class="grid items-center grid-cols-4 gap-4">
            <Label
              for="username"
              class="text-right"
            >Username</Label>
            <Input
              id="username"
              v-model="username"
              class="col-span-3"
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
