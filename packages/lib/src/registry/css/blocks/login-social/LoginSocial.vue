<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <Card class="login-social__card">
    <CardHeader>
      <CardTitle class="login-social__title">
        Login
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="login-social__form">
        <div class="login-social__field">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="login-social__field">
          <div class="login-social__label-row">
            <Label for="password">Password</Label>
            <a
              href="#"
              class="login-social__forgot-link"
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
          class="login-social__button"
        >
          Login
        </Button>
        <Button
          variant="outline"
          class="login-social__button"
        >
          Login with Google
        </Button>
      </div>
      <div class="login-social__footer">
        Don't have an account?
        <a
          href="#"
          class="login-social__link"
        >
          Sign up
        </a>
      </div>
    </CardContent>
  </Card>
</template>

<style>
.login-social__card {
  max-width: 24rem;
  margin-right: auto;
  margin-left: auto;
}

.login-social__title {
  font-size: 1.5rem;
  line-height: 2rem;
}

.login-social__form {
  display: grid;
  gap: 1rem;
}

.login-social__field {
  display: grid;
  gap: 0.5rem;
}

.login-social__label-row {
  display: flex;
  align-items: center;
}

.login-social__forgot-link {
  display: inline-block;
  margin-left: auto;
  color: inherit;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-decoration: underline;
}

.login-social__button {
  width: 100%;
}

.login-social__footer {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.login-social__link {
  color: inherit;
  text-decoration: underline;
}
</style>
