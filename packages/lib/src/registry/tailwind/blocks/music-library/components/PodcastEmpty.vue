<script setup lang="ts">
import { PodcastIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/registry/tailwind/ui/dialog';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';

defineProps<{
  title: string;
  description: string;
  addLabel: string;
  dialogTitle: string;
  dialogDescription: string;
  urlLabel: string;
  urlPlaceholder: string;
  importLabel: string;
}>();
</script>

<template>
  <div class="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
    <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <PodcastIcon class="size-10 text-muted-foreground" />
      <h3 class="mt-4 text-lg font-semibold">
        {{ title }}
      </h3>
      <p class="mt-2 mb-4 text-sm text-muted-foreground">
        {{ description }}
      </p>
      <Dialog>
        <DialogTrigger as-child>
          <Button size="sm">
            {{ addLabel }}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ dialogTitle }}</DialogTitle>
            <DialogDescription>
              {{ dialogDescription }}
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid gap-2">
              <Label for="podcast-url">{{ urlLabel }}</Label>
              <Input
                id="podcast-url"
                :placeholder="urlPlaceholder"
              />
            </div>
          </div>
          <DialogFooter>
            <Button>{{ importLabel }}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
