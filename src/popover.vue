<template>
    <div class="popover" ref="popover">
                <div ref="contentWrapper" class="content-wrapper"
                     :class="{[`position-${position}`]:true}"
                     v-show="visible">
                    <div class="contentSlot">
                        <slot name="content" :close="close"></slot>
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
                animate:false,
                outClickisOn:false,
                interval:null,
                timer:null
            }
        },
        mounted(){
            if(this.trigger==='click'){
                this.$refs.popover.addEventListener('click',this.onClick)

            }else if(this.trigger==='hover'){
                this.$refs.popover.addEventListener('mouseenter',this.open)
                this.$refs.popover.addEventListener('mouseleave',this.close)
            }else{
                this.$refs.popover.addEventListener('mousedown',this.open)
                this.$refs.popover.addEventListener('mouseup',this.close)
            }

        },
        beforeDestroy(){
            if(this.trigger==='click'){
                this.$refs.popover.removeEventListener('click',this.onClick)
            }else if(this.trigger==='hover'){
                this.$refs.popover.removeEventListener('mouseenter',this.open)
                this.$refs.popover.removeEventListener('mouseleave',this.close)
            }else{
                this.$refs.popover.removeEventListener('mousedown',this.open)
                this.$refs.popover.removeEventListener('mouseup',this.close)
            }
                this.clearTimer()   //清除定时器和新增的dom节点
                this.$el.remove()
                this.$refs.contentWrapper.remove()
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

            listenToDocument(){
                document.addEventListener('click',this.eventHandler)
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
                   this.close()
                }
            },
            toOpen(e){
                if(this.isPopover(e)) {
                    let vm = this.$refs.contentWrapper
                    let opacity = getComputedStyle(vm).opacity
                    this.open(opacity)
                }
            },
            toClose(e){
                if(this.isPopover(e)) {
                    this.close()
                }
                if(!this.isPopover(e) && !this.isconWrapepr(e)){
                    document.removeEventListener('click', this.toClose)
                    clearTimeout(this.timer)
                }
            },
            closeAndHoverIn(e){
                if(this.$refs.contentWrapper ===e.target){
                    this.open()
                }
            },
            openAndHoverOut(e){
                if(this.$refs.contentWrapper ===e.target){
                    this.close()
                }
            },
            clearTimer(){
                clearInterval(this.interval)
                clearTimeout(this.timer)
            },
            open(op){
                if(this.trigger==='hover'){
                    this.$refs.contentWrapper.removeEventListener('mouseenter',this.closeAndHoverIn)
                    this.$refs.contentWrapper.addEventListener('mouseleave',this.openAndHoverOut)
                    document.removeEventListener('click', this.eventHandler)
                }
                    this.outClickisOn = false
                    this.clearTimer()
                  setTimeout(()=>{
                      document.removeEventListener('click', this.toOpen)
                      document.addEventListener('click', this.toClose)

                })
                   this.$refs.contentWrapper.style.opacity = 0
                   this.visible = true

                   this.contentPosition() //搞定内容弹出的位置
                   this.listenToDocument()//添加document的事件监听，在外部点击可以关闭气泡

                       let currentTime
                       let contentOpacity
                       if(op &&typeof op ==='number'){
                            this.$refs.contentWrapper.style.opacity = op
                           contentOpacity= op
                            currentTime = (op/1)*300
                       }else{
                            currentTime = 300
                            contentOpacity = 0
                       }
                       this.animate= true
                       this.interval = setInterval(()=>{
                           this.$refs.contentWrapper.style.opacity = contentOpacity
                           contentOpacity += 0.1
                       },30)
                       this.timer = setTimeout(()=>{
                           this.animate= false
                           document.removeEventListener('click', this.toClose)
                           this.clearTimer()
                       },currentTime)

            },
            close(){
                let vm = this.$refs.contentWrapper
                let opacity = getComputedStyle(vm).opacity
                if(this.trigger==='hover'){
                    this.$refs.contentWrapper.removeEventListener('mouseleave',this.openAndHoverOut)
                    this.$refs.contentWrapper.addEventListener('mouseenter',this.closeAndHoverIn)
                }
                this.outClickisOn  = true
                setTimeout(()=>{
                    document.removeEventListener('click', this.toClose)
                    document.addEventListener('click', this.toOpen)
                })
                this.clearTimer()
                if(parseInt(opacity)===0) opacity =1
                this.$refs.contentWrapper.style.opacity = opacity
                let currentTime = (1/opacity)*300
                this.animate= true
                this.interval = setInterval(()=>{
                      this.$refs.contentWrapper.style.opacity -= 0.1
                },30)
                this.timer = setTimeout(()=>{
                    this.visible = false
                    this.animate= false
                    this.outClickisOn = false
                    if(this.trigger==='hover'){
                        this.$refs.contentWrapper.removeEventListener('mouseenter',this.closeAndHoverIn)
                    }
                    document.removeEventListener('click', this.toOpen)
                    document.removeEventListener('click', this.eventHandler)
                    this.clearTimer()
                },currentTime)
            },
            onClick () {
                if (this.$refs.trigger.contains(event.target)) {
                    if(!this.animate){
                        if (!this.visible) {
                            this.open()
                        }else{
                            this.close()
                        }
                    }
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    $border-color: #333;
    $border-radius: 4px;
    .popover {
        display: inline-block;
        vertical-align: top;
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
                border-top-color: black;
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
                border-bottom-color: black;
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
                border-left-color: black;
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
                border-right-color: black;
                border-left: none;
                right: 100%;
            }
            &::after {
                border-right-color: white;
                border-left: none;
                right: calc(100% - 1px);
            }
        }
    }
</style>
