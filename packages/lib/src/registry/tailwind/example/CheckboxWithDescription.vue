<script setup lang="ts">
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="items-start flex gap-x-2">
      <Checkbox id="checkbox-with-description-1" />
      <div class="grid gap-1.5 leading-none peer-[&:has([disabled])]:opacity-70">
        <label
          for="checkbox-with-description-1"
          class="text-sm font-medium leading-none"
        >
          Accept terms and conditions
        </label>
        <p class="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>

    <div class="items-start flex gap-x-2">
      <Checkbox
        id="checkbox-with-description-2"
        disabled
      />
      <div class="grid gap-1.5 leading-none peer-[&:has([disabled])]:opacity-70">
        <label
          for="checkbox-with-description-2"
          class="text-sm font-medium leading-none"
        >
          Accept terms and conditions
        </label>
        <p class="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  </div>
</template>
