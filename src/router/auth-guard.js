import store from '../store'

export default (to, from, next) => {
  console.log('auth-guard')
  if (to.fullPath === '/logout') { store.dispatch('logout') }
  if (store.getters.user) {
    next()
  } else {
    if (to.fullPath !== '/logout') {
      localStorage.setItem('toNext',to.fullPath);
    }
    next('/signin')
  }
}
