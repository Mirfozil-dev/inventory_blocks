<script setup lang="ts">
import { defineEmits } from 'vue';

defineEmits(['onClick'])
</script>

<template>
    <button class="cancel" @click="$emit('onClick')">
        <img src="../assets/images/cancel.svg" alt="">
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