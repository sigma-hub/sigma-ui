<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <Card class="signup-card__card">
    <CardHeader>
      <CardTitle class="signup-card__title">
        Sign Up
      </CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="signup-card__form">
        <div class="signup-card__name-row">
          <div class="signup-card__field">
            <Label for="first-name">First name</Label>
            <Input
              id="first-name"
              placeholder="Max"
              required
            />
          </div>
          <div class="signup-card__field">
            <Label for="last-name">Last name</Label>
            <Input
              id="last-name"
              placeholder="Robinson"
              required
            />
          </div>
        </div>
        <div class="signup-card__field">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="signup-card__field">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
          />
        </div>
        <Button
          type="submit"
          class="signup-card__button"
        >
          Create an account
        </Button>
        <Button
          variant="outline"
          class="signup-card__button"
        >
          Sign up with GitHub
        </Button>
      </div>
      <div class="signup-card__footer">
        Already have an account?
        <a
          href="#"
          class="signup-card__link"
        >
          Sign in
        </a>
      </div>
    </CardContent>
  </Card>
</template>

<style>
.signup-card__card {
  max-width: 24rem;
  margin-right: auto;
  margin-left: auto;
}

.signup-card__title {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.signup-card__form {
  display: grid;
  gap: 1rem;
}

.signup-card__name-row {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.signup-card__field {
  display: grid;
  gap: 0.5rem;
}

.signup-card__button {
  width: 100%;
}

.signup-card__footer {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-card__link {
  color: inherit;
  text-decoration: underline;
}
</style>
