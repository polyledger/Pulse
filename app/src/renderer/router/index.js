import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/coins',
      name: 'coins',
      component: require('@/components/Coins')
    },
    {
      path: '/coins/:symbol',
      name: 'coin',
      component: require('@/components/Coin')
    },
    {
      path: '*',
      redirect: '/coins'
    }
  ]
})
