import { computed, onMounted, ref } from 'vue';

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: { platform?: string };
}

const APPLE_PLATFORM = /mac|iphone|ipad|ipod/i;

/** True on macOS, iOS and iPadOS. Always false during SSR and the first render, then decided on mount. */
export function useIsApplePlatform() {
  const isApplePlatform = ref(false);

  onMounted(() => {
    const navigatorWithData = navigator as NavigatorWithUserAgentData;
    const platform = navigatorWithData.userAgentData?.platform || navigator.platform || '';

    isApplePlatform.value = APPLE_PLATFORM.test(platform);
  });

  return isApplePlatform;
}

/** Replaces the `Mod` key in a shortcut with ⌘ on Apple platforms and Ctrl everywhere else. */
export function useShortcutKeys() {
  const isApplePlatform = useIsApplePlatform();
  const modifierLabel = computed(() => (isApplePlatform.value ? '⌘' : 'Ctrl'));

  function formatKeys(keys: string[]) {
    return keys.map(key => (key === 'Mod' ? modifierLabel.value : key));
  }

  return { isApplePlatform, modifierLabel, formatKeys };
}
