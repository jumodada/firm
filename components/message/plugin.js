import Message from './message'
import Vue from 'vue'
let currentMessage

function createToast({Vue,msg,propsData,onClose}) {
    let Constructor = Vue.extend(Message)
    let _Message =  new Constructor({
        propsData
    })
    _Message.$slots.default = [msg]
    _Message.$mount()
    _Message.$on('close',onClose)
    document.body.appendChild(_Message.$el)
    return _Message
}

function common(val,option){
    if (currentMessage) currentMessage.close()
    currentMessage = createToast({Vue,
        msg:val,
        propsData:option,
        onClose:()=>{
            currentMessage = null
        }
    })
}

function $Message(val,options) {
     common(val,options)
}
$Message.success = (val)=>common(val,{type:'success'})
$Message.error = (val)=>common(val,{type:'error'})
$Message.warn = (val)=>common(val,{type:'warn'})


export default $Message