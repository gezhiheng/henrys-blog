<template>
  <Layout>
    <template #home-hero-image>
      <div class="image-container">
        <img src="/assets/henry.png" alt="" class="hero">
      </div>
    </template>
    <template #home-features-after>
      <div class="posts-container">
        <p>Recent posts</p>
        <div class="content">
          <div class="post" v-for="post in recentPosts">
            <a :href="post.path">{{ post.title }}</a>
            <p class="time">{{ post.formatDate }}</p>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import info from '/info.txt?raw'
import { recentPosts } from './constants'

onMounted(() => {
  console.log(info)
})

const { Layout } = DefaultTheme
</script>

<style scoped>
.image-container {
  width: 100%;
  display: flex;
  justify-content: end;
}

.time {
  color: var(--vp-c-text-2);
}

.hero {
  margin-top: 5px;
  margin-bottom: 80px;
  height: 260px;
  width: 260px;
  border-radius: 50%;
  background-color: white;
  padding: -100px;
}

.posts-container {
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 128px;
  padding: 0 64px;

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px; 
  }

  .post {
    border-bottom: 0.1px solid var(--vp-c-text-1);
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;

    a {
      font-size: 22px;
    }

    a:hover {
      color: var(--primary-blue);
    }
  }
}

.posts-container > p {
  font-size: 28px;
  color: var(--vp-c-text-2);
  margin-bottom: 36px;
}

@media screen and (max-width: 960px) {
  .hero {
    height: 200px;
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .posts-container {
    padding: 0 48px;
  }
}

@media screen and (max-width: 640px) {
  .hero {
    height: 150px;
    width: 150px;
  }

  .posts-container {
    padding: 0 24px;
  }
}

@media screen and (max-width: 766px) {
  .posts-container {
    .content {
      grid-template-columns: 1fr;
    }
  }
}
</style>
