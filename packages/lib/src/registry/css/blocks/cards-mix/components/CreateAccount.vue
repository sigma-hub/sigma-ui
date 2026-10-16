<script setup lang="ts">
import { GithubIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <Card>
    <CardHeader class="cards-mix__gen-40">
      <CardTitle class="cards-mix__gen-52">
        Create an account
      </CardTitle>
      <CardDescription>
        Enter your email below to create your account
      </CardDescription>
    </CardHeader>
    <CardContent class="cards-mix__gen-53">
      <div class="cards-mix__gen-54">
        <Button variant="outline">
          <GithubIcon class="cards-mix__gen-43" />
          GitHub
        </Button>
        <Button variant="outline">
          <svg
            role="img"
            viewBox="0 0 24 24"
            class="cards-mix__gen-43"
          >
            <path
              fill="currentColor"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            />
          </svg>
          Google
        </Button>
      </div>
      <div class="cards-mix__gen-55">
        <div class="cards-mix__gen-56">
          <span class="cards-mix__gen-57" />
        </div>
        <div class="cards-mix__gen-58">
          <span class="cards-mix__gen-59">
            Or continue with
          </span>
        </div>
      </div>
      <div class="cards-mix__gen-23">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
        />
      </div>
      <div class="cards-mix__gen-23">
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="password"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="cards-mix__gen-1">
        Create account
      </Button>
    </CardFooter>
  </Card>
</template>
