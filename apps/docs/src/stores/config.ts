import { DEFAULT_COMPONENTS, DEFAULT_UTILS } from '~/packages/shared/consts';
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { useData } from 'vitepress';
import { type Theme, themes } from './../lib/registry/themes';
import { type StyleSystem, styleSystems } from '@/lib/registry/style-system';

interface Config {
  theme?: Theme['name'];
  radius: number;
  backdropFilterBlur: number;
  styleSystem: StyleSystem;
}

interface CodeConfig {
  prefix: string;
  componentsPath: string;
  utilsPath: string;
}

export const RADII = [0, 0.25, 0.5, 0.75, 1];
export const BACKDROP_FILTER_BLURS = [16, 24, 32, 64, 128];

const DEFAULT_CONFIG: Config = {
  theme: 'grayscale',
  radius: 0.5,
  backdropFilterBlur: 32,
  styleSystem: styleSystems[0].name,
};

const DEFAULT_CODE_CONFIG: CodeConfig = {
  prefix: '',
  componentsPath: DEFAULT_COMPONENTS,
  utilsPath: DEFAULT_UTILS,
};

export function useConfigStore() {
  const { isDark } = useData();
  const config = useStorage<Config>('config', DEFAULT_CONFIG, undefined, {
    mergeDefaults: true,
  });
  const codeConfig = useStorage<CodeConfig>('code-config', DEFAULT_CODE_CONFIG, undefined, {
    mergeDefaults: true,
  });

  const themeClass = computed(() => `theme-${config.value.theme}`);

  const themePrimary = computed(() => {
    const theme = themes.find(t => t.name === config.value.theme);
    return `hsl(${
      theme?.cssVars[isDark ? 'dark' : 'light'].primary
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

  const setBackdropFilterBlur = (newBackdropFilterBlur: number) => {
    config.value.backdropFilterBlur = newBackdropFilterBlur;
  };

  return {
    config,
    themeClass,
    themePrimary,
    codeConfig,
    setTheme,
    setRadius,
    setBackdropFilterBlur,
    setCodeConfig,
  };
}
