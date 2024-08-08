import pluginVue from 'eslint-plugin-vue';
import js from '@eslint/js';
// import ts from 'typescript-eslint';

export default [
  {
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 0
    }
  },
  js.configs.recommended
  // ...ts.configs.recommended // TODO: uncomment once ESLint 9 is properly supported
];
