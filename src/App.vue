<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Block from './components/Block.vue'
import TextSkeleton from './components/TextSkeleton.vue'
import type { BlockInterface, ImagesInterface } from './interfaces';

const blocks = ref<BlockInterface[]>([
  {
    id: 1,
    count: 1,
    cell_id: 1,
    color: 'green'
  },
  {
    id: 2,
    count: 3,
    cell_id: 2,
    color: 'yellow'
  },
  {
    id: 3,
    count: 4,
    cell_id: 3,
    color: 'blue'
  }
])
const activeBlock = ref<BlockInterface | null>(null);
const drawerOpen = ref(false)
const images = ref<Partial<ImagesInterface>>({})

const loadImages = async () => {
  const green = (await import(`./assets/images/green_block.png`)).default;
  const yellow = (await import(`./assets/images/yellow_block.png`)).default;
  const blue = (await import(`./assets/images/blue_block.png`)).default;
  
  images.value = { green, yellow, blue }
};

const drop = (e: any) => {
  const cell = e.target.closest('.cell');
  const block_id = e.dataTransfer.getData('block_id');
  
  if (cell.children.length < 1) {    
    const i = blocks.value.findIndex((block: BlockInterface) => block.id === Number(block_id))
    blocks.value[i].cell_id = Number(cell.getAttribute('data-cell-id'));
  }
}

const getBlock = (cell_id: number) => {
  const block: BlockInterface | undefined = blocks.value.find((block: BlockInterface) => block.cell_id === cell_id)
  if (!block) return null
  block['image'] = images.value[block.color]
  return block
}

const selectBlock = (block: BlockInterface) => {
  if (activeBlock.value?.id === block.id) {
    drawerOpen.value = false
    setTimeout(() => activeBlock.value = null, 300)
  } else {
    drawerOpen.value = true
    activeBlock.value = block
  }
}

onMounted(() => {
    loadImages();
});

</script>

<template>
  <div class="container">
    <div class="left_block">
      <img src="./assets/images/img_blur.png" alt="">
      <TextSkeleton />
    </div>
    <div class="right_block">
      <div 
        v-for="cell_id in 50"
        :key="cell_id"
        class="cell"
        :class="{ 'active': activeBlock?.cell_id === cell_id }"
        :data-cell-id="`${cell_id}`"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="drop"
      >
        <Block :block="getBlock(cell_id)" @select-block="selectBlock"/>
      </div>
      <div class="block_drawer" :class="{ 'active': drawerOpen }">
        <img :src="activeBlock?.image" alt="">
        <hr>
        <TextSkeleton />
        <hr>
      </div>
    </div>
    <div class="footer">
      <span class="footer__content"></span>
      <button class="footer__cancel">
        <img src="./assets/images/cancel.svg" alt="">
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  .left_block {
    width: calc(28% - 12px);
    background: #262626;
    padding: 18px 14px 24px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      border-radius: 8px;
    }
  }
  .right_block {
    width: calc(72% - 12px);
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    position: relative;

    .cell {
      width: calc(20% + 1px);
      height: calc(20% + 1px);
      background: #262626;
      border: solid #4D4D4D;
      border-width: 1px 0 0 1px;
      margin-left: -1px;
      margin-top: -1px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;

      &.active {
        background: #2F2F2F;
      }
    }
    .block_drawer {
      width: 50%;
      right: 0;
      transform: translateX(100%);
      transition: transform 0.3s;
      border: solid 1px #4D4D4D;
      height: 100%;
      position: absolute;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 55px 15px 18px 15px;

      hr {
        width: 100%;
        height: 1px;
        border: none;
        border-top: solid 1px #4D4D4D !important;
        margin-top: 30px;
      }

      img {
        width: 130px;
        height: 130px;
      }

      &.active {
        transform: translateX(0%);
      }

      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        backdrop-filter: blur(30px);
        z-index: -1;
      }
    }
  }

  .left_block, .right_block {
    border: solid 1px #4D4D4D;
    border-radius: 12px;
    height: calc(100vh - 160px);
  }

  .footer {
    width: 100%;
    height: 72px;
    border: solid 1px #4D4D4D;
    border-radius: 12px;
    display: flex;
    padding: 18px;
    position: relative;

    &__content {
      width: 89%;
      height: 36px;
      border-radius: 12px;
      background: linear-gradient(90deg, #3C3C3C, #444444, #333333);
    }

    &__cancel {
      width: 12px;
      height: 12px;
      top: 8px;
      right: 8px;
      position: absolute;
      background: none;
      border: none;
    }
  }
}
</style>
