
function strip(num, precision = 12) {
    return +parseFloat(num.toPrecision(precision))
}


function digitLength(num) {
    // Get digit length of e
    const eSplit = num.toString().split(/[eE]/)
    const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0)
    return len > 0 ? len : 0
}


function float2Fixed(num) {
    if (num.toString().indexOf('e') === -1) {
        return Number(num.toString().replace('.', ''))
    }
    const dLen = digitLength(num)
    return dLen > 0 ? num * Math.pow(10, dLen) : num
}


function checkBoundary(num) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        console.warn(
            `${num} is beyond boundary when transfer to integer, the results may not be accurate`
        )
    }
}

/**
 * 精确乘法
 */
function times(num1, num2) {
    if(!num1)num1=0
    if(!num2)num2=0
    const num1Changed = float2Fixed(num1)
    const num2Changed = float2Fixed(num2)
    const baseNum = digitLength(num1) + digitLength(num2)
    const leftValue = num1Changed * num2Changed
    checkBoundary(leftValue)
    return leftValue / Math.pow(10, baseNum)
}

/**
 * 精确加法
 */
function plus(num1, num2) {
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum
}

/**
 * 精确减法
 */
function minus(num1, num2) {
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
    return (times(num1, baseNum) - times(num2, baseNum)) / baseNum
}

/**
 * 精确除法
 */
function divide(num1, num2) {
    const num1Changed = float2Fixed(num1)
    const num2Changed = float2Fixed(num2)
    checkBoundary(num1Changed)
    checkBoundary(num2Changed)
    return times(
        num1Changed / num2Changed,
        Math.pow(10, digitLength(num2) - digitLength(num1))
    )
}

/**
 * 四舍五入
 */
function round(num, ratio) {
    if(!num)num=0
    const base = Math.pow(10, ratio)
    return divide(Math.round(times(num, base)), base)
}

export {
    strip,
    plus,
    minus,
    times,
    divide,
    round,
    digitLength,
    float2Fixed
}
