module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'on',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': ['error'],
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'comma-dangle': [2, 'only-multiline'],
    'no-trailing-spaces': [2],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-boolean-value': [0],
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 2,
    'space-before-function-paren': 0,
    'object-curly-newline': ['error', 'never'],
  },
}
