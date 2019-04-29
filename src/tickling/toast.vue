<template>
<div class="toast" ref="toast" :class="[toastClass,typeSelect]">
    <div class="toast-icon" v-if="type">
        <x-icon :name="type" style="width: 2em;height: 2em">

        </x-icon>
    </div>
    <div class="message">
        <slot v-if="!enableHTML"></slot>
        <div  v-else v-html="$slots.default[0]"></div>
    </div>
    <p class="divided" ref="divided"></p>
    <span v-if="closeButton" class="close" @click="onClickClosed">
        <div v-if="closeButton.text &&!closeButton.closeIcon">
            {{closeButton.text}}
        </div>
         <x-icon  class="close-icon" v-if="closeButton.closeIcon"
                  :name="closeButton.closeIcon"
                  style="width: 1em;height: 1em;"
                  :style="typeStyle"
         >
        </x-icon>
    </span>
</div>
</template>

<script>
    import Icon from '../currency/icon'
    export default {
        name: "toast",
        components:{
            'x-icon':Icon
        },
        props: {
            type:{
              type:String,
              validator(val){
                  return ['success','warn','error'].indexOf(val)>-1
              }
            },
            autoClosed: {
                type: [Boolean,Number],
                default: 2,
                validator(val){
                    return val === false || typeof val === 'number'
                }
            },
            closeButton: {
                type: Object,
                default: () => {
                    return {
                        text: null,
                        closeIcon:'wrong',
                        callback: () => {

                        }
                    }
                },

                validator(val){
                        let judge =['wrong','correct'].indexOf(val.closeIcon) >-1
                        if(!val.text &&!val.closeIcon)return console.error('至少设置一项')
                        if(val.text && val.text.length>5)return console.error('不能输入超过5个字')
                        if(judge) return true
                        return false
                }
            },
            enableHTML:{
                type:Boolean,
                default:false
            },
            position:{
                type:String,
                default:'top',
                validator(val){
                      return   ['top','bottom','center'].indexOf(val)>-1
                }
            },
        },
            mounted() {
                this.exeAutoClosed()
                this.updateStyles()
            },
        computed:{
            typeSelect(){
                if(!this.type)return
                return `type-${this.type}`
            },
            typeStyle(){
                if(!this.type)return
                let typeColor = {
                    success:'fill:#67c23a;',
                    warn:'fill:#e6a23c;',
                    error:'fill:#f56c6c;'
                }
                return typeColor[this.type]
            },
            toastClass(){
                return `position-${this.position}`
            }
        },
            methods: {
                updateStyles(){
                    let coefficient = 0.8
                    let height = this.$refs.toast.getBoundingClientRect().height
                    this.$nextTick(()=>{
                        this.$refs.divided.style.height =  `${height*coefficient}px`
                    })
               },
                    exeAutoClosed(){

                     if (this.autoClosed) {
                            setTimeout(()=>{
                                 this.close()
                       }, this.autoClosed * 1000)
                   }
               },

                leaveActive(){
                    let {bottom,height,top}  =this.$el.getBoundingClientRect()
                    let $el = this.$el.style
                    let position =this.position
                        if(position ==='top'){
                            $el.top = `${top-height}px`
                        }else if(position ==='bottom'){
                            $el.top = `${bottom+height}px`
                        }else if(position ==='center'){
                            $el.opacity = 0
                        }
                },
                close() {
                      this.leaveActive()
                      setTimeout(()=>{
                          this.$el.remove()
                          this.$emit('close')
                          this.$destroy()
                      },450)
                },
                onClickClosed(){
                    this.close()
                    if(this.closeButton && typeof this.closeButton.callback === 'function'){
                        this.closeButton.callback()
                    }
                }
            }

    }
</script>

<style scoped lang="scss">
    $font-size:14px;
    $toast-min-height:20px;
    $toast-bg:#e4e0e0;
    $animation-duration:.45s;

    @keyframes slideUp {
        0%{
            transform: translateY(0%) translateX(-50%);
        }
        100%{
            transform: translateY(-100%) translateX(-50%);
        }
    }
    @keyframes slideDown {
        0%{
            transform: translateY(-100%) translateX(-50%);
        }
        100%{
            transform: translateY(0%) translateX(-50%);
        }
    }
    @keyframes fade-in {
        0%{
           opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
.toast{
    transition: all $animation-duration;
    border: 1px solid $toast-bg;
    position: fixed;
    z-index: 2000;
    font-size: $font-size;
    line-height: 1.3;
    min-height: $toast-min-height;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    display: flex;
    border-radius: 3px;
    align-items: center;
    background: $toast-bg;
    padding: 0 2px 0 15px;
    color: #999999;
    .bounce-enter-active {
        animation: bounce-in .45s;
    }
    .bounce-leave-active {
        animation: bounce-in .45s reverse;
    }
    .message{
        padding:0;
    }
    .divided{
        border: 0.5px solid #fcfcf5;
        min-height: 0.8*$toast-min-height;
        margin-left: 15px;
    }
    .close{
        margin-left: 15px;
        margin-right: 10px;
        font-size: 20px;
        .close-icon{
           display: flex;
        }
    }
    &.position-top{
        top:0;
        left: 50%;
        transform: translateX(-50%);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        animation: slideDown  $animation-duration;

    }
    &.position-bottom{
        top:100%;
        transform: translateY(-100%) translateX(-50%);
        left: 50%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        animation: slideUp  $animation-duration;
    }
    &.position-center{
        top:50%;
        transform: translateY(-50%)translateX(-50%);
        left: 50%;
        animation: fade-in $animation-duration;
    }
    &.type-success{
        background-color: #e1f3d8;
        border: #e1f3d8;

        box-shadow: 0 0 3px #1fab06;
        color: #67c23a;
    }
    &.type-error{
        background-color: #fef0f0;
        border: #fef0f0;
        color:#f56c6c;
        box-shadow: 0 0 3px #d81e06;
    }
    &.type-warn{
        background-color: #faecd8;
        border: #faecd8;
        color:#e6a23c;
        box-shadow: 0 0 3px #bda109;
    }
    > .toast-icon{
        display: flex;
        margin-right: 10px;
    }
}
</style>
