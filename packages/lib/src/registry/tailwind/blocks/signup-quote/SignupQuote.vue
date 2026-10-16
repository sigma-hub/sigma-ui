<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import SignupForm from './components/SignupForm.vue';
import {
  brandName,
  conjunctionLabel,
  description,
  dividerLabel,
  emailLabel,
  emailPlaceholder,
  emailSubmitLabel,
  githubLabel,
  loginHref,
  loginLabel,
  privacyHref,
  privacyLabel,
  quote,
  quoteAuthor,
  termsHref,
  termsLabel,
  termsLead,
  title,
} from './data';
</script>

<template>
  <div class="relative grid min-h-screen items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    <Button
      as="a"
      variant="ghost"
      :href="loginHref"
      class="absolute top-4 right-4 md:top-8 md:right-8"
    >
      {{ loginLabel }}
    </Button>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2 size-6"
          aria-hidden="true"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        {{ brandName }}
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;{{ quote }}&rdquo;
          </p>
          <footer class="text-sm">
            {{ quoteAuthor }}
          </footer>
        </blockquote>
      </div>
    </div>
    <div class="p-4 lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
        <div class="flex flex-col gap-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            {{ title }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ description }}
          </p>
        </div>
        <SignupForm
          :email-label="emailLabel"
          :email-placeholder="emailPlaceholder"
          :email-submit-label="emailSubmitLabel"
          :divider-label="dividerLabel"
          :github-label="githubLabel"
        />
        <p class="px-8 text-center text-sm text-muted-foreground">
          {{ termsLead }}
          <a
            :href="termsHref"
            class="underline underline-offset-4 hover:text-primary"
          >
            {{ termsLabel }}
          </a>
          {{ conjunctionLabel }}
          <a
            :href="privacyHref"
            class="underline underline-offset-4 hover:text-primary"
          >
            {{ privacyLabel }}
          </a>
          .
        </p>
      </div>
    </div>
  </div>
</template>
