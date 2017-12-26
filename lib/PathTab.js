import { assert } from './utils/log'
import Events from './utils/events'
import install from './src/install'
import pathToRegexp from 'path-to-regexp'
import queryString from 'querystring'

export default class PathTab {
  constructor (options) {
    this.pathList = []
    this.defaultTabs = []
    this.defaultPath = ''
    this.noMatch = {}
    this.menu = options.contextmenu

    assert(Array.isArray(options.path), 'you should set Array for path')
    options.path.forEach(item => {
      item.closable = typeof item.closable === 'undefined' ? true : item.closable
      item.keys = []
      item.re = item.path.indexOf(':') > -1 ? pathToRegexp(item.path, item.keys) : null
      this.pathList.push(item)

      if (item.isDefault) {
        this.defaultTabs.push(item)
        this.defaultPath = item.path
      }

      if (item.isNoMatch && !this.noMatch.path) {
        this.noMatch = item
      }
    })

    this.noMatch = this.noMatch.path ? this.noMatch : {
      path: '/vue_pathtab_nomatch',
      title: 'no match',
      closable: true
    }
  }

  match (path) {
    assert(typeof path === 'string' && path, 'you should sure path is string without empty')
    let newTab = this.noMatch
    let toPath = path.split('?')[0]
    let query = path.split('?')[1] ? queryString.parse(path.split('?')[1]) : null
    this.pathList.some(item => {
      if (item.re) {
        if (item.re.exec(toPath)) {
          newTab = Object.assign({}, item, { path: toPath, params: {}, query })
          item.re.exec(toPath).forEach((param, i) => {
            if (!i) { return }
            newTab.params[item.keys[i - 1].name] = param
          })

          return true
        }
      }

      if (toPath === item.path) {
        newTab = Object.assign({}, item, { query })
        return true
      }
    })

    return newTab
  }

  open (config) {
    Events.emit('PATHTABS_ADD', config)
  }

  reload (path = this.path) {
    Events.emit('PATHTABS_RELOAD', path)
  }

  close (path = this.path) {
    Events.emit('PATHTABS_CLOSE', path)
  }

  closeOther (path = this.path) {
    Events.emit('PATHTABS_CLOSEOTHER', path)
  }

  lock (path = this.path) {
    Events.emit('PATHTABS_LOCK', path)
  }

  unlock (path = this.path) {
    Events.emit('PATHTABS_UNLOCK', path)
  }

  setTitle (name, path = this.path) {
    if (!path) { return }
    Events.emit('PATHTABS_SETTITLE', name, path)
  }
}

PathTab.install = install
if (window.Vue) {
  window.Vue.use(PathTab)
}
