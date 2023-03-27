import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/CoachesList.vue';
import TheHeader from './components/layout/TheHeader.vue';


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
          components: {
            nav: TheHeader,
            default: () => import('./pages/ContactCoach.vue'),        
          }
        }
      ]
    },
    {
      path: '/register',
      components: {
        nav: TheHeader,
        default: () => import('./pages/CoachRegistration.vue'),        
      } 
    },
    {
      path: '/requests',
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
