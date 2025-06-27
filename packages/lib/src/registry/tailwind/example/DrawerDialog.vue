<script lang="ts" setup>
import { ref } from 'vue';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/registry/tailwind/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@ui/registry/tailwind/ui/drawer';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Input } from '@ui/registry/tailwind/ui/input';

const [UseTemplate, GridForm] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px)');

const isOpen = ref(false);
</script>

<template>
  <UseTemplate>
    <form class="grid items-start gap-4 px-4">
      <div class="grid gap-2">
        <Label html-for="email">Email</Label>
        <Input
          id="email"
          type="email"
          model-value="sigma-ui@example.com"
        />
      </div>
      <div class="grid gap-2">
        <Label html-for="username">Username</Label>
        <Input
          id="username"
          model-value="sigma-ui"
        />
      </div>
      <Button type="submit">
        Save changes
      </Button>
    </form>
  </UseTemplate>

  <Dialog
    v-if="isDesktop"
    v-model:open="isOpen"
  >
    <DialogTrigger as-child>
      <Button variant="outline">
        Edit Profile
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <GridForm />
    </DialogContent>
  </Dialog>

  <Drawer
    v-else
    v-model:open="isOpen"
  >
    <DrawerTrigger as-child>
      <Button variant="outline">
        Edit Profile
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you're done.
        </DrawerDescription>
      </DrawerHeader>
      <GridForm />
      <DrawerFooter class="pt-2">
        <DrawerClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
