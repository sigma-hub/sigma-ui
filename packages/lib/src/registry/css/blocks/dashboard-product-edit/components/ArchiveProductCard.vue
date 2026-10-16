<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Archive Product</CardTitle>
      <CardDescription>
        Lipsum dolor sit amet, consectetur adipiscing elit.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div />
      <Button
        size="sm"
        variant="secondary"
      >
        Archive Product
      </Button>
    </CardContent>
  </Card>
</template>
