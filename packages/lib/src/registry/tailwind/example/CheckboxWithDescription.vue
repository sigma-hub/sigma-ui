<script setup lang="ts">
import { ref } from 'vue';
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';

const termsAccepted = ref<boolean | 'indeterminate'>(false);
const disabledTerms = ref<boolean | 'indeterminate'>(false);
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="items-start flex gap-x-2">
      <Checkbox
        id="checkbox-with-description-1"
        :model-value="termsAccepted"
        @update:model-value="termsAccepted = $event"
      />
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
        :model-value="disabledTerms"
        @update:model-value="disabledTerms = $event"
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
