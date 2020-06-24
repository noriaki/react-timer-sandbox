/*
 * Usage:
 *
 *  $ yarn add --dev typescript // to avoid errors in `npx eslint --init`
 *  $ npx eslint --init         // select options and npm install (airbnb, ts)
 *  $ yarn add --dev eslint-config-airbnb-typescript // decorate airbnb with ts
 *  $ rm package-lock.json      // to not using npm
 *  $ yarn install              // to generate yarn.lock
 *  $ yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier
 *  $ touch .eslintrc.js        // and edit (this file)
 *  $ touch prettier.config.js  // and edit
 *
 */

// const allowExtensions = ['.ts', '.tsx', '.d.ts', '.js', '.jsx'];

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    // jest: true, // included in 'plugin:jest/recommended'
  },
  settings: {
    // 'import/extensions': allowExtensions, // included in 'plugin:airbnb-typescript'
    'import/resolver': {
      // node: { extensions: [...allowExtensions, '.json'] }, // included in 'plugin:airbnb-typescript'
      typescript: { alwaysTryTypes: true },
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  extends: [
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs
    'eslint:recommended',
    // https://github.com/iamturns/eslint-config-airbnb-typescript#i-wish-this-config-would-support-
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // https://github.com/jest-community/eslint-plugin-jest#recommended
    'plugin:jest/recommended',
    'plugin:jest/style',
    // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  // plugins: [
  //   '@typescript-eslint', // included in 'plugin:@typescript-eslint/recommended'
  //   'import',             // included in 'airbnb'
  //   'react-hooks',        // included in 'airbnb/hooks'
  //   'jest',               // included in 'plugin:jest/recommended'
  //   'prettier',           // included in 'plugin:prettier/recommended'
  // ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'react/prop-types': 'off',
    'no-restricted-syntax': 'off',
  },
};
