import { createApp, defineAsyncComponent } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import BaseCard from './components/layout/ui/BaseCard.vue';
import BaseButton from './components/layout/ui/BaseButton.vue';
import BaseBadge from './components/layout/ui/BaseBadge.vue';
import BaseSpinner from './components/layout/ui/BaseSpinner.vue';

// To import component only when needed
const BaseDialog = defineAsyncComponent(() =>
  import('./components/layout/ui/BaseDialog.vue')
);

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
