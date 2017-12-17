import vue from 'rollup-plugin-vue2'
import babel from 'rollup-plugin-babel'
import css from 'rollup-plugin-css-only'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
const version = process.env.VERSION || require('../package.json').version

export default {
  entry: 'lib/index.js',
  dest: 'vue-path-tab.js',
  format: 'umd',
  moduleName: 'VuePathTab',

  plugins: [
    vue(),
    css({
      output: 'vue-path-tab.css'
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    nodeResolve({
      browser: true,
      jsnext: true,
      main: true,
      preferBuiltins: false,
      extensions: [ '.js', '.vue' ]
    }),
    commonjs()
  ],
  banner: `/**
 * vue-path-tab v${version}
 * (c) ${new Date().getFullYear()} MAKEBANANA
 * mail: makebanana@163.com
 * @license MIT
 */`
}
