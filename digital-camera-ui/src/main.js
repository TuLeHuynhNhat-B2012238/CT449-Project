import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      logged: false,
    };
  },
});

const app = createApp(App);

app.use(router).use(store);

app.mount('#app');
