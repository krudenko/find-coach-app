import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

// To import component only when needed
const CoachDetail = defineAsyncComponent(() =>
  import('./pages/coaches/CoachDetail.vue')
);
const CoachRegistration = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegistration.vue')
);
const ContactCoach = defineAsyncComponent(() =>
  import('./pages/requests/ContactCoach.vue')
);
const RequestsReceived = defineAsyncComponent(() =>
  import('./pages/requests/RequestsReceived.vue')
);
const UserAuth = defineAsyncComponent(() =>
  import('./pages/auth/UserAuth.vue')
);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true, // 'id' will be passed as a prop to CoachDetail
      children: [
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

// Global navigation guard
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth'); // Redirect to '/auth'
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches'); // Redirect to '/coaches'
  } else {
    next(); // Redirect to the planned route
  }
});

export default router;
