<script setup lang="ts">
import { defineProps} from 'vue';
import type { BlockInterface } from '../interfaces';

const props = defineProps<{
  block: BlockInterface | null
}>()
const emits = defineEmits(['selectBlock'])

const dragStart = (e: any) => {
  e.dataTransfer.setData('block_id', e.target.getAttribute('data-block-id'));
}

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
              :src="block.image" alt=""
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