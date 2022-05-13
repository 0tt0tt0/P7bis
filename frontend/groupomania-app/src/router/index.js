import { createRouter, createWebHashHistory } from 'vue-router'
import RegisterBox from '@/components/RegisterBox.vue'
import LoginBox from '@/components/LoginBox.vue'
import AuthView from '../views/AuthView.vue'
import ForumView from '../views/ForumView.vue'
import UserView from '../views/UserView.vue'

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
      component: RegisterBox,
      meta: {
        title: "S'enregistrer",
      }
    },
    {
      path: 'login',
      name: 'login',
      component: LoginBox,
      meta: {
        title: "Se connecter",
      }
    },
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
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
