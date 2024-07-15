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
    border: solid 1px var(--primary-color);
    border-radius: 12px;
    display: flex;
    padding: 18px;
    position: relative;

    &__content {
      width: 89%;
      height: 36px;
      border-radius: 12px;
      background: linear-gradient(90deg, var(--gradient-color));
      animation: pulse 2s infinite ease-in-out;
    }
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>