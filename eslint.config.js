import pluginVue from 'eslint-plugin-vue';
import js from '@eslint/js';
import ts from 'typescript-eslint';

export default [
  {
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  ...ts.config(js.configs.recommended, ...ts.configs.recommended),
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/max-attributes-per-line': 0,
      'vue/valid-v-slot': [
        'error',
        {
          allowModifiers: true
        }
      ]
    }
  }
];
