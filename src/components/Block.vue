<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import type { BlockInterface, ImagesInterface } from '../interfaces';

const props = defineProps<{
  block?: BlockInterface
}>()
const emits = defineEmits(['selectBlock'])
const images = ref<Partial<ImagesInterface>>({})
const loadImages = async () => {
  const green = (await import(`../assets/images/green_block.png`)).default;
  const yellow = (await import(`../assets/images/yellow_block.png`)).default;
  const blue = (await import(`../assets/images/blue_block.png`)).default;
  
  images.value = { green, yellow, blue }
};

const dragStart = (e: any) => {
  e.dataTransfer.setData('block_id', e.target.getAttribute('data-block-id'));
}

onMounted(() => {
    loadImages();
});

</script>
<template>
    <template
            v-if="block"
        >
            <img
              :data-block-id="block?.id"
              draggable
              @dragstart="e => dragStart(e)"
              @dragover.prevent
              :src="images[block.color]" alt=""
              @click="$emit('selectBlock', block)"
            >
            <div class="cell__counter">
            {{ block?.count }}
            </div>
        </template>
</template>


<style scoped>
.cell__counter {
    font-family: 'Inter', sans-serif;
    border: solid 1px #4D4D4D;
    padding: 2px 4px;
    border-radius: 6px 0 0 0;
    color: #7D7D7D;
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>