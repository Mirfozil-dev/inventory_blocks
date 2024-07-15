<script setup lang="ts">
import CancelButton from './CancelButton.vue'
</script>

<template>
    <div class="bottom_content">
      <span class="bottom_content__content"></span>
      <CancelButton />
    </div>
</template>

<style scoped lang="scss">
.bottom_content {
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
}
</style>