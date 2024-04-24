import { defineConfig } from 'vitepress'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Henry`s Blog",
  description: "Henry`s blog created by henry.ge",
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: 'https://my-pic-base.oss-cn-beijing.aliyuncs.com/henrys-blog/imgs/hero.png' }],
    ['meta', { name: 'referrer', content: 'no-referrer'}]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Archive', link: '/docs/experience/VSCode配置.md' }
    ],

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gezhiheng' },
      { icon: 'twitter', link: 'https://twitter.com/henryge292035' },
    ],

    footer: {
      message: 'Author @Henry Ge',
      copyright: 'Powered by VitePress & Vue'
    },

    search: {
      provider: 'local'
    },
  },
  
  vite: {
    server: {
      host: '0.0.0.0',
      port: 80,
    }
  }
})
