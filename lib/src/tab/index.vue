<template>
  <path-tabs
    v-model="activePath"
    :activeName="activePath"
    :class="className"
    :tab-position="tabPosition"
    :type="type"
    @tab-remove="onTabClose">
    <path-tab-pane
      v-for="(item, index) in tabsList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
      :closable="item.closable">
        <div v-if="!item.reloading" :is="item.component" :tabPath="item.path" :tabParams="item.params" :tabQuery="item.query"> </div>
      </path-tab-pane>
  </path-tabs>
</template>

<script>
import PathTabs from './tabs'
import PathTabPane from './tab-pane'
import Events from '../../utils/events'
import ContentMenu from '../contentmenu'
import './tab.css'
export default {
  name: 'PathTabsView',

  components: {
    PathTabs,
    PathTabPane
  },

  props: {
    defaultPath: String,
    type: {
      type: String,
      default: 'border-card'
    },
    tabPosition: {
      type: String,
      default: 'top'
    },
    className: String
  },

  data () {
    return {
      activePath: '',
      tabsList: []
    }
  },

  watch: {
    activePath (value) {
      this.$emit('input', value)
    }
  },

  methods: {

    onTabUpdate (path) {
      let tabPath = path.split('?')[0]
      // not at tabList
      if (!this.tabsList.some(item => item.path === tabPath)) {
        let newTab = this.matchTab(path)
        this.tabsList.push(newTab)
        tabPath = newTab.path
      }

      // set currentPath
      this.activePath = tabPath
    },

    matchTab (path) {
      return this.$tab.match(path)
    },

    onTabClose (path) {
      let delIndex
      let delpath
      this.tabsList = this.tabsList.filter((item, i) => {
        if (item.path === path && item.closable) {
          delIndex = i
          delpath = path

          return false
        } else {
          return true
        }
      })

      // correction path
      if (delpath) {
        if (this.tabsList.length) {
          this.activePath = this.tabsList[delIndex] ? this.tabsList[delIndex].path : this.tabsList[delIndex - 1].path
        } else {
          this.activePath = '/'
        }
      }
    },

    onTabReload (path) {
      let tabsList = this.tabsList.slice()
      let index = 0

      let matched = tabsList.some((item, i) => {
        if (item.path === path) {
          item.reloading = true
          index = i
          return true
        }
      })
      if (!matched) { return }

      this.tabsList = tabsList

      // 100s faker
      setTimeout(() => {
        let tabsList = this.tabsList.slice()
        tabsList[index].reloading = false
        this.tabsList = tabsList
      }, 100)
    },

    onTabCloseOther (path) {
      this.tabsList = this.tabsList.filter(item => item.path === path || !item.closable)
      if (path) {
        this.activePath = path
        return
      }

      let tabLength = this.tabsList.length
      if (tabLength) {
        this.activePath = this.tabsList[tabLength - 1].path
      }
    },

    onTabLock (path) {
      let tabsList = this.tabsList.slice()

      let matched = tabsList.some((item, i) => {
        if (item.path === path) {
          item.closable = false
          return true
        }
      })
      if (!matched) { return }
      this.tabsList = tabsList
    },

    onTabUnlock (path) {
      let tabsList = this.tabsList.slice()

      let matched = tabsList.some((item, i) => {
        if (item.path === path) {
          item.closable = true
          return true
        }
      })
      if (!matched) { return }
      this.tabsList = tabsList
    },

    onTabSetTile (title, path) {
      let tabsList = this.tabsList.slice()

      let matched = tabsList.some((item, i) => {
        if (item.path === path) {
          item.title = title
          return true
        }
      })
      if (!matched) { return }
      this.tabsList = tabsList
    }
  },

  created () {
    this.tabsList = this.$tab.defaultTabs
    this.$tab.defaultPath && this.onTabUpdate(this.$tab.defaultPath)
    this.defaultPath && this.onTabUpdate(this.$tab.defaultPath)

    if (this.$tab.menu instanceof ContentMenu === false && this.$tab.menu !== false) {
      this.$tab.menu = new ContentMenu(this.$tab.menu)
    }

    // 开始绑定 event 监听函数
    Events.on('PATHTABS_ADD', this.onTabUpdate)
    Events.on('PATHTABS_RELOAD', this.onTabReload)
    Events.on('PATHTABS_CLOSE', this.onTabClose)
    Events.on('PATHTABS_CLOSEOTHER', this.onTabCloseOther)
    Events.on('PATHTABS_LOCK', this.onTabLock)
    Events.on('PATHTABS_UNLOCK', this.onTabUnlock)
    Events.on('PATHTABS_SETTITLE', this.onTabSetTile)
  },

  destroyed () {
    Events.removeAllListeners()
    this.$tab.menu && this.$tab.menu.destroy()
    this.$tab.menu = undefined
  }
}
</script>
