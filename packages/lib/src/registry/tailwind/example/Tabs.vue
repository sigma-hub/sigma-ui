<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/registry/tailwind/ui/card';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/registry/tailwind/ui/tabs';
</script>

<template>
  <Tabs
    default-value="account"
    class="w-[400px]"
  >
    <TabsList class="grid w-full grid-cols-2">
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
        <CardContent class="space-y-3">
          <div class="flex flex-col gap-2">
            <Label for="name">Name</Label>
            <Input
              id="name"
              model-value="Pedro Duarte"
            />
          </div>
          <div class="flex flex-col gap-2">
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
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="current">Current password</Label>
            <Input
              id="current"
              type="password"
            />
          </div>
          <div class="space-y-1">
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
