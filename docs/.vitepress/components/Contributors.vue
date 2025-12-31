<template>
  <div v-if="validContributors && validContributors.length > 0" class="contributors-section">
    <h3>Contributors</h3>
    <div class="contributors-list">
      <div
        v-for="contributor in validContributors"
        :key="contributor.github || contributor.name"
        class="contributor-badge"
      >
        <img
          v-if="contributor.avatar && isValidAvatarUrl(contributor.avatar)"
          :src="contributor.avatar"
          :alt="escapeHtml(contributor.name)"
          loading="lazy"
        />
        <a
          v-if="contributor.github && isValidGithubUsername(contributor.github)"
          :href="getSafeGithubUrl(contributor.github)"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ escapeHtml(contributor.name) }}
        </a>
        <span v-else>{{ escapeHtml(contributor.name) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

// Validate and filter contributors
const validContributors = computed(() => {
  try {
    const contributors = frontmatter.value.contributors || []
    
    if (!Array.isArray(contributors)) {
      return []
    }
    
    return contributors
      .filter(contributor => {
        // Must have a name
        if (!contributor || typeof contributor.name !== 'string' || !contributor.name.trim()) {
          return false
        }
        
        // If GitHub username provided, must be valid
        if (contributor.github && !isValidGithubUsername(contributor.github)) {
          return false
        }
        
        // If avatar provided, must be from GitHub CDN
        if (contributor.avatar && !isValidAvatarUrl(contributor.avatar)) {
          return false
        }
        
        return true
      })
      .map(contributor => ({
        name: contributor.name.trim(),
        github: contributor.github ? contributor.github.trim() : null,
        avatar: contributor.avatar && isValidAvatarUrl(contributor.avatar) ? contributor.avatar : null
      }))
  } catch (error) {
    // Silently hide contributors if there's an error
    return []
  }
})

// Security: Validate GitHub username format
function isValidGithubUsername(username) {
  if (!username || typeof username !== 'string') {
    return false
  }
  
  // GitHub username rules: 1-39 chars, alphanumeric and hyphens, cannot start/end with hyphen
  const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/
  return githubUsernameRegex.test(username.trim())
}

// Security: Validate avatar URL - only allow GitHub CDN
function isValidAvatarUrl(url) {
  if (!url || typeof url !== 'string') {
    return false
  }
  
  try {
    const urlObj = new URL(url)
    
    // Only allow GitHub CDN (avatars.githubusercontent.com) or GitHub user content
    const allowedDomains = [
      'avatars.githubusercontent.com',
      'github.com',
      'githubusercontent.com'
    ]
    
    const hostname = urlObj.hostname.toLowerCase()
    const isAllowed = allowedDomains.some(domain => hostname === domain || hostname.endsWith('.' + domain))
    
    // Must be HTTPS
    return isAllowed && urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

// Security: Sanitize GitHub username to prevent XSS and validate
function getSafeGithubUrl(username) {
  if (!isValidGithubUsername(username)) {
    // Return GitHub homepage if invalid
    return 'https://github.com'
  }
  
  // Double sanitize for safety
  const sanitized = String(username).replace(/[^a-zA-Z0-9_-]/g, '').trim()
  
  // Validate length (GitHub usernames are 1-39 chars)
  if (sanitized.length === 0 || sanitized.length > 39) {
    return 'https://github.com'
  }
  
  return `https://github.com/${sanitized}`
}

// Security: Escape HTML to prevent XSS (SSR-safe)
function escapeHtml(text) {
  if (!text || typeof text !== 'string') {
    return ''
  }
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  
  return text.replace(/[&<>"']/g, (m) => map[m])
}
</script>

