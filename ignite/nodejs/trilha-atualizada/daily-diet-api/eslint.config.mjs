import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@stylistic': stylistic,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/max-len': ['warn', {
        ignoreComments: true,
        ignoreUrls: true,
      }],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/member-delimiter-style': ['error', {
        'multiline': {
          'delimiter': 'none',
        },
        'singleline': {
          'delimiter': 'comma',
          'requireLast': false,
        },
        'multilineDetection': 'brackets',
      }],
      '@stylistic/arrow-parens': 'error',
      '@stylistic/space-before-blocks': 'error',
    },
  },
)