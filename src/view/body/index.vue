<script lang="ts">
export default {
    name: 'CustomBody',
    inheritAttrs: false,
    customOptions: {}
  }
</script>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Safe, generateAnswer, newSquare, Mine, Around, BrickStatus, calOpened, isWin } from './script/game'
import Brick from './components/brickComponent.vue'
import { useStore } from '@/store/store';
//data
const count = ref(0)
const size = ref(useStore().size)
const mineCount = ref(useStore().mineCount)
const isFirstStep = ref(true)
const answer = ref<Array<Array<number|"mine">>>([[]])
const opened = ref<Array<Array<boolean>>>([[]])
const emit = defineEmits<{
    gameover: [isWin: boolean]
}>()
//functions
const brickOnClick = (row: number, col: number) => {
    if(isFirstStep.value){
        isFirstStep.value = false
        answer.value = generateAnswer(size.value, mineCount.value, col, row)
    }
    const open = calOpened(row, col, answer.value)
    for(const [x,y] of open){
        if(opened.value[x][y]) continue
        opened.value[x][y] = true
        if(answer.value[x][y] === 'mine'){
            emit("gameover", false)
            return
        }
        count.value++
    }
    if(isWin(size.value, mineCount.value, count.value)){
        emit("gameover", true)
    }
}
const brickStatus = (val:number | string):BrickStatus<number | string>=>{
    switch(val){
        case 0:
            return new Safe()   
        case 'mine':
            return new Mine()
        default:
            return new Around(val as number)
    }
}
const setSize = () => {
    const root = document.documentElement.style
    const size = Math.floor(400/useStore().size)-2
    switch(useStore().difficulty){
        case 'Easy':
            root.setProperty("--brick-size", size+"px")
            break
        case 'Normal':
            root.setProperty("--brick-size", size+"px")
            break
        case 'Hard':
            root.setProperty("--brick-size", size+"px")
            break
    }
}
const init = (size: number) => {
    isFirstStep.value = true
    count.value = 0
    answer.value = newSquare(size, 0)
    opened.value = newSquare(size, false)
    setSize()
}
const restart = () => {init(size.value)}
//watch
watch(
    () => useStore().difficulty,
    () => {
        size.value = useStore().size
        mineCount.value = useStore().mineCount
        setSize()
        restart()
    }
)
//init
onMounted(()=>{
    init(size.value)
})
defineExpose({
    restart
})
</script>
<style>
:root{
    --brick-size: "25px"
}
.el-main{
    /* border: 1px solid black; */
    overflow:  hidden !important;
    padding: 0 !important;
}
.center{
    display: flex;
    align-content: center;
    justify-content: center;
}
.border{
    border: 1px solid black;
}
.brick>.el-card__body{
    width: var(--brick-size);
    height: var(--brick-size);
}
#main{
    width: 400px;
    height: 400px;
}
</style>
<template>
    <ElMain id="main">
        <div>
            <div v-for="(row, i) in answer" :key="i" class="center">
                <template v-for="(val, j) in row" :key="j">
                    <Brick :status="brickStatus(val)" :row="i" :col="j" @click="brickOnClick" :opened="opened[i][j]"/>
                </template>
            </div>
        </div>
    </ElMain>
</template>