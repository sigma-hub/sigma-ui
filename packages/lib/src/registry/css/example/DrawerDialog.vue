<script lang="ts" setup>
import { ref } from 'vue';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { Button } from '@ui/registry/css/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/registry/css/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@ui/registry/css/ui/drawer';
import { Label } from '@ui/registry/css/ui/label';
import { Input } from '@ui/registry/css/ui/input';

const [UseTemplate, GridForm] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px)');

const isOpen = ref(false);
</script>

<template>
  <UseTemplate>
    <form class="example-sigma-ui-drawer-dialog__form">
      <div class="example-sigma-ui-drawer-dialog__field">
        <Label html-for="email">Email</Label>
        <Input
          id="email"
          type="email"
          model-value="sigma-ui@example.com"
        />
      </div>
      <div class="example-sigma-ui-drawer-dialog__field">
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
    <DialogContent class="example-sigma-ui-drawer-dialog__content">
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
      <DrawerHeader class="example-sigma-ui-drawer-dialog__header">
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you're done.
        </DrawerDescription>
      </DrawerHeader>
      <GridForm />
      <DrawerFooter class="example-sigma-ui-drawer-dialog__footer">
        <DrawerClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<style>
.example-sigma-ui-drawer-dialog__form {
  display: grid;
  align-items: start;
  gap: 1rem;
  padding: 0 1rem;
}

.example-sigma-ui-drawer-dialog__field {
  display: grid;
  gap: 0.5rem;
}

.example-sigma-ui-drawer-dialog__content {
  max-width: 425px;
}

@media (min-width: 640px) {
  .example-sigma-ui-drawer-dialog__content {
    max-width: 425px;
  }
}

.example-sigma-ui-drawer-dialog__header {
  text-align: left;
}

.example-sigma-ui-drawer-dialog__footer {
  padding-top: 0.5rem;
}
</style>
