import {createRouter, createWebHistory} from 'vue-router'
import {useAuth} from "@/composables/useAuth.ts";
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue';
import ElectionView from "@/views/ElectionView.vue";
import UnauthorizedView from "@/views/errors/UnauthorizedView.vue";
import NotFoundView from "@/views/errors/NotFoundView.vue";
import UserView from "../views/user/UserView.vue";
import {getRoles} from "../repositories/auth.ts";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false,
      roles: ''
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
      roles: ''
    }
  },
  {
    path: '/election/:id',
    name: 'election',
    component: ElectionView,
    meta: {
      requiresAuth: false,
      roles: ''
    }
  },
  {
    path: '/user/:username',
    name: 'userPage',
    component: UserView,
    meta: {
      requiresAuth: true,
      roles: ''
    }
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedView,
    meta: {
      requiresAuth: false,
      roles: ''
    }
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFoundView,
    meta: {
      requiresAuth: false,
      roles: ''
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
router.beforeEach((to, from) => {
  if (!to.meta.requiresAuth) {
    return true;
  } else {
    const auth = useAuth();
    if (!auth.isAuthenticated.value) {
     return {name: 'login'};
    } else {
      const roles = getRoles();
      if (to.meta.roles && !roles.includes(to.meta.role as string)) {
        return {name: 'unauthorized'};
      }
    }
  }


})

export default router
