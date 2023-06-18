module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'qb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'new-cap': 'off',
    'no-await-in-loop': 'off',
    'no-useless-constructor': 'off',
    'no-console': 'off',
    'id-denylist': 'off',
    'no-shadow': 'off',
    'no-magic-numbers': 'off',
    'max-lines-per-function': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'id-length': 'off',
    'require-await': 'off'
  },
};
