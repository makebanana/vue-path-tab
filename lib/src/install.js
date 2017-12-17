import PathTabsView from './tab/index'

/* istanbul ignore next */
export default function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  Vue.mixin({
    beforeCreate: function () {
      if (this.$options.pathTab) {
        this._pathTabRoot = this
        this._pathTab = this.$options.pathTab
      } else {
        this._pathTabRoot = (this.$parent && this.$parent._pathTabRoot) || this
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$tab', {
    get () {
      this._pathTabRoot._pathTab.path = this.$attrs.tabPath
      this._pathTabRoot._pathTab.query = this.$attrs.tabQuery
      this._pathTabRoot._pathTab.params = this.$attrs.tabParams
      return this._pathTabRoot._pathTab
    }
  })

  Vue.component(PathTabsView.name, PathTabsView)
}
