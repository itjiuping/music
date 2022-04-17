import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/discover.vue')
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('../views/discover.vue')
  },
  {
    path: '/songlist',
    name: 'songlist',
    component: () => import('../views/songlist.vue')
  },
  {
    path: '/songs',
    name: 'songs',
    component: () => import('../views/songs.vue')
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: () => import('../views/mvs.vue')
  },
  //搜索页面
  {
    path: '/result/:aid',
    name: 'result',
    component: () => import('../views/result.vue')
  },
  //音乐详情页
  {
    path: '/playlist/:aid',
    name: 'playlist',
    component: () => import('../views/playlist.vue')
  },
  //mv详情页
  {
    path: '/mv/:aid',
    name: 'mv',
    component: () => import('../views/mv.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
