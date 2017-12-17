import PathTab from '../../vue-path-tab'
import Vue from 'vue'

Vue.use(PathTab)
/*
* tab 显示路由分配
* 参数说明
* @params title       tab title
* @params component  tab component
*/
const path = [
  {
    path: '/',
    title: '首页',
    component: r => require.ensure([], () => r(require('@/pages/Center')), 'chunk_center'),
    closable: false,
    isDefault: true
  },
  {
    path: '/nofind',
    title: '没有找到',
    component: r => require.ensure([], () => r(require('@/pages/NoFind')), 'chunk_nofind')
  },
  {
    path: '/user/add',
    title: '新增用户',
    component: r => require.ensure([], () => r(require('@/pages/User/Add')), 'chunk_user_add')
  },
  {
    path: '/user/list',
    title: '用户列表',
    component: r => require.ensure([], () => r(require('@/pages/User/List')), 'chunk_user_list')
  },
  {
    path: '/user/:id',
    title: '用户详情',
    component: r => require.ensure([], () => r(require('@/pages/User/Detail')), 'chunk_user_detail')
  },
  {
    path: '/photo/add',
    title: '新增相片',
    component: r => require.ensure([], () => r(require('@/pages/Photo/List')), 'chunk_photo_add')
  },
  {
    path: '/photo/list',
    title: '相片列表',
    component: r => require.ensure([], () => r(require('@/pages/Photo/List')), 'chunk_photo_list')
  },
  {
    path: '/photo/type',
    title: '分类列表',
    component: r => require.ensure([], () => r(require('@/pages/Photo/Type')), 'chunk_photo_type')
  },
  {
    path: '/photo/:id',
    title: '相片详情',
    component: r => require.ensure([], () => r(require('@/pages/Photo/Edit')), 'chunk_photo_edit')
  },
  {
    path: '/message/message',
    title: '系统消息',
    component: r => require.ensure([], () => r(require('@/pages/Message/Message')), 'chunk_message_message')
  },
  {
    path: '/message/suggest',
    title: '反馈建议',
    component: r => require.ensure([], () => r(require('@/pages/Message/suggest')), 'chunk_message_suggest')
  },
  {
    path: '/active/add',
    title: '新增活动',
    component: r => require.ensure([], () => r(require('@/pages/Activity/Add')), 'chunk_active_add')
  },
  {
    path: '/active/list',
    title: '活动列表',
    component: r => require.ensure([], () => r(require('@/pages/Activity/List')), 'chunk_active_list')
  },
  {
    path: '/active/:id',
    title: '活动详情',
    component: r => require.ensure([], () => r(require('@/pages/Activity/Edit')), 'chunk_active_edit')
  },
  {
    path: '/analysis/photo',
    title: '相片分析',
    component: r => require.ensure([], () => r(require('@/pages/Analysis/Photo')), 'chunk_analysis_photo')
  },
  {
    path: '/analysis/customer',
    title: '客户分析',
    component: r => require.ensure([], () => r(require('@/pages/Analysis/Customer')), 'chunk_analysis_customer')
  },
  {
    path: '/manager',
    title: '管理员管理',
    component: r => require.ensure([], () => r(require('@/pages/System/Manager')), 'chunk_system_manager')
  }
]

const pathTab = new PathTab({
  path
})

export default pathTab
