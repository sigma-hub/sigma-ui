<script lang="ts">
export const description
  = 'A login page with two columns. The first column has the login form with email and password. There\'s a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.';
export const iframeHeight = '800px';
export const containerClass = 'w-full h-full p-4 lg:p-0';
</script>

<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <div class="w-full h-[100vh] flex lg:min-h-[600px] xl:min-h-[800px]">
    <div class="flex-1 flex items-center justify-center py-12">
      <div class="mx-auto w-[350px] max-w-full">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            Login
          </h1>
          <p class="mb-8 text-pretty text-muted-foreground">
            Enter your credentials below to login to your account
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
            />
          </div>
          <Button
            type="submit"
            class="w-full"
          >
            Login
          </Button>
          <Button
            variant="outline"
            class="w-full"
          >
            Login with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a
            href="#"
            class="underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
    <div class="hidden lg:flex lg:flex-1 bg-muted">
      <img
        src="/placeholder.svg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:invert dark:hue-rotate-180 select-none"
      >
    </div>
  </div>
</template>
