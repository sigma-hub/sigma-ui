<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
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
            class="login-split-image__button"
          >
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
        src="/placeholder.svg"
        alt="Image"
        width="1920"
        height="1080"
        class="login-split-image__image"
      >
    </div>
  </div>
</template>

<style>
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
  padding: 3rem 0;
}

.login-split-image__form-container {
  width: 350px;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.login-split-image__header {
  display: grid;
  gap: 0.5rem;
  text-align: center;
}

.login-split-image__title {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.25rem;
}

.login-split-image__description {
  margin: 0 0 2rem;
  color: var(--muted-foreground);
  text-wrap: pretty;
}

.login-split-image__form {
  display: grid;
  gap: 1rem;
}

.login-split-image__field {
  display: grid;
  gap: 0.5rem;
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

.login-split-image__footer {
  margin-top: 1rem;
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

@media (width >= 1024px) {
  .login-split-image {
    min-height: 600px;
  }

  .login-split-image__image-side {
    display: flex;
    flex: 1 1 0%;
  }
}

@media (width >= 1280px) {
  .login-split-image {
    min-height: 800px;
  }
}
</style>
