<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@ui/utils';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
import { GithubIcon, LoaderCircleIcon } from 'lucide-vue-next';

const isLoading = ref(false);

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label
            class="sr-only"
            for="email"
          >
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <LoaderCircleIcon
            v-if="isLoading"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Sign In with Email
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
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
        class="mr-2 h-4 w-4 animate-spin"
      />
      <GithubIcon
        v-else
        class="mr-2 h-4 w-4"
      />
      GitHub
    </Button>
  </div>
</template>
