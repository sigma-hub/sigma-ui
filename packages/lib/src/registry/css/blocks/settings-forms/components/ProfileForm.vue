<script setup lang="ts">
import { h, ref } from 'vue';
import { FieldArray, useForm } from 'vee-validate';
import * as z from 'zod';
import { XIcon } from '@lucide/vue';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import { Input } from '@ui/registry/css/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/css/ui/select';
import { Separator } from '@ui/registry/css/ui/separator';
import { Textarea } from '@ui/registry/css/ui/textarea';

const verifiedEmails = ref(['m@example.com', 'm@google.com', 'm@support.com']);

const profileFormSchema = toTypedSchema(z.object({
  username: z
    .string({ error: 'Username is required.' })
    .min(2, {
      error: 'Username must be at least 2 characters.',
    })
    .max(30, {
      error: 'Username must not be longer than 30 characters.',
    }),
  email: z.email({ error: 'Please select an email to display.' }),
  bio: z.string({ error: 'Bio is required.' }).max(160, { error: 'Bio must not be longer than 160 characters.' }).min(4, { error: 'Bio must be at least 4 characters.' }),
  urls: z
    .array(
      z.object({
        value: z.url({ error: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
}));

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    bio: 'I own a computer.',
    urls: [
      { value: 'https://sigma-ui.dev' },
      { value: 'https://twitter.com/sigma__dev' },
    ],
  },
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'settings-forms__toast' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <div class="settings-forms__section">
    <h3 class="settings-forms__section-title">
      Profile
    </h3>
    <p class="settings-forms__section-description">
      This is how others will see you on the site.
    </p>
  </div>
  <Separator />
  <form
    class="settings-forms__form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="username"
    >
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="sigma-ui"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="email"
    >
      <FormItem>
        <FormLabel>Email</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select an email" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="email in verifiedEmails"
                :key="email"
                :value="email"
              >
                {{ email }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription>
          You can manage verified email addresses in your email settings.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="bio"
    >
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations to link to them.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div>
      <FieldArray
        v-slot="{ fields, push, remove }"
        name="urls"
      >
        <div
          v-for="(field, index) in fields"
          :key="`urls-${field.key}`"
        >
          <FormField
            v-slot="{ componentField }"
            :name="`urls[${index}].value`"
          >
            <FormItem>
              <FormLabel :class="{ 'settings-forms__sr-only': index !== 0 }">
                URLs
              </FormLabel>
              <FormDescription :class="{ 'settings-forms__sr-only': index !== 0 }">
                Add links to your website, blog, or social media profiles.
              </FormDescription>
              <div class="settings-forms__url-row">
                <FormControl>
                  <Input
                    type="url"
                    v-bind="componentField"
                  />
                </FormControl>
                <button
                  type="button"
                  class="settings-forms__url-remove"
                  @click="remove(index)"
                >
                  <XIcon class="settings-forms__url-icon" />
                </button>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="settings-forms__add-url"
          @click="push({ value: '' })"
        >
          Add URL
        </Button>
      </FieldArray>
    </div>

    <div class="settings-forms__actions">
      <Button type="submit">
        Update profile
      </Button>
      <Button
        type="button"
        variant="outline"
        @click="resetForm"
      >
        Reset form
      </Button>
    </div>
  </form>
</template>

<style>
.settings-forms__url-row {
  position: relative;
  display: flex;
  align-items: center;
}

.settings-forms__url-remove {
  position: absolute;
  right: 0;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
  border: 0;
  background: transparent;
  color: var(--muted-foreground);
}

.settings-forms__url-icon {
  width: calc(var(--spacing) * 3);
  height: calc(var(--spacing) * 3);
}

.settings-forms__add-url.settings-forms__add-url {
  width: calc(var(--spacing) * 20);
  margin-top: calc(var(--spacing) * 2);
  font-size: 0.75rem;
}
</style>
