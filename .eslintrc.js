module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    'standard-jsx',
    'standard-with-typescript',
    'plugin:jest/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'jest',
    'detox'
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/camelcase": "off",
    'import-helpers/order-imports': [
      'warn',
      {
          newlinesBetween: 'always',
          groups: [
              '/^react/',
              '/^react-native/',
              '/styles/',
              'module',
              ['parent','sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true }
      }
  ]
    // "@typescript-eslint/no-misused-promises": [
    //   "error",
    //   {
    //     "checksVoidReturn": false
    //   }
    // ]
  }
}
