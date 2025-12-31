<script setup>
import DefaultTheme from 'vitepress/theme'
import Contributors from '../components/Contributors.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #page-bottom>
      <Contributors />
    </template>
  </Layout>
</template>

