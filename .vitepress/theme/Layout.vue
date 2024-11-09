<template>
  <Layout>
    <template #home-hero-image>
      <div class="image-container">
        <img src="/assets/henry.png" alt="" class="hero">
    </template>
  </Layout>
</template>

<script setup>
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { Vue3Lottie } from 'vue3-lottie'
import hero from '../../assets/hero.json'
import info from '/info.txt?raw'

onMounted(() => {
  console.log(info)
})

const { Layout } = DefaultTheme
</script>

<style scoped>
.hero {
  margin-top: -15px;
  margin-right: -30px;
  height: 320px;
  width: 320px;
  border-radius: 50%;
  background-color: white;
  padding: -100px;
}

@media screen and (max-width: 960px) {
  .hero {
    margin-top: 10vh;
    margin-right: 20px;
  }
}

@media screen and (max-width: 640px) {
  .hero {
    margin-right: 30px;
    margin-top: 10vh;
    width: 250px;
    height: 250px;
  }
}
</style>
