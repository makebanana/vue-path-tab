import Events from '../utils/events'
import { on, off } from '../utils/dom'

export default class ContentMenu {
  constructor (option = []) {
    this.currentPath = ''
    this.option = option

    this.init()
  }

  init () {
    let isZh = navigator.language.indexOf('zh') > -1
    this.menu = document.createElement('div')
    this.menu.className = 'path-tabs__contentmenu'
    this.ulNode = document.createElement('ul')
    this.closeNode = document.createElement('li')
    this.reloadNode = document.createElement('li')
    this.otherNode = document.createElement('li')

    this.reloadNode.innerText = this.option[0] ? this.option[0] : isZh ? '刷新' : 'REFRESH'
    this.closeNode.innerText = this.option[1] ? this.option[1] : isZh ? '关闭' : 'CLOSE'
    this.otherNode.innerText = this.option[2] ? this.option[2] : isZh ? '关闭其他' : 'CLOSE OTHER'

    this.ulNode.appendChild(this.closeNode)
    this.ulNode.appendChild(this.reloadNode)
    this.ulNode.appendChild(this.otherNode)
    this.menu.appendChild(this.ulNode)
    document.body.appendChild(this.menu)
    this.menuWidth = parseInt(window.getComputedStyle(this.menu, false).getPropertyValue('width'))

    on(this.reloadNode, 'click', this.reload)
    on(this.closeNode, 'click', this.close)
    on(this.otherNode, 'click', this.closeOther)
    on(document, 'click', this.clickOutside)
  }

  showContentmenu (oEvent, closable, path) {
    if (!path || typeof path !== 'string') { return }
    this.currentPath = path

    let winWidth = window.innerWidth
    let winHeight = window.innerHeight
    let menuHeight = 75

    if (!closable) {
      menuHeight = 50
      this.closeNode.style.display = 'none'
    } else {
      this.closeNode.style.display = ''
    }

    // flex position
    if (oEvent.clientX + this.menuWidth <= winWidth) {
      this.menu.style.left = oEvent.clientX + 'px'
    } else {
      this.menu.style.left = oEvent.clientX - this.menuWidth + 'px'
    }

    if (oEvent.clientY + menuHeight <= winHeight) {
      this.menu.style.top = oEvent.clientY + 'px'
    } else {
      this.menu.style.top = oEvent.clientY - menuHeight + 'px'
    }

    this.menu.style.display = 'block'
  }

  clickOutside = (e) => {
    if (e.srcElement.parentNode === this.ulNode) { return }
    this.hideContentmenu()
  }

  hideContentmenu = () => {
    this.menu.style.display = 'none'
  }

  reload = () => {
    this.hideContentmenu()
    if (!this.currentPath) { return }
    Events.emit('PATHTABS_RELOAD', this.currentPath)
  }

  close = () => {
    this.hideContentmenu()
    if (!this.currentPath) { return }
    Events.emit('PATHTABS_CLOSE', this.currentPath)
  }

  closeOther = () => {
    this.hideContentmenu()
    if (!this.currentPath) { return }
    Events.emit('PATHTABS_CLOSEOTHER', this.currentPath)
  }

  destroy () {
    off(this.reloadNode, 'click', this.reload)
    off(this.closeNode, 'click', this.close)
    off(this.otherNode, 'click', this.closeOther)
    off(document, 'click', this.clickOutside)
    document.body.removeChild(this.menu)
    this.menu = null
    this.ulNode = null
    this.reloadNode = null
    this.closeNode = null
    this.otherNode = null
  }
}
