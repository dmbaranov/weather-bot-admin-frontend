import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/inconsistent-naming': 'off',
      'fsd/insignificant-slice': 'off' // this rule is disabled to have a "feeling of a big project"
    }
  }
]);
