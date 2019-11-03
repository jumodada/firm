

function deepClone(item,hash = new WeakMap()) {
    if (!item) return item
    if (hash.has(item))return hash.get(item);  //检查循环引用
    var result,
        type = Object.prototype.toString.call(item).slice(8,this.length-1),
        fk= ['String','Number','Boolean','Function'].indexOf(type)>-1

    if(fk){
        result = item;//直接赋值
    }else if(item.nodeType && typeof item.cloneNode === "function"){
        result = item.cloneNode(true);          //是否是dom对象
    }else{

        let other = {           //需要递归或者其他的操作
            Array() {
                result = []
                item.forEach((child, index)=>{
                    hash.set(item, result);
                    result[index] = deepClone(child,hash)
                })
            },
            Date(){
                result = new Date(item)
            },
            Object(){
                result = {}
                Reflect.ownKeys(item).forEach(child=>{
                    hash.set(item, result);
                    result[child] = deepClone(item[child],hash)
                })
            }
        }
        other[type]()
    }
    return result;
}


function recurrenceOnceDeepCopy(obj) {
    const cloneObj = {}
    Object.keys(obj).forEach(item=>cloneObj[item] = obj[item])
    return cloneObj
}

export {deepClone,recurrenceOnceDeepCopy}
