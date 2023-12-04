module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'playwright'],
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
}
