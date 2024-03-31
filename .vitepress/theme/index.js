import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './fonts.css'
import './custom.css'
import './style.css'

export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout: Layout,
}