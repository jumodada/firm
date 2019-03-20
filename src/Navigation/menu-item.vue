<template>
<div>
    <div class="x-menu-item"
         ref="item"
         :style="{color:textColor}"
         @mouseenter="addHoverColor"
         @mouseleave="removeHoverColor"
         :class="{active:selected,vertical}" @click="onClick">
        <x-icon   :color="textColor" :name="iconName"  style=" margin-right: 6px;color: #515a6e;" v-if="iconName"></x-icon>
        <slot></slot>
    </div>
   <transition
           @before-enter="beforeEnter"
           @enter="enter"
           @before-leave="beforeLeave"
           @leave="leave"
         >
       <div ref="xian" class="xian" v-show="selected&&theFirstItem()&&!vertical"></div>
   </transition>
</div>
</template>

<script>
    import Icon from '../../src/currency/icon'
    export default {
        name: "x-menu-item",
        inject:['root'],
        created(){
          this.root.addItem(this)
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
            }
        },
        components:{
          'x-icon':Icon
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
                this.root.selectedArr=[]
                this.$emit('update:selected',this.name)
                let judge = this.$parent.$el.classList.contains('x-sub-menu')
                if(judge){
                    this.root.selectedArr=[]
                    this.root.selectedArr.unshift(this.name)
                    this.tellParents(this)
                    this.$parent.childClosePopover()
                }

            },
            tellParents(that){
                if(that.$parent.$parent.$options.name==='x-sub-menu'){
                    this.root.selectedArr.unshift(that.$parent.name)
                    this.tellParents(that.$parent)
                }else{
                    this.root.selectedArr.unshift(that.$parent.name)
                    console.log(this.root.selectedArr)
                }
            },
            addHoverColor(){
                if(this.activeColor){
                    this.$refs.item.style.color = this.activeColor
                }
                if(this.activeBackGroundColor){
                    this.$refs.item.style.backgroundColor = this.activeBackGroundColor
                }
            },
            removeHoverColor(){
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
                return this.$parent.$options.name === 'x-menu' ? true : false;
            },
            changeXianColor(color){
                    this.$refs.xian.style.borderBottomColor = color
            }
        },
        watch:{
            selected(){
                if(this.selected){
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
                overflow: hidden;
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
