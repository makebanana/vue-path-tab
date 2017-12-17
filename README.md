
# vue-path-tab

### 后台管理系统 多开tab 解决方案
>  - 保存每一个tab的状态
> - 可以在任意情况下，打开一个tab，也可任意关闭（还有刷新、关闭其他）
> - 添加了 contentmenu ，像浏览器多开tab一样，快捷操作


## 解决
- 保持每一个tab的状态，脱离router，keep-alive 困扰
- 每个tab 可以配备 关闭、刷新、关闭其他

![active](http://upload-images.jianshu.io/upload_images/5611290-d0bc1afdd45a3881.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080  查看demo
npm run dev

# build for production with minification  打包demo
npm run build:example

# build for production with minification  rollup this module
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
