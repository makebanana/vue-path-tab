<script>
  import TabNav from './tab-nav'

  export default {
    name: 'PathTabs',

    components: {
      TabNav
    },

    props: {
      type: String,
      activeName: String,
      tabPosition: {
        type: String,
        default: 'top'
      }
    },

    provide () {
      return {
        rootTabs: this
      }
    },

    data () {
      return {
        currentName: this.activeName,
        panes: []
      }
    },

    watch: {
      activeName (value) {
        this.setCurrentName(value)
      },
      currentName (value) {
        if (this.$refs.pathNav) {
          this.$nextTick(_ => {
            this.$refs.pathNav.scrollToActiveTab()
          })
        }
      }
    },

    methods: {
      handleTabClick (tab, tabName, event) {
        if (tab.disabled) return
        this.setCurrentName(tabName)
        this.$emit('tab-click', tab, event)
      },
      handleTabRemove (pane, ev) {
        if (pane.disabled) return
        ev.stopPropagation()
        this.$emit('edit', pane.name, 'remove')
        this.$emit('tab-remove', pane.name)
      },
      handleTabAdd () {
        this.$emit('edit', null, 'add')
        this.$emit('tab-add')
      },
      setCurrentName (value) {
        this.currentName = value
        this.$emit('input', value)
      },
      addPanes (item) {
        const index = this.$slots.default.filter(item => {
          return item.elm.nodeType === 1 && /\bpath-tab-pane\b/.test(item.elm.className)
        }).indexOf(item.$vnode)
        this.panes.splice(index, 0, item)
      },
      removePanes (item) {
        const panes = this.panes
        const index = panes.indexOf(item)
        if (index > -1) {
          panes.splice(index, 1)
        }
      }
    },
    render (h) {
      let {
        type,
        handleTabClick,
        handleTabRemove,
        currentName,
        panes,
        tabPosition
      } = this

      const navData = {
        props: {
          currentName,
          onTabClick: handleTabClick,
          onTabRemove: handleTabRemove,
          type,
          panes
        },
        ref: 'pathNav'
      }
      const header = (
        <div class="path-tabs__header">
          <tab-nav { ...navData }></tab-nav>
        </div>
      )
      const panels = (
        <div class="path-tabs__content">
          {this.$slots.default}
        </div>
      )

      return (
        <div class={{
          'path-tabs': true,
          'path-tabs--card': type === 'card',
          [`path-tabs--${tabPosition}`]: true,
          'path-tabs--border-card': type === 'border-card'
        }}>
          { tabPosition !== 'bottom' ? [header, panels] : [panels, header] }
        </div>
      )
    },
    created () {
      if (!this.currentName) {
        this.setCurrentName('/')
      }
    }
  }
</script>
