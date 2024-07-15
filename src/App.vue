<script setup lang="ts">
import { ref } from 'vue'
import Block from './components/Block.vue'
import type { BlockInterface } from './interfaces';

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

const drop = (e: any) => {
  const cell = e.target.closest('.cell');
  const block_id = e.dataTransfer.getData('block_id');
  
  if (cell.children.length < 1) {    
    const i = blocks.value.findIndex((block: BlockInterface) => block.id === Number(block_id))
    blocks.value[i].cell_id = Number(cell.getAttribute('data-cell-id'));
  }
}

const getBlock = (cell_id: number) => blocks.value.find((block: BlockInterface) => block.cell_id === cell_id)

const selectBlock = (block: BlockInterface) => {
  if (activeBlock.value?.id === block.id) {
    activeBlock.value = null
  } else {
    activeBlock.value = block
  }
}

</script>

<template>
  <div class="container">
    <div class="left_block">
      <img src="./assets/images/img_blur.png" alt="">
      <span class="left_block__header"></span>
      <div class="left_block__paragraph">
        <span v-for="i in 6" :key="i"></span>
      </div>
    </div>
    <div class="right_block">
      <div 
        v-for="cell_id in 50"
        :key="cell_id"
        class="cell"
        :data-cell-id="`${cell_id}`"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="drop"
      >
        <Block :block="getBlock(cell_id)" @select-block="selectBlock"/>
      </div>
      <div class="block_drawer" :class="{ 'active': activeBlock }">
        <img src="./assets/images/green_block.png" alt="">
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

    &__header {
      width: 80%;
      height: 26px;
      border-radius: 8px;
      margin-top: 20px;
      background: linear-gradient(90deg, #3C3C3C, #444444, #333333);
    }

    &__paragraph {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 24px;
      gap: 16px;
      span {
        height: 10px;
        border-radius: 4px;
        background: linear-gradient(90deg, #3C3C3C, #444444, #333333);

        &:first-child {
          width: 75%;
        }
        &:nth-child(2) {
          width: 90%;
        }
        &:nth-child(3) {
          width: 82%;
        }
        &:nth-child(4) {
          width: 77%;
        }
        &:nth-child(5) {
          width: 69%;
        }
        &:nth-child(6) {
          width: 44%;
          margin-top: 8px;
        }
      }
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
      padding: 55px 15px 18px;

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
