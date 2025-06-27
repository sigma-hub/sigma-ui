<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/registry/tailwind/ui/card';
</script>

<template>
  <Card class="w-[380px]">
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      Card Content
    </CardContent>
    <CardFooter>
      Card Footer
    </CardFooter>
  </Card>
</template>
