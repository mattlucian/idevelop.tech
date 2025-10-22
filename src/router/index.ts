import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // If navigating to the same route (e.g., query param changes on home page)
    if (to.name === from.name) {
      // Don't scroll, keep current position
      return false
    }
    // For back/forward navigation, restore saved position
    if (savedPosition) {
      return savedPosition
    }
    // For new navigation, scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/hire-me',
      name: 'hire-me',
      component: () => import('../views/HireMeView.vue'),
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/ComponentShowcase.vue'),
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/ExperienceView.vue'),
    },
  ],
})

export default router
