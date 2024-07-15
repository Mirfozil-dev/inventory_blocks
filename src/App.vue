<script setup lang="ts">
import LeftContent from './components/LeftContent.vue'
import RightContent from './components/RightContent.vue'
import BottomContent from './components/BottomContent.vue'
import { ref, onMounted } from 'vue'
import { useBlocksStore } from './stores/store';

const store = useBlocksStore()
const icons = ref({
  moon: '',
  sun: ''
})

const loadIcons = async () => {
  const moon = (await import(`./assets/images/moon-solid.svg`)).default;
  const sun = (await import(`./assets/images/sun-solid.svg`)).default;
  
  icons.value = { moon, sun }
};



const getIcon = () => store.currentTheme === store.themes.light ? icons.value['sun'] : icons.value['moon'];

onMounted(() => {
    loadIcons();
});
</script>

<template>
  <div class="content_wrapper" :class="store.currentTheme">
    <button @click="store.toggleTheme()" class="change_theme">
      <img :src="getIcon()" alt="">
    </button>
    <div class="container">
      <LeftContent />
      <RightContent />
      <BottomContent />
    </div>
  </div>
  
</template>

<style scoped lang="scss">
.content_wrapper {
  background: var(--background-color);
  transition: all .3s ease;
  padding: 32px;
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  .change_theme {
    width: 30px;
    height: 30px;
    margin-bottom: 20px;
    padding: 5px;
    border-radius: 6px;
    background: none;
    border: var(--primary-color) solid 1px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
