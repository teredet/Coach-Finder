import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/CoachesList.vue';
import TheHeader from './components/layout/TheHeader.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      components: {
        nav: TheHeader,
        default: CoachesList,
      }
    },
    {
      path: `/coaches/:id`,
      name: 'coaches-details',
      props: true,
      components: {
        nav: TheHeader,
        default: () => import('./pages/CoachDetails.vue'),        
      },
      children: [
        {
          path: 'contact',
          component: () => import('./pages/ContactCoach.vue')
        }
      ]
    },
    {
      path: '/register',
      components: {
        nav: TheHeader,
        default: () => import('./pages/CoachRegistration.vue'),        
      },
      meta: {requiresAuth: true} 
    },
    {
      path: '/requests',
      components: {
        nav: TheHeader,
        default: () => import('./pages/RequestsReceived.vue'),        
      },
      meta: {requiresAuth: true}  
    },
    {
      path: '/auth',
      components: {
        nav: TheHeader,
        default: () => import('./pages/UserAuth.vue'),        
      },
      meta: {requiresUnauth: true} 
    },
    {
      path: '/:notFound(.*)',
      name: 'notFound',
      component: () => import('./pages/NotFound.vue')
    }
  ]
})

router.beforeEach((to, _1, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) next('/auth');
  else if (to.meta.requiresUnauth && store.getters.isAuthenticated) next('/coaches');
  else next();
})

export default router;
