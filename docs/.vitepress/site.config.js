// Centralized site configuration
// Update this file to change site-wide settings

/**
 * Validates URL format
 */
function isValidUrl(url) {
  if (!url || typeof url !== 'string') {
    return false
  }
  
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:'
  } catch {
    return false
  }
}

/**
 * Validates GitHub username format
 */
function isValidGithubUsername(username) {
  if (!username || typeof username !== 'string') {
    return false
  }
  
  const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/
  return githubUsernameRegex.test(username.trim())
}

const rawConfig = {
  github: {
    username: 'venumadhavchary',
    repo: 'AnythingDeploy'
  },
  site: {
    title: 'AnythingDeploy - Deploy Anything, Anywhere',
    siteTitle: 'AnythingDeploy',
    description: 'Comprehensive deployment guides for developers. Deploy anything, anywhere with step-by-step guides for Coolify, Docker, Vercel, Netlify, and more.',
    url: 'https://anythingdeploy.in',
    twitter: '@anythingdeploy' // Optional: Add your Twitter handle
  }
}

// Validate configuration
if (!isValidGithubUsername(rawConfig.github.username)) {
  throw new Error(`Invalid GitHub username: ${rawConfig.github.username}`)
}

if (!isValidUrl(rawConfig.site.url)) {
  throw new Error(`Invalid site URL: ${rawConfig.site.url}`)
}

if (!rawConfig.site.title || typeof rawConfig.site.title !== 'string' || rawConfig.site.title.trim().length === 0) {
  throw new Error('Site title is required and must be a non-empty string')
}

if (!rawConfig.site.description || typeof rawConfig.site.description !== 'string' || rawConfig.site.description.trim().length === 0) {
  throw new Error('Site description is required and must be a non-empty string')
}

export const siteConfig = rawConfig

