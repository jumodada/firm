<template>

    <div class="x-sub-menu" :class="{vertical}">
    <span class="x-sub-menu-title"
          @mouseleave="closePopover"
          @mouseenter="openPopover"
          @click="clickOpen"
          :style="{color:textColor}"
          :class="{active}"
          ref="title"
    >
        <x-icon  :color="!active?textColor:activeColor" :name="iconName" v-if="iconName" class="title-icon" ></x-icon>
        <slot name="title"></slot>
        <x-icon  v-if="notStandFirst" name="arrow" :color="isActive" style="width: .6em;margin-left:5px;"></x-icon>
        <x-icon  v-if="!notStandFirst" name="xia"  class="firstIcon" :class="{firstIconactive:iconActive}"
                 :color="isActive" style="width: .6em;margin-left:5px;"></x-icon>
    </span>
        <transition  @before-enter="beforeEnter"
                     @enter="enter"
                     @after-enter="afterEnter"
                     @before-leave="beforeLeave"
                     @leave="leave"
                     @after-leave="afterLeave"
        >
            <div class="x-popover" v-show="open"
                 :style="{backgroundColor:backGroundColor}"
                 @mouseenter="openPopover"
                 @mouseleave="closePopover"
            >
                <slot> </slot>
            </div>
        </transition>
        <transition
                @before-enter="beforeEnterXian"
                @enter="enterXian"
                @before-leave="beforeLeaveXian"
                @leave="leaveXian"
        >
            <div ref="xian" class="xian" v-show="active&&theFirstItem()&&!vertical"></div>
        </transition>
    </div>

</template>

<script>
    import Icon from '../currency/icon/src/icon'
    export default {
        name: "x-sub-menu",
        inject:['root'],
        data(){
            return {
                open:false,
                vertical:false,
                textColor:null,
                activeColor:null,
                activeBackGroundColor:null,
                backGroundColor: null
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
          },
            iconName:{
              type: String
            }
        },
        components:{
          'x-icon':Icon
        },
        methods:{
            tellChilcVertical(){
              this.$children.forEach(child=>{
                  child.vertical = true
                  if(child.$options.name==='x-sub-menu'||child.$options.name==='x-menu-item-group'){
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
                if(!this.vertical)return
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
                if(this.vertical){
                    el.style.transition = '.3s all'
                }
            },
            tellChildrenColor(bc){
                this.$children.forEach(child=>{
                    if(this.activeColor){
                        child.activeColor = this.activeColor
                    }
                    if(this.activeBackGroundColor){
                        child.activeBackGroundColor = this.activeBackGroundColor
                    }
                    child.textColor = this.textColor
                    if(child.$options.name==='x-sub-menu'){
                        child.tellChildrenColor(bc)
                         if(bc){
                             child.backGroundColor= bc
                         }
                    }
                    if(child.$options.name==='x-menu-item-group'){
                        child.tellChildrenColor(bc)
                        if(bc){
                            child.backGroundColor= bc
                        }
                    }
                })
            },
            leave(el) {
               setTimeout(()=>{
                   el.style.height = 0
                   el.style.paddingTop = 0
                   el.style.paddingBottom = 0
               })
            },
            changeXianColor(color){
                this.$refs.xian.style.borderBottomColor = color
            },
            theFirstItem(){
                return this.$parent.$options.name === 'x-menu' ? true : false;
            },
            beforeEnterXian(el) {
                el.style.position= 'relative'
                el.style.left = '50%'
                el.style.width=0
            },
            enterXian(el) {
                setTimeout(()=>{
                    el.style.width= '100%'
                    el.style.left = '0'
                })
            },
            leaveXian(el){
                el.style.position= 'relative'
                el.style.left = '50%'
                el.style.width=0
            },
            beforeLeaveXian(el) {
                el.style.width= '100%'
                el.style.left = '0'
            },
        },
        watch:{
            active(){
                if(this.active){
                    this.$refs.title.style.backgroundColor = this.activeBackGroundColor
                    this.$refs.title.style.color = this.activeColor
                }else{
                    this.$refs.title.style.backgroundColor = null
                    this.$refs.title.style.color = null
                }
            }
        }
    }
</script>

<style scoped lang="scss">
        .x-sub-menu{
            position: relative;
            font-size: 15px;
            .xian{
                transition: .3s all ease;
                width: 100%;
                border-bottom: 2px solid #409eff;
            }
            &-title{
                padding: 15px 25px;
                display: flex;
                color: #999999;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                vertical-align: center;
                .title-icon{
                    margin-right: 6px;
                    color: #515a6e;
                }
                &.active{
                    color:#409eff;

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

                }
            }
            .x-popover{
                position: absolute;
                top: 100%;
                left: 0;
                margin-top: 5px;
                color: #515a6e;
                border-radius:2px;
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
                width: 100%;
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

                    }
                }
                .x-popover{
                    position: static;
                    color: #515a6e;
                    margin-top: 0;
                    background-color: inherit;
                    border-radius: 0;
                    white-space: nowrap;
                    box-shadow: none;
                    transition: .3s all ease-in-out;
                    /deep/.x-menu-item{
                        font-size: 13px;
                        transition: .3s all ease-in-out;
                        &:hover{
                            color:#409eff;
                            background-color: #eefbfa;
                        }
                        &.active{
                            border-bottom: none;

                        }
                    }

                }
                .x-sub-menu{
                    position: relative;
                    .x-popover{
                        margin-top: 0;
                        position: static;
                        border-radius: 0;
                        transition: .3s all ease-in-out;
                        box-shadow: none;
                        margin-left:0;
                        /deep/.x-menu-item{
                            display: flex;
                            justify-content: center;
                            &.active{
                                border-bottom: none;

                            }
                        }
                    }
                }
            }
        }

</style>
