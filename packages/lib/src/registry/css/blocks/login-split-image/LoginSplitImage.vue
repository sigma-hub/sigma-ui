<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
import { placeholderImage } from './placeholder';
</script>

<template>
  <div class="login-split-image">
    <div class="login-split-image__form-side">
      <div class="login-split-image__form-container">
        <div class="login-split-image__header">
          <h1 class="login-split-image__title">
            Login
          </h1>
          <p class="login-split-image__description">
            Enter your credentials below to login to your account
          </p>
        </div>
        <div class="login-split-image__form">
          <div class="login-split-image__field">
            <Label for="email">Email</Label>
            <Input
              id="email"
              autocomplete="username"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="login-split-image__field">
            <div class="login-split-image__label-row">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="login-split-image__forgot-link"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              autocomplete="current-password"
              type="password"
              required
            />
          </div>
          <Button
            type="submit"
            class="login-split-image__button"
          >
            Login
          </Button>
          <Button
            variant="outline"
            type="button"
            class="login-split-image__button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="login-split-image__icon"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84Z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z"
              />
            </svg>
            Login with Google
          </Button>
        </div>
        <div class="login-split-image__footer">
          Don't have an account?
          <a
            href="#"
            class="login-split-image__link"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
    <div class="login-split-image__image-side">
      <img
        :src="placeholderImage"
        alt="Image"
        width="1920"
        height="1080"
        class="login-split-image__image"
      >
    </div>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .login-split-image {
    display: flex;
    width: 100%;
    height: 100vh;
  }

  .login-split-image__form-side {
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    justify-content: center;
    padding: calc(var(--spacing) * 12) 0;
  }

  .login-split-image__form-container {
    width: 350px;
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
  }

  .login-split-image__header {
    display: grid;
    gap: calc(var(--spacing) * 2);
    text-align: center;
  }

  .login-split-image__title {
    margin: 0;
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 2.25rem;
  }

  .login-split-image__description {
    margin: 0 0 calc(var(--spacing) * 8);
    color: var(--muted-foreground);
    text-wrap: pretty;
  }

  .login-split-image__form {
    display: grid;
    gap: calc(var(--spacing) * 4);
  }

  .login-split-image__field {
    display: grid;
    gap: calc(var(--spacing) * 2);
  }

  .login-split-image__label-row {
    display: flex;
    align-items: center;
  }

  .login-split-image__forgot-link {
    display: inline-block;
    margin-left: auto;
    color: inherit;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: underline;
  }

  .login-split-image__button {
    width: 100%;
  }

  .login-split-image__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .login-split-image__footer {
    margin-top: calc(var(--spacing) * 4);
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }

  .login-split-image__link {
    color: inherit;
    text-decoration: underline;
  }

  .login-split-image__image-side {
    display: none;
    background-color: var(--muted);
  }

  .login-split-image__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
  }

  .dark .login-split-image__image {
    filter: hue-rotate(180deg) invert(100%);
  }

  @media (width >= 64rem) {
    .login-split-image {
      min-height: 600px;
    }

    .login-split-image__image-side {
      display: flex;
      flex: 1 1 0%;
    }
  }

  @media (width >= 80rem) {
    .login-split-image {
      min-height: 800px;
    }
  }
}
</style>
