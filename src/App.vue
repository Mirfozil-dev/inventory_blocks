<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="left_block"></div>
    <div class="right_block">
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  .left_block {
    width: calc(28% - 12px);
  }
  .right_block {
    width: calc(72% - 12px);
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    .cell {
      width: calc(20% + 1px);
      height: calc(20% + 1px);
      background: #262626;
      border: solid #4D4D4D;
      border-width: 1px 0 0 1px;
      margin-left: -1px;
      margin-top: -1px;
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
  }
}
</style>
