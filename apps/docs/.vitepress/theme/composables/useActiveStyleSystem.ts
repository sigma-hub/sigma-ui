import { computed } from 'vue';
import { useMounted } from '@vueuse/core';
import { type StyleSystem, styleSystems } from '@sigma-ui/shared/style-systems';
import { useConfigStore } from '@/stores/config';

export function useActiveStyleSystem() {
  const { config } = useConfigStore();
  const isMounted = useMounted();

  return computed<StyleSystem>(() => isMounted.value ? config.value.styleSystem : styleSystems[0].name);
}
