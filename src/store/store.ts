import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const difficulty = ref<"Easy"|"Normal"|"Hard">("Easy")
    const size = ref<number>(9)
    const mineCount = ref<number>(10)
    const restart = ref<boolean>(false)

    function setDifficulty(val:"Easy"|"Normal"|"Hard"){
        switch(val){
            case "Easy":
                difficulty.value = "Easy"
                size.value = 9
                mineCount.value = 10
                break
            case "Normal":
                difficulty.value = "Normal"
                size.value = 16
                mineCount.value = 40
                break
            case "Hard":
                difficulty.value = "Hard"
                size.value = 25
                mineCount.value = 100
                break
        }
    }

    function toggleRestart(){
        restart.value = !restart.value
    }

    return { difficulty, size, mineCount, restart, setDifficulty, toggleRestart }
})