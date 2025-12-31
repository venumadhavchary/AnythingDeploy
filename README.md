# AnythingDeploy

Comprehensive deployment guides for developers. Deploy anything, anywhere.

## Features

- 🚀 Fast-loading documentation site (VitePress)
- 🔍 Built-in search functionality
- 🌙 Dark mode support
- 💻 Code syntax highlighting
- 👥 Contributor tracking
- 📚 Organized by domain/category/topic structure

## Getting Started

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
docs/
  files/
    {category}/        # e.g., frontend, backend, devops
      {topic}/         # e.g., react, nodejs, coolify
        guide-name.md  # Guide files
  .vitepress/
    site.config.js     # ⚙️ Centralized configuration (update GitHub username here!)
    config.js          # VitePress configuration
```

## Configuration

### Update GitHub Username

All GitHub references are centralized in one file for easy updates:

**File**: `docs/.vitepress/site.config.js`

```javascript
export const siteConfig = {
  github: {
    username: 'venumadhavchary',  // 👈 Update this
    repo: 'AnythingDeploy'
  },
  site: {
    title: 'AnythingDeploy',
    description: '...',
    url: 'https://anythingdeploy.com',  // 👈 Update with your domain
    twitter: '@anythingdeploy'  // 👈 Optional: Add your Twitter
  }
}
```

This single file controls:
- GitHub repository links
- Edit page links
- Social media links
- Site metadata
- SEO configuration

## SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD)
- ✅ Canonical URLs
- ✅ Robots.txt
- ✅ SEO-optimized frontmatter on all pages

## Security

- ✅ XSS protection in contributor links
- ✅ No sensitive data in codebase
- ✅ Static site (no server-side vulnerabilities)
- ✅ Secure external links (rel="noopener noreferrer")

See [SECURITY.md](./SECURITY.md) for details.

## Contributing

See [Contribution Guidelines](/contribute) for details on how to add guides and contribute to the project.

## License

MIT

