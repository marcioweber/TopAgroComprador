import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from '@/router/auth-guard'
// pages
import HelloWorld from '@/pages/HelloWorld'
import Home from '@/pages/Home'
import Signin from '@/pages/User/Signin'
import Signup from '@/pages/User/Signup'

// Admin Components
import IndexAdmin from '@/pages/admin/IndexAdmin'

import Comprador from '@/pages/admin/comprador/Comprador'
import Ofertas from '@/pages/admin/ofertas/Ofertas'
import Pedidos from '@/pages/admin/pedidos/Pedidos'

//import Vendedor from '@/pages/admin/vendedor/Vendedor'
//import Fornecedor from '@/pages/admin/fornecedor/Fornecedor'
//import Produto from '@/pages/admin/produto/Produto'
//import Pedido from '@/pages/admin/pedido/Pedido'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'Admin',
      // Parent routes still has a component
      component: IndexAdmin,
      //beforeEnter: AuthGuard,
      // Child routes
      children: [
        {
          path: '/comprador',
          name: 'Comprador',
          beforeEnter: AuthGuard,
          component: Comprador
        },
        {
          path: '/ofertas',
          name: 'Ofertas',
          beforeEnter: AuthGuard,
          component: Ofertas
        },
        {
          path: '/pedidos',
          name: 'Pedidos',
          beforeEnter: AuthGuard,
          component: Pedidos
        }/*,        
        /*,
        {
          path: '/vendedor',
          name: 'Vendedor',
          beforeEnter: AuthGuard,
          component: Vendedor
        },
        {
          path: '/fornecedor',
          name: 'Fornecedor',
          beforeEnter: AuthGuard,
          component: Fornecedor
        },
        {
          path: '/produto',
          name: 'Produto',
          beforeEnter: AuthGuard,
          component: Produto
        },
        {
          path: '/pedido',
          name: 'Pedido',
          beforeEnter: AuthGuard,
          component: Pedido
        }*/

      ]
    }
  ]
})
