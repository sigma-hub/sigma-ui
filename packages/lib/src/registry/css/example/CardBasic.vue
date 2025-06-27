<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';
</script>

<template>
  <Card class="example-sigma-ui-card-basic">
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

<style>
.example-sigma-ui-card-basic {
  width: 380px;
}
</style>
