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
} from './data';

const quoteAuthorInitials = quoteAuthor
  .split(' ')
  .map(part => part.charAt(0))
  .join('');
</script>

<template>
  <div class="signup-quote">
    <div class="signup-quote__panel">
      <div
        class="signup-quote__glow signup-quote__glow--top"
        aria-hidden="true"
      />
      <div
        class="signup-quote__glow signup-quote__glow--bottom"
        aria-hidden="true"
      />
      <div class="signup-quote__brand">
        <span class="signup-quote__logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="signup-quote__logo-icon"
            aria-hidden="true"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
        </span>
        {{ brandName }}
      </div>
      <figure class="signup-quote__quote">
        <blockquote class="signup-quote__quote-text">
          &ldquo;{{ quote }}&rdquo;
        </blockquote>
        <figcaption class="signup-quote__author">
          <span
            class="signup-quote__avatar"
            aria-hidden="true"
          >
            {{ quoteAuthorInitials }}
          </span>
          <span class="signup-quote__author-details">
            <span class="signup-quote__author-name">{{ quoteAuthor }}</span>
            <span class="signup-quote__author-role">{{ quoteAuthorRole }}</span>
          </span>
        </figcaption>
      </figure>
      <dl class="signup-quote__stats">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="signup-quote__stat"
        >
          <dt class="signup-quote__stat-label">
            {{ stat.label }}
          </dt>
          <dd class="signup-quote__stat-value">
            {{ stat.value }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="signup-quote__content">
      <Button
        as="a"
        variant="ghost"
        :href="loginHref"
        class="signup-quote__login"
      >
        {{ loginLabel }}
      </Button>
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
          :google-label="googleLabel"
          :github-label="githubLabel"
        />
        <p class="signup-quote__terms">
          {{ termsLead }}
          <a
            :href="termsHref"
            class="signup-quote__terms-link"
          >{{ termsLabel }}</a>
          {{ conjunctionLabel }}
          <a
            :href="privacyHref"
            class="signup-quote__terms-link"
          >{{ privacyLabel }}</a>.
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
}

.signup-quote__panel {
  position: relative;
  display: none;
  overflow: hidden;
  height: 100%;
  flex-direction: column;
  padding: calc(var(--spacing) * 10);
  border-right: 1px solid var(--border);
  background: var(--muted);
  color: var(--foreground);
}

.signup-quote__glow {
  position: absolute;
  width: calc(var(--spacing) * 96);
  height: calc(var(--spacing) * 96);
  border-radius: 9999px;
  filter: blur(64px);
  pointer-events: none;
}

.signup-quote__glow--top {
  top: calc(var(--spacing) * -32);
  left: calc(var(--spacing) * -32);
  background: color-mix(in oklch, var(--primary) 10%, transparent);
}

.signup-quote__glow--bottom {
  right: calc(var(--spacing) * -24);
  bottom: calc(var(--spacing) * -40);
  background: color-mix(in oklch, var(--primary) 5%, transparent);
}

.signup-quote__brand,
.signup-quote__quote,
.signup-quote__stats {
  position: relative;
}

.signup-quote__brand {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
  gap: calc(var(--spacing) * 2);
}

.signup-quote__logo {
  display: flex;
  width: calc(var(--spacing) * 8);
  height: calc(var(--spacing) * 8);
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius) - 2px);
  background: var(--primary);
  color: var(--primary-foreground);
}

.signup-quote__logo-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}

.signup-quote__quote {
  display: flex;
  max-width: 28rem;
  flex-direction: column;
  padding: calc(var(--spacing) * 12) 0;
  margin: auto 0;
  gap: calc(var(--spacing) * 6);
}

.signup-quote__quote-text {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.375;
  text-wrap: balance;
}

.signup-quote__stats {
  display: grid;
  padding-top: calc(var(--spacing) * 6);
  border-top: 1px solid var(--border);
  margin: 0;
  gap: calc(var(--spacing) * 6);
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.signup-quote__stat {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
}

.signup-quote__stat-label {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.signup-quote__stat-value {
  order: -1;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 2rem;
}

.signup-quote__author {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 3);
}

.signup-quote__avatar {
  display: flex;
  width: calc(var(--spacing) * 10);
  height: calc(var(--spacing) * 10);
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 9999px;
  background: var(--background);
  font-size: 0.875rem;
  font-weight: 500;
}

.signup-quote__author-details {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.signup-quote__author-name {
  font-weight: 500;
}

.signup-quote__author-role {
  color: var(--muted-foreground);
}

.signup-quote__content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing) * 16) calc(var(--spacing) * 6);
}

.signup-quote__login {
  position: absolute;
  top: calc(var(--spacing) * 4);
  right: calc(var(--spacing) * 4);
}

.signup-quote__content-inner {
  display: flex;
  width: 100%;
  max-width: 24rem;
  flex-direction: column;
  gap: calc(var(--spacing) * 6);
}

.signup-quote__intro {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
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
  padding: 0 calc(var(--spacing) * 6);
  text-align: center;
  text-wrap: balance;
}

.signup-quote__terms-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.signup-quote__terms-link:hover {
  color: var(--primary);
}

@media (width >= 48rem) {
  .signup-quote__login {
    top: calc(var(--spacing) * 8);
    right: calc(var(--spacing) * 8);
  }
}

@media (width >= 64rem) {
  .signup-quote {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .signup-quote__panel {
    display: flex;
  }

  .signup-quote__content {
    padding: calc(var(--spacing) * 16) calc(var(--spacing) * 10);
  }
}
</style>
