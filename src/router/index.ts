import {createRouter, createWebHistory} from 'vue-router'
import {useAuth} from "@/composables/useAuth.ts";
import HomeView from '@/views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ElectionView from "@/views/ElectionView.vue";
import UnauthorizedView from "@/views/errors/UnauthorizedView.vue";
import NotFoundView from "@/views/errors/NotFoundView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/election/:id',
    name: 'election',
    component: ElectionView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFoundView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
  } else {
    const auth = useAuth();
    if (!auth.isAuthenticated.value) {
      next('/login');
    } else {
      const roles = getRoles();
      if (to.meta.roles && !roles.includes(to.meta.role)) {
        next('/unauthorize');
      }
    }
  }

})

export default router
