<template>
  <Layout>
    <template #home-hero-image>
      <div class="image-container">
        <img src="/assets/henry.png" alt="" class="hero">
      </div>
    </template>
    <template #home-features-after>
      <div class="posts-container padding">
        <p>Recent posts</p>
        <div class="content">
          <div class="post" v-for="post in recentPosts">
            <a :href="post.path">{{ post.title }}</a>
            <p class="time">{{ post.formatDate }}</p>
          </div>
        </div>
      </div>
      <div class="projects-container padding">
        <p>Projects</p>
        <div class="content">
          <ProjectCard
            v-for="project in projects"
            :name="project.name" 
            :project-url="project.projectURL" 
            :img-url="project.imgURL" 
            :tags="project.tags"
            >
          </ProjectCard>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ProjectCard from './ProjectCard.vue'
import info from '/info.txt?raw'
import { recentPosts, projects } from './constants'

onMounted(() => {
  console.log(info)
})

const { Layout } = DefaultTheme
</script>

<style scoped>
/* 通用样式 */
.image-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
  padding: 0; /* 修正无效的负值 padding */
}

.padding {
  padding: 0 64px;
}

/* Posts Section */
.posts-container, .projects-container {
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 128px;
}

.posts-container .content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* 自动适应列数 */
  gap: 28px;
}

.post {
  border-bottom: 1px solid var(--vp-c-text-1);
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
}

.post a {
  font-size: 22px;
}

.post a:hover {
  color: var(--primary-blue);
}

.posts-container > p, .projects-container > p {
  font-size: 28px;
  color: var(--vp-c-text-2);
  margin-bottom: 36px;
}

/* Projects Section */
.projects-container .content {
  display: flex;
  gap: 20px;
}

.projects-container img {
  width: 100%; /* 图片宽度响应式 */
  max-width: 500px;
  height: auto;
  margin-bottom: 18px;
  border-radius: 5%;
}

.projects-container h2 {
  font-size: 28px;
  margin-bottom: 6px;
}

/* 响应式设计 */
@media screen and (max-width: 960px) {
  .hero {
    height: 200px;
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .padding {
    padding: 0 48px;
  }
}

@media screen and (max-width: 640px) {
  .hero {
    height: 150px;
    width: 150px;
  }

  .padding {
    padding: 0 24px;
  }

  .projects-container .content {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 766px) {
  .posts-container .content {
    grid-template-columns: 1fr;
  }
}

</style>
