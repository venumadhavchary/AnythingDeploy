import { defineConfig } from 'vitepress'
import { siteConfig } from './site.config.js'

const config = siteConfig

export default defineConfig({
  title: config.site.title,
  description: config.site.description,
  
  // Site URL for sitemap generation
  base: '/',
  sitemap: {
    hostname: config.site.url,
    transformItems: (items) => {
      return items.map((item) => ({
        ...item,
        changefreq: 'weekly',
        priority: item.url === config.site.url + '/' ? 1.0 : 0.8
      }))
    }
  },
  
  // Ignore dead links during build (for future guides)
  ignoreDeadLinks: true,
  
  head: [
    // SEO Meta Tags
    ['meta', { name: 'author', content: config.github.username }],
    ['meta', { name: 'keywords', content: 'deployment, docker, coolify, vercel, netlify, devops, deployment guides, how to deploy, vps' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: config.site.url }],
    ['meta', { property: 'og:title', content: config.site.title }],
    ['meta', { property: 'og:description', content: config.site.description }],
    ['meta', { property: 'og:image', content: `${config.site.url}/og-image.png` }],
    ['meta', { property: 'og:site_name', content: config.site.title }],
    
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: config.site.url }],
    ['meta', { name: 'twitter:title', content: config.site.title }],
    ['meta', { name: 'twitter:description', content: config.site.description }],
    ['meta', { name: 'twitter:image', content: `${config.site.url}/og-image.png` }],
    config.site.twitter ? ['meta', { name: 'twitter:creator', content: config.site.twitter }] : null,
    
    // Additional SEO
    ['link', { rel: 'canonical', href: config.site.url }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    
    // JSON-LD Structured Data for better Google recognition
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.site.title,
      alternateName: 'AnythingDeploy',
      url: config.site.url,
      description: config.site.description,
      publisher: {
        '@type': 'Organization',
        name: 'AnythingDeploy',
        alternateName: 'AnythingDeploy',
        url: config.site.url
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${config.site.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    })],
    
    // Additional meta for better indexing
    ['meta', { name: 'application-name', content: 'AnythingDeploy' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AnythingDeploy' }],
    
    // Plausible Analytics
    ['script', { defer: '', 'data-domain': 'anythingdeploy.in', src: 'https://plausible.thechary.dev/js/script.hash.outbound-links.pageview-props.tagged-events.js' }],
    ['script', {}, 'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }'],

    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-TLPP89VZ45' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-TLPP89VZ45');
    `]
  ].filter(Boolean), // Remove null entries
  
  themeConfig: {
    siteTitle: config.site.siteTitle,
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/files/' },
      { text: 'Contribute', link: '/contribute' }
    ],
    
    sidebar: {
      '/files/': [
        // {
        //   text: 'Frontend',
        //   collapsed: false,
        //   items: [
        //     { text: 'React', link: '/files/frontend/react/' },
        //     { text: 'Next.js', link: '/files/frontend/nextjs/' },
        //     { text: 'Vue', link: '/files/frontend/vue/' },
        //     { text: 'Vite', link: '/files/frontend/vite/' }
        //   ]
        // },
        // {
        //   text: 'Backend',
        //   collapsed: false,
        //   items: [
        //     { text: 'Node.js', link: '/files/backend/nodejs/' },
        //     { text: 'Python', link: '/files/backend/python/' },
        //     { text: 'Go', link: '/files/backend/go/' }
        //   ]
        // },
        // {
        //   text: 'Full Stack',
        //   collapsed: false,
        //   items: [
        //     { text: 'Next.js Full Stack', link: '/files/fullstack/nextjs/' },
        //     { text: 'MERN Stack', link: '/files/fullstack/mern/' }
        //   ]
        // },
        {
          text: 'DevOps',
          collapsed: false,
          items: [
            { text: 'VPS Setup', link: '/files/devops/vpc/' },
            { 
              text: 'Laravel', 
              collapsed: false,
              items: [
                { text: 'Overview', link: '/files/devops/laravel/' },
                { text: 'Laravel on Coolify with Docker', link: '/files/devops/laravel/laravel_on_coolify_with_docker' },
                { text: 'Laravel on Coolify with Nixpacks', link: '/files/devops/laravel/larvavel_on_coolify_nixpacks' }
              ]
            },
            // { text: 'Docker', link: '/files/devops/docker/' },
            // { 
            //   text: 'Coolify', 
            //   collapsed: false,
            //   items: [
            //     { text: 'Deploy to Coolify', link: '/files/devops/coolify/deploy-to-coolify' },
            //     { text: 'Auto Deploy Setup', link: '/files/devops/coolify/auto-deploy-setup' },
            //     { text: 'Deploy AnythingDeploy', link: '/files/devops/coolify/deploy-anythingdeploy' }
            //   ]
            // },
            // { text: 'CI/CD', link: '/files/devops/cicd/' }
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
      { icon: 'github', link: `https://github.com/${config.github.username}/${config.github.repo}` }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2024 ${config.site.title} Contributors`
    },
    
    darkModeSwitchLabel: 'Theme',
    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Menu',
    lastUpdatedText: 'Last updated',
    
    editLink: {
      pattern: `https://github.com/${config.github.username}/${config.github.repo}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub'
    }
  },
  
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },
  
  // Expose config for use in components
  vite: {
    define: {
      __APP_CONFIG__: JSON.stringify(config)
    }
  }
})
