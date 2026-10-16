<script setup lang="ts">
import { PodcastIcon } from 'lucide-vue-next';
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
  <div class="music-library__empty">
    <div class="music-library__empty-content">
      <PodcastIcon class="music-library__empty-icon" />
      <h3 class="music-library__empty-title">
        {{ title }}
      </h3>
      <p class="music-library__empty-description">
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
          <div class="music-library__dialog-fields">
            <div class="music-library__dialog-field">
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

<style>
.music-library__empty {
  display: flex;
  height: 450px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--border);
  border-radius: calc(var(--radius) - 2px);
}

.music-library__empty-content {
  display: flex;
  max-width: 420px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
}

.music-library__empty-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--muted-foreground);
}

.music-library__empty-title {
  margin: 1rem 0 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}

.music-library__empty-description {
  margin: 0.5rem 0 1rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.music-library__dialog-fields {
  display: grid;
  padding: 1rem 0;
  gap: 1rem;
}

.music-library__dialog-field {
  display: grid;
  gap: 0.5rem;
}
</style>
