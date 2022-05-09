import { createRouter, createWebHashHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import AuthView from '../views/AuthView.vue'
import ForumView from '../views/ForumView.vue'
import UserUpdate from '@/components/UserUpdate.vue'

const routes = [
  {
    path: '/',
    redirect: userToken => {
      userToken = localStorage.getItem('token');
      if(!userToken){
        return '/auth/login'
      }
      return 'forum'
    },
    name: 'index',
    meta: {
      title: "Groupomania",
    }
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView,
    meta: {
      title: "Home",
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    children:[{
      path: 'register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: "S'enregistrer",
      }
    },
    {
      path: 'login',
      name: 'login',
      component: LoginView,
      meta: {
        title: "Se connecter",
      }
    },
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: UserUpdate,
    meta: {
      title: "Profil",
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
