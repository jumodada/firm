import Toast from './toast'

let currentToast

export default {
    install(Vue,options){
        Vue.prototype.$toast = function (val,toastOptions) {
            if (currentToast) {
                currentToast.close()
            }
            currentToast = createToast({Vue,
                msg:val,
                propsData:toastOptions,
                onClose:()=>{
                    currentToast = null
                }
            })
        }
    }
}

function createToast({Vue,msg,propsData,onClose}) {
    let Constructor = Vue.extend(Toast)
    let toast =  new Constructor({
        propsData
    })
    toast.$slots.default = [msg]
    toast.$mount()
    toast.$on('close',onClose)
    document.body.appendChild(toast.$el)
    return toast
}

