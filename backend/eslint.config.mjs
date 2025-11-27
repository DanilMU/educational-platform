// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn'
    },
  },
  {
    files: ['src/main.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.spec.ts'],
    ...jestPlugin.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
    }
  },
);