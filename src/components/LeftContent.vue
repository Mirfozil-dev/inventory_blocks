<script setup lang="ts">
import TextSkeleton from '../components/TextSkeleton.vue'
</script>

<template>
    <div class="left_content">
      <img src="../assets/images/img_blur.png" alt="">
      <TextSkeleton />
    </div>
</template>

<style scoped lang="scss">
.left_content {
    width: calc(28% - 12px);
    background: var(--secondary-color);
    transition: all .3s ease;
    padding: 18px 14px 24px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px var(--primary-color);
    border-radius: 12px;
    height: calc(100vh - 160px);

    img {
        width: 100%;
        border-radius: 8px;
    }
}
</style>