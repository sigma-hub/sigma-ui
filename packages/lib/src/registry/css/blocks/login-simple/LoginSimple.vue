<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <Card class="login-simple__card">
    <CardHeader>
      <CardTitle class="login-simple__title">
        Login
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account.
      </CardDescription>
    </CardHeader>
    <CardContent class="login-simple__content">
      <div class="login-simple__field">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div class="login-simple__field">
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="login-simple__submit">
        Sign in
      </Button>
    </CardFooter>
  </Card>
</template>

<style>
.login-simple__card {
  width: 100%;
  max-width: 24rem;
}

.login-simple__title {
  font-size: 1.5rem;
  line-height: 2rem;
}

.login-simple__content {
  display: grid;
  gap: calc(var(--spacing) * 4);
}

.login-simple__field {
  display: grid;
  gap: calc(var(--spacing) * 2);
}

.login-simple__submit {
  width: 100%;
}
</style>
