<script lang="ts">
  export default {
    name: 'CustomHeader',
    inheritAttrs: false,
    customOptions: {}
  }
</script>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useStore } from '@/store/store'
//data
const difficulty = ref<"Easy"|"Normal"|"Hard">(useStore().difficulty)
const size = ref(useStore().size)
const mineCount = ref(useStore().mineCount)
const emit = defineEmits([
  "reload-click",
  "setting-click"
])
//functions
const handleReloadClick = () => {
  emit("reload-click")
}
const handleSettingClick = () => {
  emit("setting-click")
}
//watch
watch(
  ()=>difficulty.value,
  () => {
    useStore().setDifficulty(difficulty.value)
    size.value = useStore().size
    mineCount.value = useStore().mineCount
  }
)
</script>
<style>
.el-header{
  --el-header-height: 50px !important;
  --el-header-padding: 0 !important;
    /* border: 1px solid black; */
    width: 400px;
}
.w-25{
  width: 25px;
}
.overflow-hidden{
  overflow: hidden;
}
</style>
<template>
    <ElHeader>
      <ElSpace>
        <ElSelect v-model="difficulty">
          <ElOption value="Easy" label="Easy"/>
          <ElOption value="Normal" label="Normal"/>
          <ElOption value="Hard" label="Hard"/>
        </ElSelect>
        <div class="w-25 overflow-hidden">{{ size }}</div>
        <div class="w-25 overflow-hidden">{{ mineCount }}</div>
        <ElButton :circle="true" style="height: 100%" @click="handleReloadClick">
          <Icon icon="material-symbols:refresh" :width="25" :height="25"/>
        </ElButton>
        <ElButton :circle="true" style="height: 100%" @click="handleSettingClick">
          <Icon icon="eos-icons:rotating-gear" :width="25" :height="25"/>
        </ElButton>
      </ElSpace>
    </ElHeader>
</template>
