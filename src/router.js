import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/CoachesList.vue';
import TheNavbar from './UI/TheNavbar.vue';


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
        nav: TheNavbar,
        default: CoachesList,
      }
    },
    {
      path: '/coaches/:id',
      name: 'coaches-id',
      components: {
        nav: TheNavbar,
        default: () => import('./pages/CoachDetails.vue'),        
      },
      children: [
        {
          path: 'contact',
          name: 'contact',
          components: {
            nav: TheNavbar,
            default: () => import('./pages/ContactCoach.vue'),        
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      components: {
        nav: TheNavbar,
        default: () => import('./pages/CoachRegistration.vue'),        
      } 
    },
    {
      path: '/requests',
      name: 'requests',
      components: {
        nav: TheNavbar,
        default: () => import('./pages/Requests.vue'),        
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
