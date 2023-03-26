import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/CoachesList.vue';
import TheHeader from './UI/TheHeader.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      name: 'coaches',
      components: {
        nav: TheHeader,
        default: CoachesList,
      }
    },
    {
      path: '/coaches/:id',
      name: 'coaches-id',
      components: {
        nav: TheHeader,
        default: () => import('./pages/CoachDetails.vue'),        
      },
      children: [
        {
          path: 'contact',
          name: 'contact',
          components: {
            nav: TheHeader,
            default: () => import('./pages/ContactCoach.vue'),        
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      components: {
        nav: TheHeader,
        default: () => import('./pages/CoachRegistration.vue'),        
      } 
    },
    {
      path: '/requests',
      name: 'requests',
      components: {
        nav: TheHeader,
        default: () => import('./pages/RequestsReceived.vue'),        
      } 
    },
    {
      path: '/:notFound(.*)',
      name: 'notFound',
      component: () => import('./pages/NotFound.vue')
    }
  ]
})

export default router;
