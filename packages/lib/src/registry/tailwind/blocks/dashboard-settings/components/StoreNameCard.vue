<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Input } from '@ui/registry/tailwind/ui/input';
import type { StoreNameCardData } from '../data';

defineProps<StoreNameCardData>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <Input :placeholder="placeholder" />
      </form>
    </CardContent>
    <CardFooter class="border-t px-6 py-4">
      <Button>{{ saveLabel }}</Button>
    </CardFooter>
  </Card>
</template>
