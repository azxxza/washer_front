import Main from '@/view/main'
import parentView from '@/components/parent-view'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/device',
    name: 'device',
    meta: {
      title: '设备管理'
    },
    component: Main,
    children: [
      {
        path: 'install',
        name: 'device_install',
        meta: {
          title: '安装信息管理'
        },
        component: () => import('@/view/business/install/install.vue')
      },
      {
        path: 'pay',
        name: 'device_cost',
        meta: {
          title: '费用管理'
        },
        component: () => import('@/view/business/cost/cost.vue')
      },
      {
        path: 'lease',
        name: 'device_lease',
        meta: {
          title: '租赁管理'
        },
        component: () => import('@/view/business/lease/lease.vue')
      },
      {
        path: 'fault',
        name: 'business_report_fault',
        meta: {
          title: '故障管理'
        },
        component: () => import('@/view/business/fault/fault.vue')
      },
    ]
  },
  {
    path: '/client',
    name: 'client',
    meta: {
      title: '客户管理'
    },
    component: Main,
    children: [
      {
        path: 'wechat_users',
        name: 'client_wechat_users',
        meta: {
          title: '消费者管理'
        },
        component: () => import('@/view/business/wechat_users/wechat_users.vue')
      },
      {
        path: 'pay_info',
        name: 'client_pay_info',
        meta: {
          title: '消费明细'
        },
        component: () => import('@/view/business/pay_info/pay_info.vue')
      },
    ]
  },
  {
    path: '/profit',
    name: 'profit',
    meta: {
      title: '收益报表'
    },
    component: Main,
    children: [
      {
        path: 'prestatistics',
        name: 'profit_prestatistics',
        meta: {
          title: '收益统计报表'
        },
        component: () => import('@/view/business/profit/profit.vue')
      }
    ]
  },
  {
    path: '/business_report',
    name: 'business_report',
    meta: {
      title: '业务报表'
    },
    component: Main,
    children: [
      {
        path: 'idle_device',
        name: 'business_report_idle_device',
        meta: {
          title: '闲置机报表'
        },
        component: () => import('@/view/business/idle_device/idle_device.vue')
      },
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '系统设置'
    },
    component: Main,
    children: [
      {
        path: 'car',
        name: 'settting_car',
        meta: {
          title: '设备信息管理'
        },
        component: () => import('@/view/business/car/car.vue')
      },
      {
        path: 'customer',
        name: 'settting_customer',
        meta: {
          title: '客服管理'
        },
        component: () => import('@/view/business/customer/customer.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: Main,
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: 'user',
        name: 'system_user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/view/system/user/user.vue')
      },
      {
        path: 'role',
        name: 'system_role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/view/system/role/role.vue')
      },
      {
        path: 'menu',
        name: 'system_menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('@/view/system/perm/perm.vue')
      },
      {
        path: 'log',
        name: 'system_log',
        meta: {
          title: '日志管理'
        },
        component: () => import('@/view/system/log/log.vue')
      },
      {
        path: 'monitor',
        name: 'system_monitor',
        meta: {
          showAlways: true,
          title: '监控管理'
        },
        component: parentView,
        children: [
          {
            path: 'exp',
            name: 'system_monitor_exp',
            meta: {
              title: '异常管理',

            },
            component: () => import('@/view/system/monitor/exp/expRecordLog.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
