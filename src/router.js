import { createRouter, createWebHistory } from 'vue-router'


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
      component: null
    },
    {
      path: '/coaches/:id',
      name: 'coaches-id',
      component: null,
      children: [
        {
          path: 'contact',
          name: 'contact',
          component: null
        }
      ]
    },
    {
      path: '/register',
      name: 'coaches-id',
      component: null
    },
    {
      path: '/requests',
      name: 'requests',
      component: null
    },
    {
      path: '/:notFound(.*)',
      name: 'notFound',
      component: null
    }
  ]
})

export default router;
