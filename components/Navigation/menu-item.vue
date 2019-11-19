<template>
<div>
    <div class="x-menu-item"
         ref="item"
         :style="{color:textColor}"
         @mouseenter="addHoverColor"
         @mouseleave="removeHoverColor"
         :class="{active:selected,vertical,disabled}" @click="onClick">
        <f-icon   :color="!selected?textColor:activeColor" :name="iconName"  style=" margin-right: 6px;color: #515a6e;" v-if="iconName"></f-icon>
        <slot></slot>
    </div>
   <transition
           @before-enter="beforeEnter"
           @enter="enter"
           @before-leave="beforeLeave"
           @leave="leave"
         >
       <div ref="xian" class="xian"
            v-show="selected&&theFirstItem()&&!vertical"
       ></div>
   </transition>
</div>
</template>

<script>


    import Icon from '../currency/icon/src/icon'
    export default {
        name: "x-menu-item",
        inject:['root'],
        created(){
           this.root.addItem(this)
           this.initialColor()

        },
        beforeDestroy(){
          clearTimeout(this.timer)
        },

        props:{
            name:{
                type:String,
                required:true
            },
            iconName:{
                type: String
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        components:{
          'f-icon':Icon
        },
        data(){
            return {
                selected:false,
                vertical:false,
                textColor:null,
                activeColor:null,
                activeBackGroundColor:null,
            }
        },

        methods:{
            onClick(){
                if(this.disabled)return
                this.root.selectedArr=[]
                this.$emit('menuItemUpdate',this.name)
                let subFather = this.$parent.$el.classList.contains('x-sub-menu')
                let groupFather = this.$parent.$el.classList.contains('x-menu-item-group')
                this.root.selectedArr.unshift(this.name)
                if(subFather||groupFather){
                    this.root.selectedArr=[]
                    this.root.selectedArr.unshift(this.name)
                    this.tellParents(this)
                    this.$parent.childClosePopover()
                }else{
                    console.log(this.root.selectedArr)
                }

            },
            tellParents(that){
                if(this.disabled)return
                if(that.$parent.$parent.$options.name==='x-sub-menu' ||that.$parent.$parent.$options.name==='x-menu-item-group'){
                    this.root.selectedArr.unshift(that.$parent.name)
                    this.tellParents(that.$parent)
                }else{
                    this.root.selectedArr.unshift(that.$parent.name)
                    console.log(this.root.selectedArr)
                }
            },
            addHoverColor(){
                if(this.disabled)return
                if(this.activeColor){
                    this.$refs.item.style.color = this.activeColor
                }
                if(this.activeBackGroundColor){
                    this.$refs.item.style.backgroundColor = this.activeBackGroundColor
                }
            },
            removeHoverColor(){
                if(this.disabled)return
                if(this.activeColor&&!this.selected){
                    this.$refs.item.style.color = this.textColor
                }
                if(this.activeBackGroundColor&&!this.selected){
                    this.$refs.item.style.backgroundColor = null
                }
            },
            beforeEnter(el) {
                el.style.position= 'relative'
                el.style.left = '50%'
                el.style.width=0
            },
            enter(el) {
                setTimeout(()=>{
                    el.style.width= '100%'
                    el.style.left = '0'
                })
            },
            leave(el){
                el.style.position= 'relative'
                el.style.left = '50%'
                el.style.width=0
            },
            beforeLeave(el) {
                el.style.width= '100%'
                el.style.left = '0'
            },
            theFirstItem(){
                return this.$parent.$options.name === 'x-menu'
            },
            changeXianColor(color){
                if(this.disabled)return
                    this.$refs.xian.style.borderBottomColor = color
            },
            initialColor(){
                if(this.disabled)return
                this.$nextTick(()=>{
                    if(this.activeColor&&this.selected){
                        this.$refs.item.style.color = this.activeColor
                    }
                })
            }
        },
        watch:{
            selected(){
                if(this.selected&&this.activeColor){
                    this.$refs.item.style.backgroundColor = this.activeBackGroundColor
                    this.$refs.item.style.color = this.activeColor
                }else{
                    this.$refs.item.style.backgroundColor = null
                    this.$refs.item.style.color = this.textColor
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .disabled{
        opacity: .2;
        cursor: not-allowed !important;
    }
    .extend-enter-active, .extend-leave-active {
        transition: all .3s ease;
    }
    .extend-enter, .extend-leave-to {
        width:0;
    }
      .xian{
          transition: .3s all ease;
        width: 100%;
        border-bottom: 2px solid #409eff;
       }
            .x-menu-item{
                font-size: 15px;
                position: relative;
                padding: 15px 25px;
                transition: .3s all ease-in-out;
                text-overflow: ellipsis;
                &:hover{
                    cursor: pointer;
                }

                &.active{
                    color:#409eff;

                }
                &.vertical{
                    font-size: 16px;
                    padding: 15px 4em 15px 20px;
                    &.active{
                        color:#409eff;
                        background-color: #cae5f4;
                    }

                }
            }
</style>
