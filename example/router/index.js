import Vue from 'vue'
import Router from 'vue-router'

const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'chunk_login')
const Layout = r => require.ensure([], () => r(require('@/pages/Layout')), 'chunk_layout')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Layout
    }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('V_accessToken') && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

export default router
