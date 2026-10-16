<script setup lang="ts">
import { ref } from 'vue';
import { GithubIcon, LoaderCircleIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';

defineProps<{
  emailLabel: string;
  emailPlaceholder: string;
  emailSubmitLabel: string;
  dividerLabel: string;
  githubLabel: string;
}>();

const isLoading = ref(false);

function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}
</script>

<template>
  <div class="grid gap-6">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <Label
          class="sr-only"
          for="email"
        >
          {{ emailLabel }}
        </Label>
        <Input
          id="email"
          :placeholder="emailPlaceholder"
          type="email"
          auto-capitalize="none"
          auto-complete="email"
          auto-correct="off"
          :disabled="isLoading"
        />
        <Button :disabled="isLoading">
          <LoaderCircleIcon
            v-if="isLoading"
            class="mr-2 size-4 animate-spin"
          />
          {{ emailSubmitLabel }}
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          {{ dividerLabel }}
        </span>
      </div>
    </div>
    <Button
      variant="outline"
      type="button"
      :disabled="isLoading"
    >
      <LoaderCircleIcon
        v-if="isLoading"
        class="mr-2 size-4 animate-spin"
      />
      <GithubIcon
        v-else
        class="mr-2 size-4"
      />
      {{ githubLabel }}
    </Button>
  </div>
</template>
