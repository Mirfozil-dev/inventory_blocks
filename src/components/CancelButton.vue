<script setup lang="ts">
import { defineEmits } from 'vue';
import { useBlocksStore } from '../stores/store';
import { ref, onMounted } from 'vue'

const store = useBlocksStore()

const icons = ref({
  light: '',
  dark: ''
})

const loadIcons = async () => {
  const dark = (await import(`../assets/images/cancel.svg`)).default;
  const light = (await import(`../assets/images/cancel_light.svg`)).default;
  
  icons.value = { light, dark }
};

defineEmits(['onClick'])

const getIcon = () => store.currentTheme === store.themes.light ? icons.value['light'] : icons.value['dark'];

onMounted(() => {
    loadIcons();
});
</script>

<template>
    <button class="cancel" @click="$emit('onClick')">
        <img :src="getIcon()" alt="">
    </button>
</template>

<style scoped lang="scss">
.cancel {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 18px;
    right: 18px;
    cursor: pointer;
    background: none;
    border: none;
    img {
        width: 100% !important;
        height: 100% !important;
    }
}
</style>