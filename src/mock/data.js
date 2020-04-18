import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'

export const routersData = [{
  path: '/pet',//访问路径
  name: 'Pet',//路由的名字，这个与i18n有关，需要唯一
  meta: {
    title: '宠物',//标题
    hideInMenu: false,//是否在左侧导航菜单隐藏
    icon: 'logo-freebsd-devil'//图标
  },
  component: 'components/main',//组件文件路径，不需要Import
  children: [{//嵌套路由
    path: 'cat',
    name: 'Cat',
    meta: {
      title: '猫咪',
      hideInMenu: false,
      icon: 'ios-cloudy-night'
    },
    component: 'view/pet/cat/Cat.vue'
  }, {
    path: 'dog',
    name: 'Dog',
    meta: {
      hideInMenu: false,
      title: '狗娃',
      icon: 'ios-color-filter'
    },
    component: 'view/pet/dog/Dog.vue'
  }, {
    path: 'pig',
    name: 'Pig',
    meta: {
      hideInMenu: false,
      title: '猪啊',
      icon: 'ios-contact'
    },
    component: 'view/pet/pig/Pig.vue',
    children: [
      {
        path: 'female',
        name: 'Female',
        meta: {
          hideInMenu: false,
          title: '母猪',
          icon: 'ios-contact'
        },
        component: 'view/pet/pig/Pig.vue',
      },
      {
        path: 'male',
        name: 'Male',
        meta: {
          hideInMenu: false,
          title: '公猪',
          icon: 'ios-contact'
        },
        component: 'view/pet/pig/Pig.vue',
      }
    ]
  }]}]
