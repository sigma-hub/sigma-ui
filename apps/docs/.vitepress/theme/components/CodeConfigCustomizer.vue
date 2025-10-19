<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ref, watch } from 'vue';
import { CheckIcon, SaveIcon, Settings2Icon } from 'lucide-vue-next';
import { useClipboard } from '@vueuse/core';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@ui/registry/tailwind/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { useConfigStore } from '@/stores/config';
import { DEFAULT_COMPONENTS, DEFAULT_UTILS } from '~/packages/shared/consts';

const { codeConfig, config, setCodeConfig } = useConfigStore();

const formSchema = toTypedSchema(z.object({
  prefix: z.string().default(''),
  componentsPath: z.string().default(DEFAULT_COMPONENTS),
  utilsPath: z.string().default(DEFAULT_UTILS),
}));

const { copy, copied } = useClipboard();

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: codeConfig.value,
});

const isOpen = ref(false);

const onSubmit = handleSubmit((values) => {
  copy(JSON.stringify(values));
  setCodeConfig(values);
  setValues(values);
});

watch(isOpen, (value) => {
  if (value) {
    setValues(codeConfig.value);
  }
});
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        class="w-8 h-8 flex-shrink-0"
        :variant="'ghost'"
        :size="'icon'"
      >
        <Settings2Icon class="w-5 h-5" />
      </Button>
    </PopoverTrigger>
    <PopoverContent

      :side-offset="8"
      align="center"
      class="w-[450px]"
    >
      <form @submit="onSubmit">
        <div class="flex items-center justify-between">
          <h1 class="text-md text-foreground font-semibold">
            Edit docs code examples
          </h1>
        </div>

        <Separator />

        <p class="mt-4 text-xs text-muted-foreground">
          Specify the same import paths you specified in the sigma-ui config file in your project.
          <br><br>Then you can copy code examples from the docs directly into your project without modifying them.
        </p>

        <div class="flex flex-col gap-4 my-4">
          <FormField
            v-slot="{ componentField }"
            name="componentsPath"
          >
            <FormItem>
              <FormLabel>Components import path</FormLabel>
              <FormControl>
                <Input
                  placeholder="@/components"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="utilsPath"
          >
            <FormItem>
              <FormLabel>Utils import path</FormLabel>
              <FormControl>
                <Input
                  placeholder="@/utils"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-if="config.styleSystem === 'tailwind'"
            v-slot="{ componentField }"
            name="prefix"
          >
            <FormItem>
              <FormLabel class="text-muted-foreground">
                Prefix
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Prefix customization will be added later"
                  disabled
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Button
          type="submit"
          class="h-9 min-w-[150px] rounded-md"
        >
          <TransitionGroup
            name="fade"
            mode="out-in"
          >
            <div
              v-if="copied"
              class="flex items-center"
            >
              <CheckIcon
                class="mr-2 h-4 w-4"
              />
            </div>
            <div
              v-else
              class="flex items-center"
            >
              <SaveIcon
                class="w-4 h-4 mr-2"
              />
              Update docs
            </div>
          </TransitionGroup>
        </Button>
      </form>
    </PopoverContent>
  </Popover>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-active {
  position: absolute;
}
</style>
