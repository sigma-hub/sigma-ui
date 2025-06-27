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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/registry/css/ui/tabs';
</script>

<template>
  <Tabs
    default-value="account"
    class="example-sigma-ui-tabs"
  >
    <TabsList class="example-sigma-ui-tabs__list">
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent class="example-sigma-ui-tabs__content">
          <div class="example-sigma-ui-tabs__field">
            <Label for="name">Name</Label>
            <Input
              id="name"
              model-value="Pedro Duarte"
            />
          </div>
          <div class="example-sigma-ui-tabs__field">
            <Label for="username">Username</Label>
            <Input
              id="username"
              model-value="@peduarte"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you'll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent class="example-sigma-ui-tabs__content">
          <div class="example-sigma-ui-tabs__field">
            <Label for="current">Current password</Label>
            <Input
              id="current"
              type="password"
            />
          </div>
          <div class="example-sigma-ui-tabs__field">
            <Label for="new">New password</Label>
            <Input
              id="new"
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>

<style>
.example-sigma-ui-tabs {
  width: 400px;
}

.example-sigma-ui-tabs__list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.example-sigma-ui-tabs__content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.example-sigma-ui-tabs__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
