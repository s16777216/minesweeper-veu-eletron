<script lang="ts" setup>
import CustomHeader from './view/header/index.vue'
import CustomBody from './view/body/index.vue'
import { ref, watch } from 'vue';
import { useStore } from './store/store';
import { ElMessage } from 'element-plus';
import WinDialog from '@/view/dialog/winDialog.vue'
import LoseDialog from '@/view/dialog/loseDialog.vue';
//data
const header = ref<InstanceType<typeof CustomHeader> | null>(null)
const body = ref<InstanceType<typeof CustomBody> | null>(null)
const winDialog = ref<InstanceType<typeof WinDialog>|null>(null)
const loseDialog = ref<InstanceType<typeof LoseDialog>|null>(null)
//functions
const handleReloadClick = () => {
  useStore().toggleRestart()
  body.value?.restart()
}
const handleSettingClick = () => {
  console.log("setting click")
  const msg = `${window.innerWidth}, ${window.innerHeight}, ${window.outerWidth}, ${window.outerHeight}`
  ElMessage(msg)
}
const handleGameover = (isWin: boolean) => {
  console.log(isWin?"win":"lose")
  if(isWin){
    winDialog.value?.show()
  }else{
    loseDialog.value?.show()
  }
}
watch(
  () => useStore().restart,
  () => {
    // setWidth()
  }
)
</script>
<style>
html, body ,#app{
  height: 100%;
  overflow: hidden;
}
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
}
#container{
  margin: 0;
}
.el-dialog__header{
    display: none;
}
</style>
<template>
  <ElContainer direction="vertical" id="container">
    <CustomHeader ref="header" @reload-click="handleReloadClick" @setting-click="handleSettingClick"/>
    <CustomBody ref="body" @gameover="handleGameover"/>
    <WinDialog ref="winDialog" @restart="handleReloadClick"/>
    <LoseDialog ref="loseDialog" @restart="handleReloadClick"/>
  </ElContainer>
</template>

