<script setup lang="ts">
import { ElDialog } from 'element-plus';
import { ref } from 'vue';

const visible = ref<boolean>(false)
const emit = defineEmits<{
    (event: "restart"): void
}>()
const show = () => {
    visible.value = true
}
const hide = () => {
    visible.value = false
}
const handleRestartClick = () => {
    emit("restart")
    hide()
}
defineExpose({
    show
})
</script>
<style>
h1 {
    text-align: center;
}
</style>
<template>
    <ElDialog v-model="visible" :close-on-click-modal="false" :show-close="false" :align-center="true">
        <h1>Lose</h1>
        <ElButton @click="handleRestartClick">Restart</ElButton>
    </ElDialog>
</template>