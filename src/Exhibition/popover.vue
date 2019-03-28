<template>
    <div class="popover" ref="popover">
             <div ref="contentWrapper" class="content-wrapper"
                     :class="[[`position-${position}`],themeStyle]"
                     v-show="visible">
                    <div class="contentSlot">
                        <slot name="content" :close="toggle"></slot>
                    </div>
             </div>
        <span ref="trigger" style="display: inline-block">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "x-popover",
        data () {
            return {
                visible: false,
            }
        },
        mounted(){
            let {popover} = this.$refs
            this.event = {
                click:{
                    event:['click'],
                    fun:this.onClick
                },
                hover:{
                    event:['mouseenter','mouseleave'],
                    fun:this.toggle
                },
                focus:{
                    event:['mousedown','mouseup'],
                    fun:this.toggle
                }
            }
            this.event[this.trigger].event.forEach(eventName=>{
                popover.addEventListener(eventName,this.event[this.trigger].fun)
            })

        },
        beforeDestroy(){
            let {popover,contentWrapper} = this.$refs

            this.event[this.trigger].event.forEach(eventName=>{
                popover.removeEventListener(eventName,this.event[this.trigger].fun)
            })
            this.$el.remove()
            contentWrapper.remove()
        },
            props:{
                    position:{
                        type:String,
                        default:'top',
                        validator(val){
                            return ['top','bottom','left','right'].indexOf(val)>-1
                        }
                    },
                trigger:{
                        type: String,
                        default: 'click',
                        validator(val){
                            return ['click','hover','focus'].indexOf(val)>-1
                        }
                },
                theme:{
                    type: String,
                    default: 'blackBorder',
                    validator(val){
                        return ['blackBorder','whiteBg'].indexOf(val)>-1
                    }
                }
            },
        computed:{
            openEvent(){
                if(this.trigger ==='click'){
                    return 'click'
                }else if(this.trigger ==='hover'){
                    return 'mouseenter'
                }else{
                    return 'focus'
                }
          },
            closeEvent(){
                if(this.trigger ==='click'){
                    return 'click'
                }else if(this.trigger ==='hover'){
                    return 'mouseleave'
                }else{
                    return 'focus'
                }
            },
            themeStyle(){
              if(this.theme==='whiteBg'){
                  return 'theme2'
              }
            }
        },
        methods: {
            contentPosition(){
                const {contentWrapper,trigger} = this.$refs
                document.body.appendChild(contentWrapper)
                let {top,left,height,width} = trigger.getBoundingClientRect()
                let x = {
                    top:{
                        top:top + window.scrollY,
                        left:left + window.screenX
                    },
                    bottom:{
                        top:top + height + window.scrollY,
                        left:left + window.screenX
                    },
                    left:{
                        top:top  + window.scrollY,
                        left:left  + window.screenX
                    },
                    right:{
                        top:top  + window.scrollY ,
                        left:left +width  + window.screenX
                    }
                }
                contentWrapper.style.left = x[this.position].left + 'px'
                contentWrapper.style.top = x[this.position].top + 'px'
            },

            listenerDocument(){
                document.addEventListener('click',this.eventHandler)
            },
            removeListener(){
                document.removeEventListener('click', this.eventHandler)
            },
            isconWrapepr(e){    //判断点击的地方是否在contentWrapper里面
              return   e.path.some(child=>{
                    if(child===this.$refs.contentWrapper){
                        return true
                    }
                })
            },
            isPopover(e){    //判断点击的地方是否在contentWrapper里面
                return   e.path.some(child=>{
                    if(child===this.$refs.popover){
                        return true
                    }
                })
            },

            eventHandler(e){
                if(this.outClickisOn)return
                if(this.isPopover(e) || this.isconWrapepr(e))return
                if(!this.isconWrapepr(e) && this.$refs.popover &&!(this.$refs.popover===e.target || this.$refs.popover.contains(e.target))) {
                   this.toggle()
                }
            },

            toggle(){
                this.visible = !this.visible
                if(this.visible){
                    this.contentPosition() //搞定内容弹出的位置
                    this.listenerDocument()//添加document的事件监听，在外部点击可以关闭气泡
                }else{
                     this.removeListener()
                }


            },
            onClick () {
                if(this.trigger!=='click')return
                if (this.$refs.trigger.contains(event.target)) {
                  this.toggle()
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    $border-color: #f3f3f3;
    $border-radius: 4px;
    .popover {
        display: inline-block;
        vertical-align: top;
        transition: .3s all ease-in-out;
        position: relative;
    }
    .contentSlot{
        max-width: 15em;
        max-height: 15em;
        overflow: scroll;
        overflow-x:auto;
        overflow-y: auto;
    }
    .content-wrapper {
        position: absolute;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
        background: white;
        padding: .5em 1em;
        z-index: 1000;
        word-break: break-all;
        &::before, &::after {
            content: '';
            display: block;
            border: 10px solid transparent;
            width: 0;
            height: 0;
            position: absolute;
        }
        &.position-top {
            transform: translateY(-100%);
            margin-top: -10px;
            &::before, &::after {
                left: 10px;
            }
            &::before {
                border-top-color: #f3f3f3;
                border-bottom: none;
                top: 100%;
            }
            &::after {
                border-top-color: white;
                border-bottom: none;
                top: calc(100% - 1px);
            }
        }
        &.position-bottom {
            margin-top: 10px;
            &::before, &::after {
                left: 10px;
            }
            &::before {
                border-top: none;
                border-bottom-color: #f3f3f3;
                bottom: 100%;
            }
            &::after {
                border-top: none;
                border-bottom-color: white;
                bottom: calc(100% - 1px);
            }
        }
        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                transform: translateY(-100%);
                top: 50%;
            }
            &::before {
                border-left-color: #f3f3f3;
                border-right: none;
                left: 100%;
            }
            &::after {
                border-left-color: white;
                border-right: none;
                left: calc(100% - 1px);
            }
        }
        &.position-right {
            margin-left: 10px;
            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
            }
            &::before {
                border-right-color: #f3f3f3;
                border-left: none;
                right: 100%;
            }
            &::after {
                border-right-color: white;
                border-left: none;
                right: calc(100% - 1px);
            }
        }
        &.theme2{
            margin: 0;
            border:$border-radius solid white;
            filter: drop-shadow(1px 3px 3px rgba(0, 0, 0, 0.6));
            background: white;
            z-index: 1000;
            &::before {
                display: none;
            }
            &::after {
                display: none;
            }
        }

    }

</style>
