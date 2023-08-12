<script setup lang="ts">
import { ElCard } from 'element-plus';
import { Icon } from '@iconify/vue';
import { BrickStatus, Around, Mine, CloseStatus } from '../script/game'
import { CSSProperties, reactive, ref, watch } from 'vue';
import { useStore } from '@/store/store'
//data
const prop = defineProps({
    status: {
        type: BrickStatus,
        requried: true
    },
    row: {
        type: Number,
        required: true
    },
    col: {
        type: Number,
        required: true
    },
    opened: {
        type: Boolean,
        required: true
    }
})
const closeStatus = ref<CloseStatus>(CloseStatus.Closed)
const opened = ref(false)
const style = reactive<CSSProperties>({
    padding: 0,
    background: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
})
const width = '100%'
//function
const show = () => {
    style.background = '#535353'
    opened.value = true
}
const hide = () => {
    style.background = 'gray'
    opened.value = false
}
const onClick = () => {
    if(opened.value || closeStatus.value!==CloseStatus.Closed) return
    emit('click', prop.row, prop.col)
}
const onRightClick = ()=> {
    if(opened.value) return
    switch(closeStatus.value){
        case CloseStatus.Closed:
            closeStatus.value = CloseStatus.Flag
            break
        case CloseStatus.Flag:
            closeStatus.value = CloseStatus.Question
            break
        case CloseStatus.Question:
            closeStatus.value = CloseStatus.Closed
    }
}
const valueToColor = (val:number) => {
    let color
    switch(val){
        case 1:
            color = 'red'
            break
        case 2:
            color = 'blue'
            break
        case 3:
            color = 'green'
            break
        case 4:
            color = 'orange'
            break
        default:
            color = ''
    }
    return color
}
//init
const emit = defineEmits<{
    (e: 'click', row: number, col: number) : void
}>()
watch(
    ()=> prop.opened,
    (val)=>{
        if(val) show()
        else hide()
    }
)
watch(
    () => useStore().restart,
    () => {
        closeStatus.value = CloseStatus.Closed
    }
)
</script>
<style scoped>
.el-card{
    overflow: visible !important;
}
.el-card:hover .select{
    position: absolute;
    width: 100%;
    height: 100%;
    border-width: 0.25em;
    border-color: rgba(0, 0, 0, 0.8);
    border-style: dashed;
    border-radius: 4px;
    z-index: 100;
}
.full{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
<template>
    <ElCard shadow="never" :body-style="style" @click="onClick" @contextmenu.prevent="onRightClick" class="brick">
        <div class="select" />
        <div v-if="opened" class="full">
            <Icon v-if="(status instanceof Around)" :icon="`mdi:number-${status.value}`" :width="width" :color="valueToColor(status.value)"/>
            <Icon v-else-if="(status instanceof Mine)" icon="mdi:mine" :width="width"/>
        </div>
        <div v-else class="full">
            <Icon v-if="closeStatus==CloseStatus.Flag" icon="mingcute:flag-3-line" width="100%"/>
            <Icon v-else-if="closeStatus==CloseStatus.Question" icon="healthicons:question-mark" width="100%" />
        </div>
    </ElCard>   
</template>