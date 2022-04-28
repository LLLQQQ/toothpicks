// 15个任意物品（可以是火柴牙签poker）
// 以下按牙签为例

// 将15根牙签
// 分成三行
// 每行自上而下（其实方向不限）分别是3、5、7根

// 安排两个玩家，每人可以在一轮内，在任意行拿任意根牙签，但不能跨行

// 拿最后一根牙签的人即为输家

// answer
// 先手有必胜策略
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const arr = [3, 5, 7]
const start = () => {
    const findAnswer = () => {
        const rest = arr.filter(v => v > 0)
        // 如果仅剩1堆且该堆仅剩1个,则先手输了; 或者扩展一下仅剩奇数堆且这些堆各自仅剩1个
        if (rest.length === 1 && rest[0] === 1) {
            console.log("Pick the latest one")
            console.log("Rest nums : [0,0,0]")
            console.log("Game over : You win")
            return true
        }
        // 如果全是0，说明上一轮后手已拿完
        if (rest.length === 0) {
            console.log("Game over : PC win")
            return true
        }
        // 如果有且仅有一个堆内有>1个牙签,那么拿走n-1个
        const notOneRest = rest.filter(v => v !== 1)
        if (notOneRest.length === 1) {
            const pickIndex = arr.indexOf(notOneRest[0])
            const pickNum = notOneRest[0] - 1
            console.log("Game over : You win")
            console.log(`Pick  [PC]: 第${pickIndex + 1}堆, 取${pickNum}个`)
            arr[pickIndex] = 1
        } else {
            const s = arr.reduce((pV, cV) => pV ^ cV, 0)
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > (s ^ arr[i])) {
                    const pickNum = arr[i] - (s ^ arr[i])
                    console.log(`Pick  [PC]: 第${i + 1}堆, 取${pickNum}个`)
                    arr[i] -= pickNum
                    break
                }
            }
        }
        console.log(`Rest nums : [${arr.join()}]`)
        return false
    }
    const ans = findAnswer()
    if (ans) {
        rl.close()
    } else {
        rl.on('line', function (line) {
            // console.log(line)
            if (typeof line === 'string' && line !== "") {
                const nums = line.split(' ').filter(s => s !== '').map(s => parseInt(s)).filter(v => typeof v === 'number' && !isNaN(v))
                if (nums.length === 2) {
                    const [index, num] = nums
                    if (arr[index - 1] !== undefined && arr[index - 1] >= num) {
                        // console.log(nums)
                        arr[index - 1] -= num
                        console.log(`Rest nums : [${arr.join()}]`)
                        const ans = findAnswer()
                        if (ans) {
                            rl.close()
                        } else {
                            console.log('write your choice')
                        }
                        return
                    }
                }
            }
            console.log("format error")
        });
    }
}

console.log("Game start: [3,5,7]")
start()


