import { ref } from 'vue';
import { eventToBinding, getModifiers } from './shortcuts';

/**
 * Records a key combination from keydown events.
 * Tab and Escape are ignored so keyboard users can always leave the recorder and close the dialog.
 */
export function useKeyRecorder(initialBinding: string | null = null) {
  const binding = ref<string | null>(initialBinding);
  const heldModifiers = ref<string[]>([]);

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Tab' || event.key === 'Escape') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const recorded = eventToBinding(event);

    if (recorded) {
      binding.value = recorded;
      heldModifiers.value = [];
      return;
    }

    heldModifiers.value = getModifiers(event);
  }

  function onKeyup(event: KeyboardEvent) {
    heldModifiers.value = getModifiers(event);
  }

  function reset(value: string | null = null) {
    binding.value = value;
    heldModifiers.value = [];
  }

  return { binding, heldModifiers, onKeydown, onKeyup, reset };
}
