<script setup lang="ts">
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/css/ui/select';
</script>

<template>
  <Card class="example-sigma-ui-card-form">
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div class="example-sigma-ui-card-form__grid">
          <div class="example-sigma-ui-card-form__field">
            <Label for="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of your project"
            />
          </div>
          <div class="example-sigma-ui-card-form__field">
            <Label for="framework">Framework</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="next">
                  Next.js
                </SelectItem>
                <SelectItem value="sveltekit">
                  SvelteKit
                </SelectItem>
                <SelectItem value="astro">
                  Astro
                </SelectItem>
                <SelectItem value="nuxt">
                  Nuxt
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter class="example-sigma-ui-card-form__footer">
      <Button variant="outline">
        Cancel
      </Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>
</template>

<style>
.example-sigma-ui-card-form {
  width: 350px;
}

.example-sigma-ui-card-form__grid {
  display: grid;
  width: 100%;
  gap: 1rem;
}

.example-sigma-ui-card-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.example-sigma-ui-card-form__footer {
  display: flex;
  justify-content: space-between;
}
</style>
