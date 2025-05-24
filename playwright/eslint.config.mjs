import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import playwright from 'eslint-plugin-playwright';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js', '**/*.mjs'],
  },
  {
    ignores: ['html*'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@stylistic/js/indent': 'off',
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,

      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/js/space-before-function-paren': ['error', 'never'],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      'no-unused-vars': 0,
      '@stylistic/js/indent': ['error', 2, { 'SwitchCase': 2 }],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/arrow-spacing': [2, { 'before': true, 'after': true }]
    },
  },
];