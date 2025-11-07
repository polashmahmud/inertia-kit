import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue UI Kit",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/input' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Input Component', link: '/input' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/polashmahmud/inertia-kit' }
    ]
  }
})
