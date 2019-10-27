var path = require('path');

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, './src')],
        extensions: ['.js', '.json'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['draftContext'] },
    ],
  },
  env: {
    jest: true,
  },
  globals: {
    window: true,
    document: true,
    navigator: true,
    cy: true,
  },
};
