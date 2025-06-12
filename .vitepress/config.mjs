import { defineConfig } from 'vitepress'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Henry`s Blog",
  description: "Henry`s blog created by henry.ge",
  head: [
    ['link', { 
      rel: 'icon', 
      href: '/assets/imgs/henrysblogfavicon.png'
    }],
    ['meta', { name: 'referrer', content: 'no-referrer'}]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Archive', link: '/docs/球鞋的“黄金时代”.md' }
    ],

    docFooter: {
      prev: false,
      next: false
    },

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gezhiheng' },
      { icon: 'twitter', link: 'https://x.com/h3nryge' },
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
