import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AnythingDeploy',
  description: 'Comprehensive deployment guides for developers',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/files/' },
      { text: 'Contribute', link: '/contribute' }
    ],
    
    sidebar: {
      '/files/': [
        {
          text: 'Frontend',
          collapsed: false,
          items: [
            { text: 'React', link: '/files/frontend/react/' },
            { text: 'Next.js', link: '/files/frontend/nextjs/' },
            { text: 'Vue', link: '/files/frontend/vue/' },
            { text: 'Vite', link: '/files/frontend/vite/' }
          ]
        },
        {
          text: 'Backend',
          collapsed: false,
          items: [
            { text: 'Node.js', link: '/files/backend/nodejs/' },
            { text: 'Python', link: '/files/backend/python/' },
            { text: 'Go', link: '/files/backend/go/' }
          ]
        },
        {
          text: 'Full Stack',
          collapsed: false,
          items: [
            { text: 'Next.js Full Stack', link: '/files/fullstack/nextjs/' },
            { text: 'MERN Stack', link: '/files/fullstack/mern/' }
          ]
        },
        {
          text: 'DevOps',
          collapsed: false,
          items: [
            { text: 'Docker', link: '/files/devops/docker/' },
            { 
              text: 'Coolify', 
              collapsed: false,
              items: [
                { text: 'Deploy to Coolify', link: '/files/devops/coolify/deploy-to-coolify' },
                { text: 'Auto Deploy Setup', link: '/files/devops/coolify/auto-deploy-setup' },
                { text: 'Deploy AnythingDeploy', link: '/files/devops/coolify/deploy-anythingdeploy' }
              ]
            },
            { text: 'CI/CD', link: '/files/devops/cicd/' }
          ]
        }
      ]
    },
    
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation'
              },
              modal: {
                noResultsText: 'No results for',
                resetButtonTitle: 'Reset search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/anythingdeploy' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 AnythingDeploy Contributors'
    },
    
    darkModeSwitchLabel: 'Theme',
    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Menu',
    lastUpdatedText: 'Last updated',
    
    editLink: {
      pattern: 'https://github.com/yourusername/anythingdeploy/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },
  
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})

