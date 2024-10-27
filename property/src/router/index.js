import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Home',
    component: Home,
    redirect: '/index/echarts',
    children: [
      {
        path: 'echarts',
        name: 'Echarts',
        component: () => import('../components/Echarts.vue')
      },
      {
        path: 'house/unit',
        name: 'Unit',
        component: () => import('../components/Unit.vue')
      },
      {
        path: 'house/number',
        name: 'Number',
        component: () => import('../components/Number.vue')
      },
      {
        path: 'house/deviceInfo',
        name: 'DeviceInfo',
        component: () => import('../components/DeviceInfo.vue')
      },
      {
        path: 'house/add',
        name: 'Add',
        component: () => import('../components/Add.vue')
      },
      {
        path: 'house/detail',
        name: 'Detail',
        component: () => import('../components/detail.vue')
      },
      {
        path: 'house/numAdd',
        name: 'Edit',
        component: () => import('../components/edit.vue')
      },
      {
        path: 'parking/parkMessage',
        name: 'ParkMessage',
        component: () => import('../components/ParkMessage.vue')
      },
      {
        path: 'parking/parkPay',
        name: 'ParkPay',
        component: () => import('../components/ParkPay.vue')
      },
      {
        path: 'parking/parkPay',
        name: 'ParkPay',
        component: () => import('../components/ParkPay.vue')
      },
      {
        path: 'pay/payType',
        name: 'PayType',
        component: () => import('../components/PayType.vue')
      },
      {
        path: 'pay/payMessage',
        name: 'PayMessage',
        component: () => import('../components/PayMessage.vue')
      },
      {
        path: 'service/postMessage',
        name: 'PostMessage',
        component: () => import('../components/PostMessage.vue')
      },
      {
        path: 'service/repair',
        name: 'Repair',
        component: () => import('../components/Repair.vue')
      },
      {
        path: 'service/feedback',
        name: 'Feedback',
        component: () => import('../components/Feedback.vue')
      },
      {
        path: 'user/userMessage',
        name: 'UserMessage',
        component: () => import('../components/UserMessage.vue')
      },
      {
        path: 'user/adminMessage',
        name: 'AdminMessage',
        component: () => import('../components/AdminMessage.vue')
      },
      {
        path: 'user/Message',
        name: 'Message',
        component: () => import('../components/Message.vue')
      },
      {
        path: 'menu/menuData',
        name: 'MenuData',
        component: () => import('../components/MenuData.vue')
      },
      {
        path: 'menu/menuSecond',
        name: 'menuSecond',
        component: () => import('../components/menuSecond.vue')
      },
      {
        path: 'menu/loginData',
        name: 'LoginData',
        component: () => import('../components/LoginData.vue')
      },
      {
        path: 'personal/message',
        name: 'PersonalMessage',
        component: () => import('../components/personal-message.vue')
      },
      {
        path: 'personal/change',
        name: 'Change',
        component: () => import('../components/Change.vue')
      },
      {
        path: 'personal/joinChat',
        name: 'JoinChat',
        component: () => import('../components/JoinChat.vue')
      },
      {
        path: 'pay/payAdd',
        name: 'PayAdd',
        component: () => import('../components/PayAdd.vue')
      },
      {
        path: 'pay/payDetail',
        name: 'PayDetail',
        component: () => import('../components/PayDetail.vue')
      },
      {
        path: 'service/smartRepair',
        name: 'SmartRepair',
        component: () => import('../components/SmartRepair.vue')
      },
      {
        path: 'service/houseRepair',
        name: 'HouseRepair',
        component: () => import('../components/HouseRepair.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
