import type { InjectionKey } from 'vue';
import { FieldContextKey, useFieldError, useIsFieldDirty, useIsFieldTouched, useIsFieldValid } from 'vee-validate';
import { inject } from 'vue';

export const FORM_ITEM_INJECTION_KEY = Symbol() as InjectionKey<string>;

export function useFormField() {
  const fieldContext = inject(FieldContextKey);
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { name } = fieldContext;
  const id = fieldItemContext;
  const fieldState = {
    valid: useIsFieldValid(name),
    isDirty: useIsFieldDirty(name),
    isTouched: useIsFieldTouched(name),
    error: useFieldError(name),
  };

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}
