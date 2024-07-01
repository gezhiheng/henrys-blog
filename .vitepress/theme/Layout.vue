<template>
  <Layout>
    <template #home-hero-image>
      <Vue3Lottie class="hero" :animationData="hero" />
    </template>
    <template #home-hero-info>
      <h1 class="title"><span class="clip">葛智恒的博客～</span></h1>
      <p class="text" ref="text"></p>
      <Transition name="fade">
        <p v-if="showTagline" class="tagline">A.K.A. Henry@HenryHimself</p>
      </Transition>
    </template>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DefaultTheme from "vitepress/theme";
import { Vue3Lottie } from "vue3-lottie";
import TypeIt from "typeit";
import hero from "../../assets/hero.json";
import info from "/info.txt?raw";

const text = ref(null)
const showTagline = ref(false)

onMounted(() => {
  console.log(info)
  new TypeIt(text.value, {
    cursorChar: "<span>|<span>",
    cursorSpeed: 500,
    speed: 60,
    deleteSpeed: 60,
    cursorSpeed: 1000,
    nextStringDelay: 750,
    lifeLike: true,
    breakLines: false,
    afterComplete: () => {
      showTagline.value = true
    },
  })
  .type('离开🌏之前，一切都是过程。')
  .move(-10)
  .delete(1,{
    delay: 100,
  })
  .type('shijie')
  .delete(6, {
    delay: 200,
  })
  .type('世界', {
    speed: 300,
    delay: 500,
  })
  .move(10, {
    delay: 100,
  })
  .go()
})

const { Layout } = DefaultTheme;
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

.title, .text {
  font-size: 56px;
  line-height: 64px;
}

.clip {
  background: -webkit-linear-gradient(315deg, #51c1f2 25%, #2f80ed);  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text {
  letter-spacing: -.4px;
  white-space: pre-wrap;
  max-width: 320px;
}

.tagline {
  padding-top: 12px;
  font-size: 24px;
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 960px) {
  .hero {
    margin-top: 10vh;
    margin-right: 20px;
  }

  .title, .text {
    font-size: 48px;
    line-height: 56px;
  }

  .text {
    margin: 0 auto;
    max-width: 280px;
  }

  .tagline {
    font-size: 20px;
  }
}

@media screen and (max-width: 640px) {
  .hero {
    margin-right: 30px;
    margin-top: 10vh;
    width: 250px;
    height: 250px;
  }

  .title, .text {
    font-size: 32px;
    line-height: 38px;
  }

  .title {
    margin-bottom: 10px;
  }

  .text {
    margin: 0 auto;
    max-width: 180px;
  }

  .tagline {
    font-size: 18px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>