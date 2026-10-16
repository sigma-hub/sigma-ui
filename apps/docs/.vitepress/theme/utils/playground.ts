import { template } from 'lodash-es';
import { themes } from '@sigma-ui/shared/themes';
import { CSS_STYLES_WITH_VARS_TEMPLATE } from '@sigma-ui/shared/templates/css-styles';
import { TAILWIND_V4_CSS_TEMPLATE } from '@sigma-ui/shared/templates/tailwind-config';
import type { StyleSystem } from '@sigma-ui/shared/style-systems';

const THEME_SIZES = { radius: 0.5, backdropFilterBlur: 32 };

export interface PlaygroundFile {
  path: string;
  content?: string;
  type: string;
  target?: string;
}

export interface PlaygroundItem {
  name: string;
  type: string;
  dependencies?: string[];
  files?: PlaygroundFile[];
}

export interface PlaygroundProjectFile {
  content: string;
  isBinary: false;
}

const UTILS_SOURCE = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

function cssVariableBlock(variables: Record<string, string>) {
  return Object.entries(variables).map(([name, value]) => `--${name}: ${value};`).join('\n    ');
}

export function createPlaygroundStylesheet(styleSystem: StyleSystem) {
  const theme = themes.find(entry => entry.name === 'grayscale');

  if (!theme) {
    throw new Error('The grayscale theme is missing.');
  }

  switch (styleSystem) {
    case 'tailwind':
      return template(TAILWIND_V4_CSS_TEMPLATE)({
        configPath: '',
        cssVarsLight: cssVariableBlock({ ...theme.cssVars.light }),
        cssVarsDark: cssVariableBlock({ ...theme.cssVars.dark }),
      });

    case 'css':
      return `@import "./preflight.css";\n\n${template(CSS_STYLES_WITH_VARS_TEMPLATE)({
        colors: theme.cssVars,
        sizes: THEME_SIZES,
      })}`;

    default: {
      const unsupportedStyleSystem: never = styleSystem;
      throw new Error(`Unsupported style system "${unsupportedStyleSystem}".`);
    }
  }
}

export function packageName(dependency: string) {
  const versionAt = dependency.startsWith('@') ? dependency.indexOf('@', 1) : dependency.indexOf('@');
  return versionAt === -1 ? dependency : dependency.slice(0, versionAt);
}

function dependencyRange(dependency: string) {
  const name = packageName(dependency);
  const range = dependency.slice(name.length);
  return range.startsWith('@') ? range.slice(1) : 'latest';
}

function rewriteDemoImports(code: string, styleSystem: StyleSystem) {
  return code
    .replaceAll(`@ui/registry/${styleSystem}/ui/`, '@/components/ui/')
    .replaceAll(`@ui/registry/${styleSystem}/blocks/`, '@/components/blocks/')
    .replaceAll('@ui/utils', '@/lib/utils');
}

function relativeItemPath(filePath: string, itemName: string) {
  const segments = filePath.split('/');
  const itemSegmentIndex = segments.lastIndexOf(itemName);

  if (itemSegmentIndex !== -1 && itemSegmentIndex < segments.length - 1) {
    return segments.slice(itemSegmentIndex + 1).join('/');
  }

  return segments[segments.length - 1] ?? filePath;
}

export function playgroundTargetPath(item: PlaygroundItem, file: PlaygroundFile) {
  if (file.target) {
    return file.target.replace(/^~\//, '');
  }

  const relativePath = relativeItemPath(file.path, item.name);

  if (item.type === 'registry:block') {
    return `src/components/blocks/${item.name}/${relativePath}`;
  }

  if (file.type === 'registry:ui' || item.type === 'registry:ui') {
    return `src/components/ui/${item.name}/${relativePath}`;
  }

  if (file.type === 'registry:lib') {
    return `src/lib/${relativePath.split('/').pop()}`;
  }

  return `src/components/${relativePath}`;
}

function viteConfig(styleSystem: StyleSystem) {
  const plugins = styleSystem === 'tailwind'
    ? `    vue(),
    tailwindcss(),`
    : '    vue(),';
  const imports = styleSystem === 'tailwind'
    ? `import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'`
    : `import vue from '@vitejs/plugin-vue'`;

  return `import path from 'node:path'
import { defineConfig } from 'vite'
${imports}

export default defineConfig({
  plugins: [
${plugins}
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`;
}

function configFile(styleSystem: StyleSystem) {
  return {
    $schema: 'https://sigma-ui.dev/schema.json',
    styleSystem,
    framework: 'vite',
    cssPath: 'src/assets/index.css',
    baseColor: 'grayscale',
    tailwind: { config: '' },
    aliases: {
      components: '@/components/ui',
      utils: styleSystem === 'tailwind' ? '@/lib/utils' : '',
    },
    generatePreflight: styleSystem === 'css',
    componentNaming: 'pascal-case',
  };
}

export function assemblePlaygroundFiles(options: {
  styleSystem: StyleSystem;
  componentName: string;
  demoCode: string;
  items: PlaygroundItem[];
  css: string;
  preflight?: string;
}): Record<string, PlaygroundProjectFile> {
  const { styleSystem, componentName, items, css, preflight } = options;
  const demoCode = rewriteDemoImports(options.demoCode, styleSystem);
  const dependencies = new Map<string, string>([['vue', 'latest']]);

  if (styleSystem === 'tailwind') {
    dependencies.set('clsx', 'latest');
    dependencies.set('tailwind-merge', 'latest');
    dependencies.set('tw-animate-css', 'latest');
  }

  const files: Record<string, PlaygroundProjectFile> = {};

  for (const item of items) {
    for (const dependency of item.dependencies ?? []) {
      dependencies.set(packageName(dependency), dependencyRange(dependency));
    }

    for (const file of item.files ?? []) {
      if (!file.content) {
        continue;
      }

      files[playgroundTargetPath(item, file)] = { content: file.content, isBinary: false };
    }
  }

  const devDependencies: Record<string, string> = {
    'vite': 'latest',
    '@vitejs/plugin-vue': 'latest',
  };

  if (styleSystem === 'tailwind') {
    devDependencies.tailwindcss = 'latest';
    devDependencies['@tailwindcss/vite'] = 'latest';
  }

  const projectName = `sigma-ui-${componentName.toLowerCase().replace(/ /g, '-')}`;
  const usesUtils = styleSystem === 'tailwind' || demoCode.includes('@/lib/utils') || Object.values(files).some(file => file.content.includes('@/lib/utils'));

  files['package.json'] = {
    content: JSON.stringify({
      name: projectName,
      scripts: { start: 'vite' },
      dependencies: Object.fromEntries(dependencies),
      devDependencies,
    }, null, 2),
    isBinary: false,
  };
  files['sigma-ui.config.json'] = {
    content: JSON.stringify(configFile(styleSystem), null, 2),
    isBinary: false,
  };
  files['vite.config.js'] = { content: viteConfig(styleSystem), isBinary: false };
  files['index.html'] = {
    content: `<!DOCTYPE html>
<html class="dark" lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${componentName} - SIGMA-UI</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    isBinary: false,
  };
  files['tsconfig.json'] = {
    content: `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
`,
    isBinary: false,
  };
  files['src/assets/index.css'] = { content: css, isBinary: false };
  files['src/main.ts'] = {
    content: `import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';

createApp(App).mount('#app');
`,
    isBinary: false,
  };
  files['src/App.vue'] = { content: demoCode, isBinary: false };

  if (usesUtils) {
    files['src/lib/utils.ts'] = { content: UTILS_SOURCE, isBinary: false };
  }

  if (styleSystem === 'css' && preflight) {
    files['src/assets/preflight.css'] = { content: preflight, isBinary: false };
  }

  return files;
}
