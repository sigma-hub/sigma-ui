<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
import { Separator } from '@ui/registry/css/ui/separator';

defineProps<{
  emailLabel: string;
  emailPlaceholder: string;
  emailSubmitLabel: string;
  dividerLabel: string;
  googleLabel: string;
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
  <div class="signup-quote__form">
    <form
      class="signup-quote__fields"
      @submit="onSubmit"
    >
      <Label
        class="signup-quote__sr-only"
        for="email"
      >
        {{ emailLabel }}
      </Label>
      <Input
        id="email"
        :placeholder="emailPlaceholder"
        type="email"
        autocapitalize="none"
        autocomplete="email"
        autocorrect="off"
        :disabled="isLoading"
      />
      <Button
        type="submit"
        class="signup-quote__button"
        :is-loading="isLoading"
      >
        {{ emailSubmitLabel }}
      </Button>
    </form>
    <div class="signup-quote__divider">
      <Separator class="signup-quote__divider-line" />
      <span class="signup-quote__divider-label">
        {{ dividerLabel }}
      </span>
      <Separator class="signup-quote__divider-line" />
    </div>
    <div class="signup-quote__social">
      <Button
        variant="outline"
        type="button"
        class="signup-quote__button"
        :disabled="isLoading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="signup-quote__icon"
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
        {{ googleLabel }}
      </Button>
      <Button
        variant="outline"
        type="button"
        class="signup-quote__button"
        :disabled="isLoading"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="signup-quote__icon"
          aria-hidden="true"
        >
          <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3Z" />
        </svg>
        {{ githubLabel }}
      </Button>
    </div>
  </div>
</template>

<style>
@layer components {
  .signup-quote__form {
    display: grid;
    gap: calc(var(--spacing) * 6);
  }

  .signup-quote__fields,
  .signup-quote__social {
    display: grid;
    gap: calc(var(--spacing) * 3);
  }

  .sigma-ui-button.signup-quote__button {
    width: 100%;
  }

  .signup-quote__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .signup-quote__divider {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .sigma-ui-separator.signup-quote__divider-line {
    width: auto;
    flex: 1;
  }

  .signup-quote__divider-label {
    color: var(--muted-foreground);
    font-size: 0.75rem;
    letter-spacing: 0.025em;
    line-height: 1rem;
    text-transform: uppercase;
  }

  .signup-quote__sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border-width: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  @media (width >= 40rem) {
    .signup-quote__social {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}
</style>
