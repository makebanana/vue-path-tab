<template>
  <el-menu
    :default-active="activePath"
    class="el-menu-vertical-demo"
    background-color="#404040"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleTargetTab">
    <el-submenu v-for="(item, index) in authMenus" :index="item.name" :key="item.path" v-if="item.child && item.child.length">
      <template slot="title"><i v-if="item.logo" :class="item.logo"></i>{{item.name}}</template>
        <el-menu-item v-for="(child, i) in item.child" :index="child.path" :key="i">
          {{child.name}}
        </el-menu-item>
    </el-submenu>
    <el-menu-item :index="item.path" :key="item.path" v-else>{{item.name}}</el-menu-item>
  </el-menu>
</template>

<script>
// import turnAuthToAllowedAndNav from '@/auth/index'

export default {
  name: 'auth-nav',
  data () {
    return {
      authMenus: [
        {
          "name": "用户管理",
          "child":[
            {
              "name": "新增用户",
              "path": "/user/add"
            },
              {
                "name": "用户列表",
                "path": "/user/list"
              }
          ]
        },
        {
          "name": "相片管理",
          "child": [
            {
              "name": "新增相片",
              "path": "/photo/add"
            },
            {
              "name": "相片列表",
              "path": "/photo/list"
            },
            {
              "name": "分类管理",
              "path": "/photo/type"
            }
          ]
        },
        {
          "name": "活动管理",
          "child":[
            {
              "name": "新增活动",
              "path": "/active/add"
            },
            {
              "name": "活动列表",
              "path": "/active/list"
            }
          ]
        },
        {
          "name": "消息管理",
          "child":[
            {
              "name": "系统消息",
              "path": "/message/message"
            },
            {
              "name": "反馈建议",
              "path": "/message/suggest"
            }
          ]
        },
        {
          "name": "数据分析",
          "child":[
            {
              "name": "相片分析",
              "path": "/analysis/photo"
            },
            {
              "name": "客户分析",
              "path": "/analysis/customer"
            }
          ]
        },
        {
          "name": "系统设置",
          "path": "/manager"
        }
      ]
    }
  },

  props: {
    activePath: String
  },

  methods: {
    // 获取权限
    getAuthToNav () {
      // this.$fetch({ url: '/api/auth' }).then(res => {
      //   let authData = turnAuthToAllowedAndNav(res.data.authMenus)
      //   this.authMenus = authData.navList
      //   this.$store.commit('updateAuth', authData.allowedList)
      // }).catch(err => {
      //   console.log(err)
      // })
    },

    // 打开tab
    handleTargetTab (tab) {
      this.$tab.open(tab)
    }
  },

  created () {
    this.getAuthToNav()
  }
}
</script>
