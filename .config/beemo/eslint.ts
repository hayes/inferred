import { ESLintConfig } from '@beemo/driver-eslint';

const config: ESLintConfig = {
  plugins: ['prettier'],
  ignore: ['deno', 'scripts', '*.generated.ts', '*.generated.tsx'],
  rules: {
    'import/no-unresolved': 'off',
    'import/no-default-export': 'off',
    'prettier/prettier': 'error',
    'sort-keys': 'off',
    'promise/prefer-await-to-callbacks': 'off',
    'node/no-unpublished-import': 'off',
    'promise/prefer-await-to-then': 'off',
    complexity: 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/sort-type-union-intersection-members': 'off',
  },
  overrides: [
    {
      files: ['{packages,examples,website}/**/*.js', '{packages,examples,website}/**/*.mjs'],
      rules: {
        'import/no-commonjs': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
      },
    },
    {
      files: ['packages/*/tests/**/*'],
      rules: {
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
    {
      files: ['packages/*/tests/examples?/**/*', 'examples/**/*'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};

export default config;
