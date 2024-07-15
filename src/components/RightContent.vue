<script setup lang="ts">
import Block from './Block.vue'
import BlockDrawer from './BlockDrawer.vue';
import type { BlockInterface, ImagesInterface } from '../interfaces';
import { useBlocksStore } from '../stores/store';
import { ref, onMounted } from 'vue'

const store = useBlocksStore()

const images = ref<Partial<ImagesInterface>>({})


const loadImages = async () => {
  const green = (await import(`../assets/images/green_block.png`)).default;
  const yellow = (await import(`../assets/images/yellow_block.png`)).default;
  const blue = (await import(`../assets/images/blue_block.png`)).default;
  
  images.value = { green, yellow, blue }
};

const getBlock = (cell_id: number) => {
  const block: BlockInterface | undefined = store.blocks.find((block: BlockInterface) => block.cell_id === cell_id)
  if (!block) return null
  block['image'] = images.value[block.color]
  return block
}

onMounted(() => {
    loadImages();
});
</script>
<template>
    <div class="right_content">
      <div 
        v-for="cell_id in 25"
        :key="cell_id"
        class="cell"
        :class="{ 'active': store.activeBlock?.cell_id === cell_id }"
        :data-cell-id="`${cell_id}`"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="store.drop"
      >
        <Block :block="getBlock(cell_id)" @select-block="store.selectBlock"/>
      </div>
      <BlockDrawer />
    </div>
</template>

<style scoped lang="scss">
.right_content {
  width: calc(72% - 12px);
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;
  border: solid 1px var(--primary-color);
  border-radius: 12px;
  height: calc(100vh - 160px);

  .cell {
    width: calc(20% + 1px);
    height: calc(20% + 1px);
    transition: all .3s ease;
    background: var(--secondary-color);
    border: solid var(--primary-color);
    border-width: 1px 0 0 1px;
    margin-left: -1px;
    margin-top: -1px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &.active {
      background: var(--active-color);
    }
  }
}
</style>