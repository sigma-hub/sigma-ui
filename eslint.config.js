import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTs from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginStylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/dist/**',
      '**/__generated/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
    ],
  },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  pluginStylistic.configs['recommended-flat'],
  pluginStylistic.configs.customize({
    semi: true,
  }),
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: pluginTs.parser,
      },
    },
    rules: {
      'prettier/prettier': 'off',
      'curly': ['error', 'all'],
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/define-emits-declaration': ['error', 'type-literal'],
      'vue/no-v-text-v-html-on-component': 'warn',
      'vue/no-v-html': 'warn',
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: false,
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'block-like',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: 'props|^_',
        },
      ],
    },
  },
];
