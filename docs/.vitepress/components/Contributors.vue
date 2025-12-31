<template>
  <div v-if="contributors && contributors.length > 0" class="contributors-section">
    <h3>Contributors</h3>
    <div class="contributors-list">
      <div
        v-for="contributor in contributors"
        :key="contributor.github"
        class="contributor-badge"
      >
        <img
          v-if="contributor.avatar"
          :src="contributor.avatar"
          :alt="contributor.name"
        />
        <a
          v-if="contributor.github"
          :href="`https://github.com/${contributor.github}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ contributor.name }}
        </a>
        <span v-else>{{ contributor.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
const contributors = frontmatter.value.contributors || []
</script>

