<script setup lang="ts">
import TextSkeleton from './TextSkeleton.vue'
import CancelButton from './CancelButton.vue'
import { useBlocksStore } from '../stores/store';
import { computed } from 'vue'

const store = useBlocksStore()

const deleteInput = computed({
  set: (val: string) => {
    store.setDeleteInput(val)
  },
  get: () => store.deleteInput
})
</script>

<template>
    <div class="block_drawer" :class="{ 'active': store.drawerOpen }">
        <CancelButton @onClick="store.closeBlockDrawer()" />
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
</template>

<style scoped lang="scss">
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
</style>