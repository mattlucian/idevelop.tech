import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // On initial page load (no 'from' route), always scroll to top
    if (!from.name) {
      return { top: 0 }
    }

    // If navigating to the same route (e.g., query param changes on home page)
    if (to.name === from.name) {
      // Don't scroll, keep current position
      return false
    }

    // If navigating between home and service-detail routes, preserve scroll
    // These routes use related components and should maintain scroll position
    const servicesRoutes = ['home', 'service-detail']
    if (
      servicesRoutes.includes(to.name as string) &&
      servicesRoutes.includes(from.name as string)
    ) {
      // Explicitly preserve the current scroll position
      return { left: window.scrollX, top: window.scrollY }
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
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/services/:serviceId',
      name: 'service-detail',
      component: () => import('../views/ServiceView.vue'),
    },
    {
      path: '/hire-me',
      name: 'hire-me',
      component: () => import('../views/HireMeView.vue'),
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/ComponentView.vue'),
    },
    {
      path: '/tech',
      name: 'tech',
      component: () => import('../views/TechView.vue'),
    },
    {
      path: '/attributions',
      name: 'attributions',
      component: () => import('../views/AttributionsView.vue'),
    },
  ],
})

export default router
