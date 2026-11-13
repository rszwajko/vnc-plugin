import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/dist/', '**/node_modules/', '**/package-lock.json'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      import: importPlugin,
      'react-hooks': reactHooksPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],

      'import/no-cycle': 'off',
      'import/no-duplicates': 'error',

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },

  prettierConfig,
);
