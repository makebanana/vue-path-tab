
# vue-path-tab
> Use vue-path-tab just like vue-router, this.$route => this.$tab
### Introduction
`vue-path-tab` is a solution for backend to keep multiple tabs:

- Simple init, like vue-router
- Like browser, you will have a contentmenu
- Can open/close/reload a tab anywhere under the vm

Get started with the [documentation](https://github.com/makebanana/vue-path-tab), or play with the [examples](https://github.com/makebanana/vue-path-tab/tree/master/example).

- -  ![](http://upload-images.jianshu.io/upload_images/5611290-d0bc1afdd45a3881.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## how user
### install
```bash
$ npm i --save vue-path-tab
```
### init
- - ![tab/index.js](http://upload-images.jianshu.io/upload_images/5611290-0de6e32ba4c79485.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- - ![main.js](http://upload-images.jianshu.io/upload_images/5611290-70d7ff57d06b742d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```javascript
<path-tabs-view v-model="activePath" defaultPath="/user/list"></path-tabs-view>
```
### API

```
#query and params
path = '/user/:id'
temp = '/user/123?isShare=1'
this.$tab.params => { "id": "123" }
this.$tab. query => { "isShare: "1" }

# open a tab
this.$tab.open(*path)

# reload a tab
this.$tab.reload(path)

# close a tab
this.$tab.close(*path)

# close other
this.$tab.closeOther(path)

# change config name
this.$tab.setTitle(name, path)

# lock a tab
this.$tab.lock(*path)

# unlock a tab
this.$tab.unlock(*path)
```

### Statement
the base tab is fork from [element-ui/tabs](https://github.com/ElemeFE/element/tree/dev/packages/tabs)
### License
[MIT](https://opensource.org/licenses/MIT)
Copyright (c) 2013-2017 makebanana
