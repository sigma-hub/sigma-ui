<script setup lang="ts">
import { ref } from 'vue';
import { GithubIcon, LoaderCircleIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';

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
  <div class="signup-quote__form">
    <form @submit="onSubmit">
      <div class="signup-quote__fields">
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
          auto-capitalize="none"
          auto-complete="email"
          auto-correct="off"
          :disabled="isLoading"
        />
        <Button :disabled="isLoading">
          <LoaderCircleIcon
            v-if="isLoading"
            class="signup-quote__spinner signup-quote__spinner--active"
          />
          {{ emailSubmitLabel }}
        </Button>
      </div>
    </form>
    <div class="signup-quote__divider">
      <span class="signup-quote__divider-line" />
      <span class="signup-quote__divider-label">
        {{ dividerLabel }}
      </span>
    </div>
    <Button
      variant="outline"
      type="button"
      :disabled="isLoading"
    >
      <LoaderCircleIcon
        v-if="isLoading"
        class="signup-quote__spinner signup-quote__spinner--active"
      />
      <GithubIcon
        v-else
        class="signup-quote__spinner"
      />
      {{ githubLabel }}
    </Button>
  </div>
</template>

<style>
.signup-quote__form,
.signup-quote__fields {
  display: grid;
  gap: 1.5rem;
}

.signup-quote__fields {
  gap: 0.5rem;
}

.signup-quote__spinner {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.signup-quote__spinner--active {
  animation: signup-quote-spin 1s linear infinite;
}

.signup-quote__divider {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-quote__divider-line {
  position: absolute;
  width: 100%;
  border-top: 1px solid var(--border);
}

.signup-quote__divider-label {
  position: relative;
  padding: 0 0.5rem;
  background: var(--background);
  color: var(--muted-foreground);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
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

@keyframes signup-quote-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
