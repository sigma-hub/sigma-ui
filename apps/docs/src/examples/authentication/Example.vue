<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card } from '@ui/registry/tailwind/ui/card';
import SignupForm from '@ui/registry/tailwind/blocks/signup-quote/components/SignupForm.vue';
import {
  brandName,
  conjunctionLabel,
  description,
  dividerLabel,
  emailLabel,
  emailPlaceholder,
  emailSubmitLabel,
  githubLabel,
  googleLabel,
  loginHref,
  loginLabel,
  privacyHref,
  privacyLabel,
  quote,
  quoteAuthor,
  quoteAuthorRole,
  stats,
  termsHref,
  termsLabel,
  termsLead,
  title,
} from '@ui/registry/tailwind/blocks/signup-quote/data';

const quoteAuthorInitials = quoteAuthor
  .split(' ')
  .map(part => part.charAt(0))
  .join('');
</script>

<template>
  <Card class="h-screen overflow-hidden">
    <div class="relative grid h-full lg:grid-cols-2">
      <div class="relative hidden h-full flex-col overflow-hidden border-r bg-muted p-10 text-foreground lg:flex">
        <div
          class="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -right-24 -bottom-40 size-96 rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />
        <div class="relative flex items-center gap-2 text-lg font-medium">
          <span class="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4"
              aria-hidden="true"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </span>
          {{ brandName }}
        </div>
        <figure class="relative my-auto flex max-w-md flex-col gap-6 py-12">
          <blockquote class="text-2xl leading-snug font-medium tracking-tight text-balance">
            &ldquo;{{ quote }}&rdquo;
          </blockquote>
          <figcaption class="flex items-center gap-3">
            <span
              class="flex size-10 items-center justify-center rounded-full border bg-background text-sm font-medium"
              aria-hidden="true"
            >
              {{ quoteAuthorInitials }}
            </span>
            <span class="flex flex-col">
              <span class="text-sm font-medium">{{ quoteAuthor }}</span>
              <span class="text-sm text-muted-foreground">{{ quoteAuthorRole }}</span>
            </span>
          </figcaption>
        </figure>
        <dl class="relative grid grid-cols-3 gap-6 border-t pt-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col gap-1"
          >
            <dt class="text-sm text-muted-foreground">
              {{ stat.label }}
            </dt>
            <dd class="order-first text-2xl font-semibold tracking-tight">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="relative flex items-center justify-center px-6 py-16 lg:px-10">
        <Button
          as="a"
          variant="ghost"
          :href="loginHref"
          class="absolute top-4 right-4 md:top-8 md:right-8"
        >
          {{ loginLabel }}
        </Button>
        <div class="flex w-full max-w-sm flex-col gap-6">
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
            :google-label="googleLabel"
            :github-label="githubLabel"
          />
          <p class="px-6 text-center text-sm text-balance text-muted-foreground">
            {{ termsLead }}
            <a
              :href="termsHref"
              class="underline underline-offset-4 hover:text-primary"
            >{{ termsLabel }}</a>
            {{ conjunctionLabel }}
            <a
              :href="privacyHref"
              class="underline underline-offset-4 hover:text-primary"
            >{{ privacyLabel }}</a>.
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>
