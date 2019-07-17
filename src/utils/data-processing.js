

function deepCopy(data) {
    //todo
}


function recurrenceOnceDeepCopy(obj) {
    const cloneObj = {}
    Object.keys(obj).forEach(item=>cloneObj[item] = obj[item])
    return cloneObj
}

export {deepCopy,recurrenceOnceDeepCopy}
