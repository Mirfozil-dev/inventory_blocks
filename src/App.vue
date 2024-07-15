<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Block from './components/Block.vue'
import TextSkeleton from './components/TextSkeleton.vue'
import type { BlockInterface, ImagesInterface } from './interfaces';
import { useBlocksStore } from './stores/store';

const store = useBlocksStore()

const images = ref<Partial<ImagesInterface>>({})
const deleteInput = computed({
  set: (val: string) => {
    store.setDeleteInput(val)
  },
  get: () => store.deleteInput
})

const loadImages = async () => {
  const green = (await import(`./assets/images/green_block.png`)).default;
  const yellow = (await import(`./assets/images/yellow_block.png`)).default;
  const blue = (await import(`./assets/images/blue_block.png`)).default;
  
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
        :class="{ 'active': store.activeBlock?.cell_id === cell_id }"
        :data-cell-id="`${cell_id}`"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="store.drop"
      >
        <Block :block="getBlock(cell_id)" @select-block="store.selectBlock"/>
      </div>
      <div class="block_drawer" :class="{ 'active': store.drawerOpen }">
        <button class="block_drawer__cancel" @click="store.closeBlockDrawer()">
          <img src="./assets/images/cancel.svg" alt="">
        </button>
        <img :src="store.activeBlock?.image" alt="">
        <hr>
        <TextSkeleton />
        <hr>
        <template v-if="store.isDeleting">
          <input v-model="deleteInput" type="number" placeholder="Введите количество">
          <div class="block_drawer__confirm">
            <button @click="store.setIsDeleting(false)">Отмена</button>
            <button @click="store.deleteBlock">Подтвердить</button>
          </div>
        </template>
        <button v-else @click="store.setIsDeleting(true)" class="block_drawer__delete">Удалить предмет</button>
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

      &.active {
        background: #2F2F2F;
      }
    }
    .block_drawer {
      width: 250px;
      right: -1px;
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
      border-radius: 0 12px 12px 0;
      hr {
        width: 100%;
        height: 1px;
        border: none;
        border-top: solid 1px #4D4D4D !important;
        margin-top: 30px;
      }

      &__delete {
        width: 100%;
        height: 39px;
        border: none;
        background: #FF8888;
        border-radius: 8px;
        color: #fff;
        margin-top: 30px;
        font-size: 14px;
      }

      &__cancel {
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

      input {
        width: 100%;
        height: 33px;
        border: 1px solid #4D4D4D;
        background: #262626;
        border-radius: 4px;
        padding: 0 10px;
        margin-top: 20px;
        outline: none;
        color: #dcdcdc;
      }

      &__confirm {
        width: 100%;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        margin-top: 20px;

        button {
          width: calc(50% - 5px);
          height: 33px;
          border-radius: 8px;
          border: none;

          &:first-child {
            background: #fff;
            color: #2D2D2D;
          }

          &:last-child {
            background: #FA7272;
            color: #fff;
          }
        }
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
        border-radius: 0 12px 12px 0;
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
