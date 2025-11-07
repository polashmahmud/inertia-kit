import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue UI Kit",
  description: "A component library for Inertia.js and Vue 3",
  base: "/inertia-kit/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Input Component', link: '/input' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/polashmahmud/inertia-kit' }
    ]
  }
})
