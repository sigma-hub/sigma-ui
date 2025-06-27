import { DEFAULT_COMPONENTS, DEFAULT_UTILS } from '~/packages/shared/consts';
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { useData } from 'vitepress';
import { type Theme, themes } from './../lib/registry/themes';
import { type StyleSystem, styleSystems } from '@/lib/registry/style-system';

interface Config {
  theme?: Theme['name'];
  radius: number;
  styleSystem: StyleSystem;
}

interface CodeConfig {
  prefix: string;
  componentsPath: string;
  utilsPath: string;
}

export const RADII = [0, 0.25, 0.5, 0.75, 1];

export function useConfigStore() {
  const { isDark } = useData();
  const config = useStorage<Config>('config', {
    theme: 'zinc',
    radius: 0.5,
    styleSystem: styleSystems[0].name,
  });
  const codeConfig = useStorage<CodeConfig>('code-config', {
    prefix: '',
    componentsPath: DEFAULT_COMPONENTS,
    utilsPath: DEFAULT_UTILS,
  });

  const themeClass = computed(() => `theme-${config.value.theme}`);

  const themePrimary = computed(() => {
    const t = themes.find(t => t.name === config.value.theme);
    return `hsl(${
      t?.cssVars[isDark ? 'dark' : 'light'].primary
    })`;
  });

  const setCodeConfig = (payload: CodeConfig) => {
    codeConfig.value = payload;
  };

  const setTheme = (themeName: Theme['name']) => {
    config.value.theme = themeName;
  };

  const setRadius = (newRadius: number) => {
    config.value.radius = newRadius;
  };

  return {
    config,
    themeClass,
    themePrimary,
    codeConfig,
    setTheme,
    setRadius,
    setCodeConfig,
  };
}
