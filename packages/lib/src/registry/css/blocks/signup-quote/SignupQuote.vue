<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
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
  <div class="signup-quote">
    <Button
      as="a"
      variant="ghost"
      :href="loginHref"
      class="signup-quote__login"
    >
      {{ loginLabel }}
    </Button>
    <div class="signup-quote__panel">
      <div class="signup-quote__panel-backdrop" />
      <div class="signup-quote__brand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="signup-quote__logo"
          aria-hidden="true"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        {{ brandName }}
      </div>
      <blockquote class="signup-quote__quote">
        <p class="signup-quote__quote-text">
          &ldquo;{{ quote }}&rdquo;
        </p>
        <footer class="signup-quote__quote-author">
          {{ quoteAuthor }}
        </footer>
      </blockquote>
    </div>
    <div class="signup-quote__content">
      <div class="signup-quote__content-inner">
        <div class="signup-quote__intro">
          <h1 class="signup-quote__title">
            {{ title }}
          </h1>
          <p class="signup-quote__description">
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
        <p class="signup-quote__terms">
          {{ termsLead }}
          <a
            :href="termsHref"
            class="signup-quote__terms-link"
          >
            {{ termsLabel }}
          </a>
          {{ conjunctionLabel }}
          <a
            :href="privacyHref"
            class="signup-quote__terms-link"
          >
            {{ privacyLabel }}
          </a>
          .
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.signup-quote {
  position: relative;
  display: grid;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.signup-quote__login {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.signup-quote__panel {
  position: relative;
  display: none;
  height: 100%;
  flex-direction: column;
  padding: 2.5rem;
  background: var(--muted);
  color: #ffffff;
}

.signup-quote__panel-backdrop {
  position: absolute;
  background: #18181b;
  inset: 0;
}

.signup-quote__brand,
.signup-quote__quote {
  position: relative;
  z-index: 1;
}

.signup-quote__brand {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
}

.signup-quote__logo {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
}

.signup-quote__quote {
  margin: auto 0 0;
}

.signup-quote__quote-text,
.signup-quote__quote-author {
  margin: 0;
}

.signup-quote__quote-text {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.signup-quote__quote-author {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.signup-quote__content {
  padding: 1rem;
}

.signup-quote__content-inner {
  display: flex;
  width: 100%;
  max-width: 350px;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  gap: 1.5rem;
}

.signup-quote__intro {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.signup-quote__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 2rem;
}

.signup-quote__description,
.signup-quote__terms {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.signup-quote__terms {
  padding: 0 2rem;
  text-align: center;
}

.signup-quote__terms-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.signup-quote__terms-link:hover {
  color: var(--primary);
}

@media (width >= 768px) {
  .signup-quote__login {
    top: 2rem;
    right: 2rem;
  }
}

@media (width >= 1024px) {
  .signup-quote {
    padding: 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .signup-quote__panel {
    display: flex;
  }

  .dark .signup-quote__panel {
    border-right: 1px solid var(--border);
  }

  .signup-quote__content {
    padding: 2rem;
  }
}
</style>
