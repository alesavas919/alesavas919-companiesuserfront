import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*{
      path: '/start-test',
      name: 'home',
      component: HomeView,
    },*/
    {
      path:'/',
      name:"companies",
      component: () => import('../components/Companies.vue'),
    },
    {
      path: '/start-test/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/HelloWorld.vue'),
    },

  ],
})

export default router
