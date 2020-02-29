

function deepClone(item) {
    if (!item) return item

    var types = [ Number, String, Boolean ], result;
    types.forEach(function(type) {
        if (item instanceof type) result = type( item )
    })

    if (typeof result === 'undefined') {
        if (Object.prototype.toString.call(item).slice(8,-1) === 'Array') {
            result = []
            item.forEach((child, index)=>result[index] = deepClone( child ))
        } else if (typeof item === 'object') {
            if (item.nodeType && typeof item.cloneNode === 'function') {
                result = item.cloneNode(true)
            } else if (!item.prototype) {
                if (item instanceof Date) {
                    result = new Date(item)
                } else {
                    result = {};
                    for (let i in item) {
                        result[i] = deepClone( item[i] )
                    }
                }
            } else {
                result = false ? new item.constructor() : item
            }
        } else {
            result = item
        }
    }

    return result
}


function recurrenceOnceDeepCopy(obj) {
    const cloneObj = {}
    Object.keys(obj).forEach(item=>cloneObj[item] = obj[item])
    return cloneObj
}

export {deepClone,recurrenceOnceDeepCopy}
