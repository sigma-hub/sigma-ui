<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import { RadioGroup, RadioGroupItem } from '@ui/registry/css/ui/radio-group';
import { Separator } from '@ui/registry/css/ui/separator';

const appearanceFormSchema = toTypedSchema(z.object({
  theme: z.enum(['light', 'dark'], {
    error: 'Please select a theme.',
  }),
}));

const { handleSubmit } = useForm({
  validationSchema: appearanceFormSchema,
  initialValues: {
    theme: 'light' as const,
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
      Appearance
    </h3>
    <p class="settings-forms__section-description">
      Customize the appearance of the app. Automatically switch between day and night themes.
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
      name="theme"
    >
      <FormItem class="settings-forms__theme">
        <FormLabel>Theme</FormLabel>
        <FormDescription>
          Select the theme for the dashboard.
        </FormDescription>
        <FormMessage />
        <RadioGroup
          class="settings-forms__theme-grid"
          v-bind="componentField"
        >
          <FormItem>
            <FormLabel class="settings-forms__theme-label">
              <FormControl>
                <RadioGroupItem
                  value="light"
                  class="settings-forms__sr-only"
                />
              </FormControl>
              <div class="settings-forms__theme-frame">
                <div class="settings-forms__theme-canvas settings-forms__theme-canvas--light">
                  <div class="settings-forms__theme-card settings-forms__theme-card--light">
                    <div class="settings-forms__theme-line settings-forms__theme-line--short settings-forms__theme-line--light" />
                    <div class="settings-forms__theme-line settings-forms__theme-line--long settings-forms__theme-line--light" />
                  </div>
                  <div class="settings-forms__theme-row settings-forms__theme-card--light">
                    <div class="settings-forms__theme-dot settings-forms__theme-dot--light" />
                    <div class="settings-forms__theme-line settings-forms__theme-line--long settings-forms__theme-line--light" />
                  </div>
                  <div class="settings-forms__theme-row settings-forms__theme-card--light">
                    <div class="settings-forms__theme-dot settings-forms__theme-dot--light" />
                    <div class="settings-forms__theme-line settings-forms__theme-line--long settings-forms__theme-line--light" />
                  </div>
                </div>
              </div>
              <span class="settings-forms__theme-caption">
                Light
              </span>
            </FormLabel>
          </FormItem>
          <FormItem>
            <FormLabel class="settings-forms__theme-label">
              <FormControl>
                <RadioGroupItem
                  value="dark"
                  class="settings-forms__sr-only"
                />
              </FormControl>
              <div class="settings-forms__theme-frame settings-forms__theme-frame--dark">
                <div class="settings-forms__theme-canvas settings-forms__theme-canvas--dark">
                  <div class="settings-forms__theme-card settings-forms__theme-card--dark">
                    <div class="settings-forms__theme-line settings-forms__theme-line--short settings-forms__theme-line--dark" />
                    <div class="settings-forms__theme-line settings-forms__theme-line--long settings-forms__theme-line--dark" />
                  </div>
                  <div class="settings-forms__theme-row settings-forms__theme-card--dark">
                    <div class="settings-forms__theme-dot settings-forms__theme-dot--dark" />
                    <div class="settings-forms__theme-line settings-forms__theme-line--long settings-forms__theme-line--dark" />
                  </div>
                  <div class="settings-forms__theme-row settings-forms__theme-card--dark">
                    <div class="settings-forms__theme-dot settings-forms__theme-dot--dark" />
                    <div class="settings-forms__theme-line settings-forms__theme-line--long settings-forms__theme-line--dark" />
                  </div>
                </div>
              </div>
              <span class="settings-forms__theme-caption">
                Dark
              </span>
            </FormLabel>
          </FormItem>
        </RadioGroup>
      </FormItem>
    </FormField>

    <div class="settings-forms__actions">
      <Button type="submit">
        Update preferences
      </Button>
    </div>
  </form>
</template>

<style>
.settings-forms__theme {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
}

.settings-forms__theme-grid {
  display: grid;
  max-width: 28rem;
  padding-top: calc(var(--spacing) * 2);
  gap: calc(var(--spacing) * 8);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.settings-forms__theme-label:has([data-state="checked"]) .settings-forms__theme-frame {
  border-color: var(--primary);
}

.settings-forms__theme-frame {
  padding: calc(var(--spacing) * 1);
  border: 2px solid var(--muted);
  border-radius: var(--radius);
}

.settings-forms__theme-frame:hover {
  border-color: var(--secondary);
}

.settings-forms__theme-frame--dark {
  background: var(--popover);
}

.settings-forms__theme-frame--dark:hover {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.settings-forms__theme-canvas,
.settings-forms__theme-card {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
}

.settings-forms__theme-canvas {
  padding: calc(var(--spacing) * 2);
  border-radius: calc(var(--radius) - 4px);
}

.settings-forms__theme-canvas--light {
  background: #ecedef;
}

.settings-forms__theme-canvas--dark {
  background: #020617;
}

.settings-forms__theme-card,
.settings-forms__theme-row {
  padding: calc(var(--spacing) * 2);
  border-radius: var(--radius);
  box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
}

.settings-forms__theme-card--light,
.settings-forms__theme-row.settings-forms__theme-card--light {
  background: #ffffff;
}

.settings-forms__theme-card--dark,
.settings-forms__theme-row.settings-forms__theme-card--dark {
  background: #1e293b;
}

.settings-forms__theme-row {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.settings-forms__theme-line,
.settings-forms__theme-dot {
  border-radius: 9999px;
}

.settings-forms__theme-line {
  height: calc(var(--spacing) * 2);
}

.settings-forms__theme-line--short {
  width: calc(var(--spacing) * 20);
}

.settings-forms__theme-line--long {
  width: 100px;
}

.settings-forms__theme-line--light,
.settings-forms__theme-dot--light {
  background: #ecedef;
}

.settings-forms__theme-line--dark,
.settings-forms__theme-dot--dark {
  background: #94a3b8;
}

.settings-forms__theme-dot {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}

.settings-forms__theme-caption {
  display: block;
  width: 100%;
  padding: calc(var(--spacing) * 2);
  font-weight: 400;
  text-align: center;
}
</style>
