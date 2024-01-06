import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { mdi, aliases } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import router from './router';
import { customIconSet } from './utils';
import './styles/main.scss';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    aliases,
    sets: {
      mdi,
      custom: customIconSet
    }
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueQueryPlugin);

app.mount('#app');
