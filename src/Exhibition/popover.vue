<template>
    <div class="popover"
         ref="popover"
    >
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
        >
             <div ref="contentWrapper" class="content-wrapper"
                     :class="[[`position-${position}`],themeStyle]"
                         @mouseenter="hoverInOPen"
                         @mouseleave="hoverOutAndClose"
                     v-show="visible">
                    <div class="contentSlot" ref="contentSlot">
                        <slot name="content" :close="outerClick"></slot>
                    </div>
             </div>
        </transition>
        <span  ref="trigger"
               style="display: inline-block">
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
                outClick:false
            }
        },
        mounted(){
            this.addEventListener()
        },
        beforeDestroy(){
           this.removeAll()
        },
            props:{
                    position:{
                        type:String,
                        default:'top',
                        validator(val){
                            return ['top','topLeft','topRight','bottomLeft','bottom','bottomRight','leftTop','left','leftBottom','rightTop','right','rightBottom'].indexOf(val)>-1
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
                },
            },
        computed:{
            themeStyle(){
              if(this.theme==='whiteBg'){
                  return 'theme2'
              }
            }
        },
        methods: {
            removeAll(){
                let {popover,contentWrapper} = this.$refs
                this.event[this.trigger].event.forEach(eventName=>{
                    popover.removeEventListener(eventName,this.event[this.trigger].fun)
                })
                this.$el.remove()
                contentWrapper.remove()
                clearTimeout(this.timer)
            },
            contentPosition(){
                const {contentWrapper,trigger} = this.$refs
                document.body.appendChild(contentWrapper)
                let {top,left,height,width} = trigger.getBoundingClientRect()
                let contentWidth = contentWrapper.clientWidth
                let contentHeight = contentWrapper.clientHeight
                let widthDiffer = - (Number(contentWidth)-width)
                let heightDiffer = -(Number(contentHeight)-height)
                let x = {
                    topLeft:{
                        top:top + window.scrollY,
                        left:left + window.scrollX,
                        transition:`translate(0,-100%)`
                    },
                    top:{
                        top:top + window.scrollY,
                        left:left + window.scrollX,
                        transition:`translate(${widthDiffer/2}px,-100%)`
                    },
                    topRight:{
                        top:top + window.scrollY,
                        left:left + window.scrollX,
                        transition:`translate(calc(-100% + ${width}px),-100%)`
                    },
                    leftTop:{
                        top:top  + window.scrollY,
                        left:left  + window.scrollX,
                        transition:`translate(-100%,0)`
                    },
                    left:{
                        top:top  + window.scrollY,
                        left:left  + window.scrollX,
                        transition:`translate(-100%,${heightDiffer/2}px)`
                    },
                    leftBottom:{
                        top:top  + window.scrollY,
                        left:left  + window.scrollX,
                        transition:`translate(-100%,-50%)`
                    },
                    bottomLeft:{
                        top:top + height + window.scrollY,
                        left:left + window.scrollX,
                        transition:`translate(0,0)`
                    },
                    bottom:{
                        top:top + height + window.scrollY,
                        left:left + window.scrollX,
                        transition:`translate(${widthDiffer/2}px,0)`
                    },
                    bottomRight:{
                        top:top + height + window.scrollY,
                        left:left + window.scrollX,
                        transition:`translate(calc(-100% + ${width}px),0)`
                    },
                    rightTop:{
                        top:top  + window.scrollY ,
                        left:left +width  + window.scrollX,
                        transition:`translate(0,0)`
                    },
                    right:{
                        top:top  + window.scrollY ,
                        left:left +width  + window.scrollX,
                        transition:`translate(0,${heightDiffer/2}px)`
                    },
                    rightBottom:{
                        top:top  + window.scrollY ,
                        left:left +width  + window.scrollX,
                        transition:`translate(0,-50%)`
                    }

                }
                contentWrapper.style.left = x[this.position].left + 'px'
                contentWrapper.style.top = x[this.position].top + 'px'
                contentWrapper.style.transform = x[this.position].transition
            },
            addEventListener(){
                let {popover} = this.$refs
                this.event = {
                    click:{
                        event:['click'],
                        fun:this.onClick
                    },
                    hover:{
                        event:['mouseenter','mouseleave'],
                        fun:this.hoverToggle
                    },
                    focus:{
                        event:['click'],
                        fun:this.focusToggle
                    }
                }
                this.event[this.trigger].event.forEach(eventName=>{
                    popover.addEventListener(eventName,this.event[this.trigger].fun)
                })
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
                    }else{
                        return false
                    }
                })
            },
            isPopover(e){    //判断点击的地方是否在contentPopover里面
                return   e.path.some(child=>{
                    if(child===this.$refs.popover){
                        return true
                    }else{
                        return false
                    }
                })
            },
            hoverOutAndClose(){
                clearTimeout(this.timer)
                if(this.trigger!=='hover')return
                this.timer = setTimeout(()=>{
                    this.visible = false
                },120)
            },
            hoverInOPen(){
                clearTimeout(this.timer)
                if(this.outClick||this.trigger!=='hover')return
                this.visible = true
            },
            outerClick(){
                this.outClick = true
                this.visible = false
            },
            clickCloseAll(){
                this.visible = false
                this.removeListener()
            },
            eventHandler(e){
                if(this.isPopover(e) || this.isconWrapepr(e))return
                if(!this.isconWrapepr(e) && this.$refs.popover &&!(this.$refs.popover===e.target || this.$refs.popover.contains(e.target))) {
                   this.clickCloseAll()
                }
            },
            clickToggle(){
                this.visible = !this.visible
                if(this.visible){
                    this.$nextTick(()=>{
                        this.contentPosition()
                        this.listenerDocument()
                    })
                }else{
                     this.removeListener()
                }
            },
            hoverToggle(e){
                clearTimeout(this.timer)
                this.outClick = false
                if(e.type==='mouseenter'){
                    this.visible = true
                    this.$nextTick(()=>{
                        this.contentPosition()
                    })
                }else{
                    this.timer = setTimeout(()=>{
                        this.visible = false
                    },120)
                }
            },
            focusToggle(){
                let judge = this.$refs.trigger.children[0]===document.activeElement
                if(judge){
                    this.visible = true
                    this.$nextTick(()=>{
                        this.contentPosition()
                        this.listenerDocument()
                    })
                }else{
                    this.removeListener()
                }
            },
            onClick () {
                if(this.trigger!=='click')return
                if (this.$refs.trigger.contains(event.target)) {
                  this.clickToggle()
                }
            },

            beforeEnter(el) {
                this.$refs.contentSlot.style.overflow=''
                el.style.opacity = 0
            },
            enter(el) {
              setTimeout(()=>{
                  el.style.opacity = 1
              },30)
            },
            leave(el){
                el.style.opacity = 0
            },
            beforeLeave(el) {
                el.style.opacity = 1
                this.$refs.contentSlot.style.overflow='hidden'
            },
            afterLeave(){
                this.outClick = false
                if(this.$refs.contentSlot){
                    this.$refs.contentSlot.style.overflow=''
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
        transition: .3s all ease-in-out;
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
        transition: .3s all ease-in-out;
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
        &.position-topLeft{
            transform: translateY(-100%);
            margin-top: -10px;
            &::before, &::after {
                left: 5px;
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
        &.position-top{
            transform: translateY(-100%);
            margin-top: -10px;
            &::before, &::after {
                left: 50%;
                transform: translateX(-54%);
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
        &.position-topRight{
            transform: translateY(-100%);
            margin-top: -10px;
            &::before, &::after {
                left: 100%;
                transform: translateX(-120%);
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
        &.position-leftTop{
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                transform: translateY(0%);
                top: 2px;
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
        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                transform: translateY(-53%);
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
        &.position-leftBottom {
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                transform: translateY(-100%);
                top: 99%;
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
        &.position-bottomLeft {
            margin-top: 10px;
            &::before, &::after {
                left: 6px;
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
        &.position-bottom {
            margin-top: 10px;
            &::before, &::after {
                left: 50%;
                transform: translateX(-50%);
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
        &.position-bottomRight {
            margin-top: 10px;
            &::before, &::after {
                left: 100%;
                transform: translateX(-103%);
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
        &.position-rightTop {
            margin-left: 10px;
            &::before, &::after {
                transform: translateY(10%);
                top: 0;
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
        &.position-rightBottom {
            margin-left: 10px;
            &::before, &::after {
                transform: translateY(-103%);
                top: 100%;
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
