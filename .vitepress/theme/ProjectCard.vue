<template>
  <a class="article-wrapper" :href="props.projectUrl" target="_blank">
    <div class="rounded-lg container-project" :style="{ backgroundImage: `url(${props.imgUrl})` }"></div>
    <div class="project-info">
      <div class="flex-pr">
        <div class="project-title text-nowrap">{{ props.name }}</div>
        <div class="project-hover">
          <svg style="color: black;" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" color="black" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor">
            <line y2="12" x2="19" y1="12" x1="5"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
        <div class="types">
          <span v-for="tag in props.tags" :class="tag.toLowerCase()" class="project-type">• {{ tag }}</span>
        </div>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  name: String,
  projectUrl: String,
  imgUrl: String,
  tags: Array,
})
</script>

<style scoped>
.vue {
  background-color: rgb(65, 184, 131);
  color: rgb(53, 73, 94);
}

.electron {
  background: #2a2d38;
  color: #9be4f2;
}

.javascript {
  background-color: #e8d44d;
  color: #30312e;
}

.typescript {
  background-color: #2f74c0;
  color: #f7f7f7;
}

.article-wrapper {
  width: 260px;
  -webkit-transition: 0.15s all ease-in-out;
  transition: 0.15s all ease-in-out;
  border-radius: 10px;
  padding: 5px;
  border: 4px solid transparent;
  cursor: pointer;
  background-color: #f6f6f7;
}

.article-wrapper:hover {
  -webkit-box-shadow: 10px 10px 0 #4e84ff, 20px 20px 0 #4444bd;
  box-shadow: 10px 10px 0 #4e84ff, 20px 20px 0 #4444bd;
  border-color: #0578c5;
  -webkit-transform: translate(-20px, -20px);
  -ms-transform: translate(-20px, -20px);
  transform: translate(-20px, -20px);
}

.article-wrapper:active {
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  transform: translate(0, 0);
}

.types {
  gap: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  place-content: flex-start;
}

.rounded-lg {
  border-radius: 10px;
}

.article-wrapper:hover .project-hover {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.project-info {
  padding-top: 20px;
  padding: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 20px;
}

.project-title {
  font-size: 1.8em;
  margin: 0;
  font-weight: 600;
 /* depend de la font */
  text-overflow: ellipsis;
  white-space: nowrap;
  color: black;
}

.flex-pr {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.project-type {
  font-weight: bold;
  padding: 0.3em 0.7em;
  border-radius: 15px;
  font-size: 12px;
  letter-spacing: -0.6px
}

.project-hover {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 9px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.container-project {
  width: 100%;
  height: 170px;
  background-size: cover;
}
</style>