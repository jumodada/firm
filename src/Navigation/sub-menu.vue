<template>
<div class="x-sub-menu">
    <span class="x-sub-menu-title"
          @mouseleave="closePopover"
          @mouseenter="openPopover"
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
            openPopover(){
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

                this.timer = setTimeout(()=>{
                    this.open = false
                    clearTimeout(this.timer)
                },450)
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
                if (el.scrollHeight !== 0) {
                    el.style.height = el.scrollHeight + 'px'
                }
            },
            afterEnter(el){
                el.style.overflow = ''
            },
            afterLeave(el){
                el.style.overflow = ''
            },
            beforeLeave(el) {
                el.style.height = el.scrollHeight + 'px'
                el.style.overflow = 'hidden'
            },
            leave(el) {
                el.style.height = 0
                el.style.paddingTop = 0
                el.style.paddingBottom = 0
                el.style.transition = '.1s all ease-in-out'
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
                border-radius: 3px;
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
                margin-left: 3px;
                top: 0;
                left: 100%;
            }
        }

</style>
