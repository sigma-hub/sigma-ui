<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { Checkbox } from '@ui/registry/css/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import { RadioGroup, RadioGroupItem } from '@ui/registry/css/ui/radio-group';
import { Separator } from '@ui/registry/css/ui/separator';
import { Switch } from '@ui/registry/css/ui/switch';

const notificationsFormSchema = toTypedSchema(z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    error: 'You need to select a notification type.',
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
}));

const { handleSubmit } = useForm({
  validationSchema: notificationsFormSchema,
  initialValues: {
    communication_emails: false,
    marketing_emails: false,
    social_emails: true,
    security_emails: true,
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
      Notifications
    </h3>
    <p class="settings-forms__section-description">
      Configure how you receive notifications.
    </p>
  </div>
  <Separator />
  <form
    class="settings-forms__form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      type="radio"
      name="type"
    >
      <FormItem class="settings-forms__notify">
        <FormLabel>Notify me about...</FormLabel>
        <FormControl>
          <RadioGroup
            class="settings-forms__radio-list"
            v-bind="componentField"
          >
            <FormItem class="settings-forms__radio-row">
              <FormControl>
                <RadioGroupItem value="all" />
              </FormControl>
              <FormLabel class="settings-forms__choice">
                All new messages
              </FormLabel>
            </FormItem>
            <FormItem class="settings-forms__radio-row">
              <FormControl>
                <RadioGroupItem value="mentions" />
              </FormControl>
              <FormLabel class="settings-forms__choice">
                Direct messages and mentions
              </FormLabel>
            </FormItem>
            <FormItem class="settings-forms__radio-row">
              <FormControl>
                <RadioGroupItem value="none" />
              </FormControl>
              <FormLabel class="settings-forms__choice">
                Nothing
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div>
      <h3 class="settings-forms__email-title">
        Email Notifications
      </h3>
      <div class="settings-forms__email-list">
        <FormField
          v-slot="{ handleChange, value }"
          type="checkbox"
          name="communication_emails"
        >
          <FormItem class="settings-forms__switch-row">
            <div class="settings-forms__switch-copy">
              <FormLabel class="settings-forms__switch-label">
                Communication emails
              </FormLabel>
              <FormDescription>
                Receive emails about your account activity.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ handleChange, value }"
          type="checkbox"
          name="marketing_emails"
        >
          <FormItem class="settings-forms__switch-row">
            <div class="settings-forms__switch-copy">
              <FormLabel class="settings-forms__switch-label">
                Marketing emails
              </FormLabel>
              <FormDescription>
                Receive emails about new products, features, and more.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ handleChange, value }"
          type="checkbox"
          name="social_emails"
        >
          <FormItem class="settings-forms__switch-row">
            <div class="settings-forms__switch-copy">
              <FormLabel class="settings-forms__switch-label">
                Social emails
              </FormLabel>
              <FormDescription>
                Receive emails for friend requests, follows, and more.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ handleChange, value }"
          type="checkbox"
          name="security_emails"
        >
          <FormItem class="settings-forms__switch-row">
            <div class="settings-forms__switch-copy">
              <FormLabel class="settings-forms__switch-label">
                Security emails
              </FormLabel>
              <FormDescription>
                Receive emails about your account activity and security.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
    </div>

    <FormField
      v-slot="{ handleChange, value }"
      type="checkbox"
      name="mobile"
    >
      <FormItem class="settings-forms__checkbox-row">
        <FormControl>
          <Checkbox
            :model-value="value"
            @update:model-value="handleChange"
          />
        </FormControl>
        <div class="settings-forms__checkbox-copy">
          <FormLabel>
            Use different settings for my mobile devices
          </FormLabel>
          <FormDescription>
            You can manage your mobile notifications in the
            <a
              href="#"
              class="settings-forms__link"
            >
              mobile settings
            </a>
            page.
          </FormDescription>
        </div>
      </FormItem>
    </FormField>

    <div class="settings-forms__actions">
      <Button type="submit">
        Update notifications
      </Button>
    </div>
  </form>
</template>

<style>
@layer components {
  .settings-forms__notify {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 3);
  }

  .settings-forms__radio-list,
  .settings-forms__email-list {
    display: flex;
    flex-direction: column;
  }

  .settings-forms__radio-list {
    gap: calc(var(--spacing) * 1);
  }

  .settings-forms__radio-row,
  .settings-forms__checkbox-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .settings-forms__choice.settings-forms__choice {
    font-weight: 400;
  }

  .settings-forms__email-title {
    margin: 0 0 calc(var(--spacing) * 4);
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.75rem;
  }

  .settings-forms__email-list {
    gap: calc(var(--spacing) * 4);
  }

  .settings-forms__switch-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--spacing) * 4);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .settings-forms__switch-copy,
  .settings-forms__checkbox-copy {
    display: flex;
    flex-direction: column;
  }

  .settings-forms__switch-copy {
    gap: calc(var(--spacing) * 0.5);
  }

  .settings-forms__checkbox-copy {
    gap: calc(var(--spacing) * 1);
    line-height: 1;
  }

  .settings-forms__switch-label.settings-forms__switch-label {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .settings-forms__checkbox-row {
    align-items: flex-start;
  }

  .settings-forms__link {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}
</style>
