const vector = [
    [-1,1],[0,1],[1,1],
    [-1,0],      [1,0],
    [-1,-1],[0,-1],[1,-1]
]

export class BrickStatus<T>{
    private number:T;

    constructor(val:T){
        this.number = val
    }
    get value(): T{
        return this.number
    }
    set value(val: T){
        this.number = val
    }
}
export class Safe extends BrickStatus<number>{
    constructor(){
        super(0);
    }
}
export class Around extends BrickStatus<number>{
    constructor(val:number){
        super(val)
    }
}
export class Mine extends BrickStatus<string>{
    constructor(){
        super('mine')
    }
}

export enum CloseStatus{
    Closed,
    Flag,
    Question
}


/** 
 * @function
 * Acccording to size and mineCount in parameters, this function will generate a square array that contains 'mineCount' mines.
 * If col and row in parameters have value, then function will generate a square array that contains 'mineCount' mines, and ensure that [row, col] is safe.
 * @param size : The dimension of returned square array.
 * @param mineCount : How many mines you want in answer.
 * @param col : (not required) The column of first step .
 * @param row : (not required) The row of first step.
 *@returns Answer : A square array which dimension is 'size'.
*/
export function generateAnswer(size:number, mineCount: number,col?:number, row?:number):Array<Array<number | "mine">> {
    const answer = new Array<Array<number | "mine">>(size)
    for(const idx of answer.keys()) answer[idx] = new Array<number | "mine">(size).fill(0)
        for(let i=0; i<mineCount; i++){
            const x = Math.floor(Math.random()*100)%size
            const y = Math.floor(Math.random()*100)%size
            const inFirstMoveRange = (x:number, y:number)=>{
                //If row or col is undefined, then this function return false.
                if(typeof row != 'number' || typeof col != 'number') return false 

                if(x===row && y===col) return true
                for(const [dx, dy] of vector){
                    const xInRange = row+dx>=0 && row+dx<size
                    const yInRange = col+dy>=0 && col+dy<size
                    if(!xInRange || !yInRange) continue
                    if(x===row+dx && y===col+dy) return true
                }
                return false
            }
            if(answer[x][y]=='mine' || inFirstMoveRange(x,y)) i--
            else{
                answer[x][y] = 'mine'
                for(const [dx,dy] of vector){
                    const xInRange = x+dx>=0 && x+dx<size
                    const yInRange = y+dy>=0 && y+dy<size
                    if(xInRange && yInRange && answer[x+dx][y+dy] != 'mine' ) answer[x+dx][y+dy] = answer[x+dx][y+dy] as number + 1
                }
            }
        }
        console.log(answer)
    return answer
}
/**
 * @summary Generate a new 'size' dimension square array fill of 0.
 * @function newSquare 
 * @param size Then dimension of square array fill of 0
 * @returns sqaure array
 */
export function newSquare<T>(size: number, value:T):Array<Array<T>>{
    const array = new Array(size)
    for(let i=0; i<size; i++){
        const temp = new Array(size)
        for(let j=0; j<size; j++) temp[j] = value
        array[i] = temp
    }
    return array
}
/**
 * @function getAdjecent
 * @param size 
 * @param x 
 * @param y 
 * @returns 
 */
function getAdjecent(size:number, x:number, y:number):Array<Array<number>>{
    const array = []
    for(const [dx, dy] of vector){
        const inBoard = x+dx>=0 && x+dx<size && y+dy>=0 && y+dy<size
        if(inBoard) array.push([x+dx, y+dy])
    }
    return array
}

export function calOpened(x:number, y:number, answer: Array<Array<number|string>>){
    let open = [[x,y]]
    if(answer[x][y]!==0) return open
    let adjecent = getAdjecent(answer.length, x, y)
    const totalAdjecent = []
    do{
        const [xx, yy] = adjecent.pop() as Array<number>
        
        const isZero = answer[xx][yy]===0
        const isInOpen = open.find(el=>el[0]===xx&&el[1]===yy)!=undefined

        if(isInOpen) continue
        if(isZero){
            open.push([xx,yy])
            adjecent = adjecent.concat(getAdjecent(answer.length, xx, yy))
        }else{
            totalAdjecent.push([xx,yy])
        }
        
    }while(adjecent.length>0)
    open = open.concat(totalAdjecent)
    return open
}
/**
 * check win
 * @param size 
 * @param mineCount 
 * @param openCount 
 * @returns boolean
 */
export function isWin(size: number, mineCount: number, openCount: number): boolean{
    const max = Math.pow(size, 2) - mineCount
    return max <= openCount
}