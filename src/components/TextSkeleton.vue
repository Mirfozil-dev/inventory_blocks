<template>
    <span class="header"></span>
    <div class="paragraph">
        <span v-for="i in 6" :key="i"></span>
    </div>
</template>
<style scoped lang="scss">
.header {
    width: 80%;
    height: 26px;
    border-radius: 8px;
    margin-top: 20px;
    background: linear-gradient(90deg, #3C3C3C, #444444, #333333);
}

.paragraph {
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
</style>