<script setup lang="ts">
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/registry/tailwind/ui/card';
import { Input } from '@ui/registry/tailwind/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/tailwind/ui/select';
import { Separator } from '@ui/registry/tailwind/ui/separator';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Share this document</CardTitle>
      <CardDescription>
        Anyone with the link can view this document.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex space-x-2">
        <Input
          value="http://example.com/link/to/document"
          read-only
        />
        <Button
          variant="secondary"
          class="shrink-0"
        >
          Copy Link
        </Button>
      </div>
      <Separator class="my-4" />
      <div class="space-y-4">
        <h4 class="text-sm font-medium">
          People with access
        </h4>
        <div class="grid gap-6">
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar size="sm" />
              <div>
                <p class="text-sm font-medium leading-none">
                  Olivia Martin
                </p>
                <p class="text-sm text-muted-foreground">
                  m@example.com
                </p>
              </div>
            </div>
            <Select default-value="edit">
              <SelectTrigger class="ml-auto w-[110px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar size="sm" />

              <div>
                <p class="text-sm font-medium leading-none">
                  Isabella Nguyen
                </p>
                <p class="text-sm text-muted-foreground">
                  b@example.com
                </p>
              </div>
            </div>
            <Select default-value="view">
              <SelectTrigger class="ml-auto w-[110px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar size="sm" />

              <div>
                <p class="text-sm font-medium leading-none">
                  Sofia Davis
                </p>
                <p class="text-sm text-muted-foreground">
                  p@example.com
                </p>
              </div>
            </div>
            <Select default-value="view">
              <SelectTrigger class="ml-auto w-[110px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
