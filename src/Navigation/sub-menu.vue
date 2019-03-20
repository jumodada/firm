<template>
<div class="x-sub-menu" :class="{vertical}">
    <span class="x-sub-menu-title"
          @mouseleave="closePopover"
          @mouseenter="openPopover"
          @click="clickOpen"
          :class="{active}"
    >
        <slot name="title"></slot>
        <x-icon  v-if="notStandFirst" name="arrow" :color="isActive" style="width: .6em;margin-left:5px;"></x-icon>
        <x-icon  v-if="!notStandFirst" name="xia"  class="firstIcon" :class="{firstIconactive:iconActive}"  :color="isActive" style="width: .6em;margin-left:5px;"></x-icon>
    </span>
    <transition  @before-enter="beforeEnter"
                 @enter="enter"
                 @after-enter="afterEnter"
                 @before-leave="beforeLeave"
                 @leave="leave"
                 @after-leave="afterLeave"
    >
        <div class="x-popover" v-show="open"
             @mouseenter="openPopover"
             @mouseleave="closePopover"
        >
            <slot> </slot>
        </div>
    </transition>
</div>
</template>

<script>
    import Icon from '../currency/icon'
    export default {
        name: "x-sub-menu",
        inject:['root'],
        data(){
            return {
                open:false,
                vertical:false
            }
        },
        computed:{
          active(){
             return this.root.selectedArr.indexOf(this.name)>-1
          },
            notStandFirst(){
              return this.$parent.$options.name!=='x-menu'
            },
            isActive(){
                if(this.active){
                    return '#f89708'
                }else{
                    return '#bfbfbf'
                }
            },
            iconActive(){
                return this.open ? true : false;
            }
        },
        props:{
          name:{
              type:String,
              required:true
          }
        },
        components:{
          'x-icon':Icon
        },
        methods:{
            tellChilcVertical(){
              this.$children.forEach(child=>{
                  child.vertical = true
                  if(child.$options.name==='x-sub-menu'){
                      child.tellChilcVertical()
                  }
              })
            },
            openPopover(){
                if(this.vertical)return
                clearTimeout(this.timer)
                this.open = true
                this.onlyOneOpen()

            },
            onlyOneOpen(){
                this.$parent.$children.forEach(child=>{
                    if(child.open&&child.name!==this.name){
                        child.open= false
                    }
                })
            },
            closePopover(){
                if(this.vertical)return
                this.timer = setTimeout(()=>{
                    this.open = false
                    clearTimeout(this.timer)
                },450)
            },
            clickOpen(){
                this.open = !this.open
            },
            childClosePopover(){
                    this.open = false
                if(this.$parent.$options.name==='x-sub-menu'){
                    this.$parent.childClosePopover()
                }
            },
            beforeEnter(el) {
                el.style.height = 0
                el.style.paddingTop = 0
                el.style.paddingBottom = 0
                el.style.overflow = 'hidden'
                el.style.transition = '.3s all ease-in-out'
            },
            enter(el) {
                    el.style.height = el.scrollHeight + 'px'

            },
            afterEnter(el){
                el.style.overflow = ''
                if(this.vertical){
                    el.style.height=''  //妈的排查半小时
                }
            },
            afterLeave(el){
                el.style.overflow = ''
                if(this.vertical){
                    el.style.height=''
                }
            },
            beforeLeave(el) {
                el.style.height = el.scrollHeight + 'px'
                el.style.overflow = 'hidden'
                el.style.transition = '.1s all ease-in-out'
            },
            leave(el) {
                el.style.height = 0
                el.style.paddingTop = 0
                el.style.paddingBottom = 0
                if(this.vertical){
                    el.style.transition = '.3s all '
                }
            },
        }
    }
</script>

<style scoped lang="scss">
        .x-sub-menu{
            position: relative;
            &-title{
                padding: 10px 20px;
                display: flex;
                color: #999999;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &.active{
                    color:#409eff;
                    &:after{
                        left: 0;
                        width: 100%;
                    }
                }
                &:after{
                    content: "";
                    width: 0;
                    height: 1px;
                    border-bottom:2px solid #409eff;
                    position: absolute;
                    bottom: 1%;
                    left: 50%;
                    transition: all .3s ease-in-out;
                }
                .firstIcon{
                    transition: .3s all ease;
                    transform: rotate(0);
                }
                .firstIconactive{
                    transform: rotate(180deg);
                }
            }
            .x-sub-menu .x-sub-menu{
                &-title{
                    &.active{
                        color:#409eff;
                        background-color: #eefbfa;
                    }
                    &:after{
                        content: "";
                        border-bottom: none;
                        position: absolute;
                        bottom: 1%;
                        left: 0;
                        transition: all .3s ease-in-out;
                    }
                }
            }
            .x-popover{
                margin-top: 2px;
                position: absolute;
                top: 100%;
                left: 0;
                color: #515a6e;
                border-radius:4px;
                white-space: nowrap;
                background-color: white;
                box-shadow:1px 1px 2px fade_out(black, 0.7);
                transition: .3s all ease-in-out;
                /deep/.x-menu-item{
                    font-size: 14px;
                    transition: .3s all ease-in-out;
                    &:hover{
                        color:#409eff;
                        background-color: #eefbfa;
                    }
                    &.active{
                        border-bottom: none;
                        &:after{
                            display: none;
                        }
                    }
                }

            }
            .x-sub-menu .x-popover{
                position: absolute;
                margin-left: 3px;
                top: 0;
                left: 100%;
            }
            &.vertical{
                display: inline-flex;
                flex-direction: column;
               .x-sub-menu-title{
                   padding: 15px 4em 15px 20px;
                    display: inline-flex;
                    color: #999999;
                   justify-content: flex-start;
                    cursor: pointer;
                    &.active{
                        color:#409eff;
                        background-color: #eefbfa;
                        &:after{
                            display: none;
                        }
                    }
                }
                .x-popover{
                    position: static;
                    margin-top: 2px;
                    color: #515a6e;
                    background-color: inherit;
                    border-radius: 0;
                    white-space: nowrap;
                    box-shadow: none;
                    transition: .3s all ease-in-out;
                    /deep/.x-menu-item{
                        font-size: 13px;
                        margin-left: 1.0em;
                        transition: .3s all ease-in-out;
                        &:hover{
                            color:#409eff;
                            background-color: #eefbfa;
                        }
                        &.active{
                            border-bottom: none;
                            &:after{
                                display: none;
                            }
                        }
                    }

                }
                .x-sub-menu{
                    position: relative;
                    .x-popover{
                        position: static;
                        border-radius: 0;
                        transition: .3s all ease-in-out;
                        box-shadow: none;
                        margin-left:0;
                        /deep/.x-menu-item{
                            margin-left: 1.6em;
                            &.active{
                                border-bottom: none;
                                &:after{
                                    display: none;
                                }
                            }
                        }
                    }
                }
            }
        }

</style>
