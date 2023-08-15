import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    meta: { title: '云愈心理' },
    component: resolve => require(['../views/login/index.vue'], resolve)
  },
  {
    path: '/home',
    name: '首页',
    meta: { title: '首页' },
    component: resolve => require(['../views/home/index.vue'], resolve)
  },
  {
    path: '/cbt-more',
    name: '心理疏导',
    meta: { title: '心理疏导' },
    component: resolve => require(['../views/cbt-more/index.vue'], resolve)
  },
  {
    path: '/train',
    name: '专题训练',
    meta: { title: '专题训练' },
    component: resolve => require(['../views/train/index.vue'], resolve)
  },
  {
    path: '/test-more',
    name: '更多测试',
    meta: { title: '测试' },
    component: resolve => require(['../views/test-more/index.vue'], resolve)
  },
  {
    path: '/search',
    name: '搜索',
    meta: { title: '测试' },
    component: resolve => require(['../views/search/search.vue'], resolve)
  },
  {
    path: '/test-oldIndex',
    name: '更多测试-old',
    meta: { title: '测试' },
    component: resolve => require(['../views/test-more/oldIndex.vue'], resolve)
  },
  {
    path: '/order-detail',
    name: '订单详情',
    meta: { title: '订单详情' },
    component: resolve => require(['../views/order-detail/index.vue'], resolve)
  },
  {
    path: '/test-detail',
    name: '量表详情',
    meta: { title: '量表详情' },
    component: resolve => require(['../views/test-detail/index.vue'], resolve)
  },
  {
    path: '/test-do-infos',
    name: '测试-个人信息',
    meta: { title: '填写个人信息' },
    component: resolve => require(['../views/test-do/test-do-infos/index.vue'], resolve)
  },
  {
    path: '/test-do-start',
    name: '测试-测试须知',
    meta: { title: '测试须知' },
    component: resolve => require(['../views/test-do/test-do-start/index.vue'], resolve)
  },
  {
    path: '/test-do-self',
    name: '测试-自评量表',
    meta: { title: '测试' },
    component: resolve => require(['../views/test-do/test-do-self/index.vue'], resolve)
  },
  {
    path: '/test-do-other',
    name: '测试-他评量表',
    meta: { title: '测试' },
    component: resolve => require(['../views/test-do/test-do-other/index.vue'], resolve)
  },
  {
    path: '/test-do-fadi',
    name: '测试-他评量表-fadi',
    meta: { title: '测试' },
    component: resolve => require(['../views/test-do/test-do-fadi/index.vue'], resolve)
  },
  {
    path: '/test-report',
    name: '测试-量表报告',
    meta: { title: '云愈心理测试报告' },
    component: resolve => require(['../views/test-do/test-report/index.vue'], resolve)
  },
  {
    path: '/test-do-wait',
    name: '测试-等待',
    meta: { title: '测试' },
    component: resolve => require(['../views/test-do/test-do-wait/index.vue'], resolve)
  },
  {
    path: '/my-contact',
    name: '我的-联系客服',
    meta: { title: '云愈心理' },
    component: resolve => require(['../views/my/my-contact/index.vue'], resolve)
  },
  {
    path: '/my-index',
    name: '我的',
    meta: { title: '云愈心理' },
    component: resolve => require(['../views/my/my-index/index.vue'], resolve)
  },
  {
    path: '/my-infos',
    name: '我的-个人信息',
    meta: { needLogin: true, title: '云愈心理' },
    component: resolve => require(['../views/my/my-infos/index.vue'], resolve)
  },
  {
    path: '/my-star',
    name: '我的-我的收藏',
    meta: { needLogin: true, title: '云愈心理' },
    component: resolve => require(['../views/my/my-star/index.vue'], resolve)
  },
  {
    path: '/my-bind',
    name: '我的-机构绑定',
    meta: { needLogin: true, title: '云愈心理' },
    component: resolve => require(['../views/my/my-bind/index.vue'], resolve)
  },
  {
    path: '/cbt-record',
    name: '我的-测试记录',
    meta: { needLogin: true, title: '云愈心理' },
    component: resolve => require(['../views/my/cbt-record/index.vue'], resolve)
  },
  {
    path: '/my-record',
    name: '我的-测试记录',
    meta: { needLogin: true, title: '云愈心理' },
    component: resolve => require(['../views/my/record/index.vue'], resolve)
  },
  // {
  //   path: '/tests',
  //   name: '环境检测',
  //   component: resolve => require(['../views/tests/index.vue'], resolve)
  // },
  {
    path: '/tests',
    name: '环境检测',
    component: resolve => require(['../views/tests/index.vue'], resolve)
  },
  {
    path: '/testing',
    name: '授权测试',
    meta: { title: '授权测试' },
    component: resolve => require(['../views/testing/index.vue'], resolve)
  },
  {
    path: '/environment',
    name: '环境测试',
    meta: { title: '环境测试' },
    component: resolve => require(['../views/test-environmental/index.vue'], resolve)
  },
  {
    path: '/cbt-detail',
    name: 'cbt课程详情',
    meta: { title: '课程详情' },
    component: resolve => require(['../views/cbt-detail/index.vue'], resolve)
  }
]

const router = new VueRouter({
  routes
})

// let init = false
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || '云愈心理'
  // 只有fadi不会自动关闭
  // if (from.path === '/test-do-fadi') {
  //   if (window.mediaStream) {
  //     window.mediaStream.getTracks().forEach((track) => {
  //       track.stop()
  //     })
  //     window.mediaStream = null
  //   }
  // }
  // if (!init) {
  //   try {
  //     await store.dispatch('getToken')
  //     init = true
  //     next()
  //   } catch (err) {
  //     // 登录过期
  //     if (err.code === 605) {
  //       // init = false
  //       next()
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   next()
  // }
  next()
})

export default router
