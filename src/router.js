import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('./views/Welcome/Welcome.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/List/List.vue'),
    },
    {
      path: '/dead',
      name: 'dead',
      component: () => import('./views/Dead/Dead.vue'),
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('./views/New/New.vue'),
    },
    {
      path: '/plant/:plantId/edit',
      name: 'edit',
      component: () => import('./views/Edit/Edit.vue'),
      props: true,
    },
    {
      path: '/plant/:plantId',
      name: 'plant',
      component: () => import('./views/PlantDetail/PlantDetail.vue'),
      props: true,
    },
  ],
})

export default router
