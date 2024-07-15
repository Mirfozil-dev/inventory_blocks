<script setup lang="ts">
import LeftContent from './components/LeftContent.vue'
import RightContent from './components/RightContent.vue'
import BottomContent from './components/BottomContent.vue'
</script>

<template>
  <div class="container">
    <LeftContent />
    <RightContent />
    <BottomContent />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
