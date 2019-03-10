<template>

    <div class="cascader-item">

        <div class="now"
             :class="`size-${size}`"
             ref="now">
            <div class="now-item"
                 v-for="item in items"
                 @click="onClick(item)"
                 :style="{marginRight:repairPadding(item)}"
                 :class="{activeItem:activeItem(item)}"
            >
                {{item.name}}
                <x-icon  class="x-icon" name="right" v-if="item.children" color="#e6e6e6"></x-icon>
            </div>
        </div>
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave"
        >
            <div class="next" v-if="rightItems">
                <x-cascader-items :items="rightItems"
                                  :selected="selected"
                                  :size="size"
                                  :level="level+1"
                                  :dynamic="dynamic"
                                  @update:selected="onUpdateSelected"
                ></x-cascader-items>
            </div>
        </transition>
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        name: "xCascaderItems",
        props: {
            items: {
                type: Array
            },
            selected:{
                type:Array,
                default:()=>[]
            },
            level:{
                type:Number,
                default:0
            },
            dynamic:{
                type:Boolean,
                default: false
            },
            size:{
                type: String,
                default:'medium',
                validator(val){
                    return ['big','medium','small'].indexOf(val)>-1
                }
            },
        },
        computed: {
            rightItems () {
                if(this.selected &&this.selected[this.level] ){
                    let xxx = this.items.filter(item=>item.name===this.selected[this.level].name)
                    if(xxx[0] && xxx[0].children){
                        return xxx[0].children
                    }else{
                        return null
                    }
                }

            },
        },
        methods:{
            onClick(item){
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                selectedCopy[this.level] = item
                selectedCopy.splice(this.level+1)
                if(!item.children &&!this.dynamic){
                    selectedCopy.push('$#end')
                }
                this.$emit('update:selected',selectedCopy)
            },
            repairPadding(item){
                if(item.children){
                    return '0'
                }else{
                    return '1.5em'   //最后一个没有箭头，用margin补右边的间隙。还有伪类icon的方法，后面改用这个。
                }
            },
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
            },
            activeItem(item){
                if(this.selected[this.level] && item.name === this.selected[this.level].name){
                    return true
                }else{
                    return false
                }
            },
            beforeEnter(el) {
                    el.style.opacity=0
            },
            enter(el) {
                setTimeout(()=>{
                    el.style.opacity=1
                })
            },
            beforeLeave(el) {
                el.style.opacity=1
            },
            leave(el) {
                setTimeout(()=>{
                    el.style.opacity=0
                })
            },
            checkDisabled(){
                this.items.forEach((item,index)=>{
                    if(item.disabled){
                       this.$refs.now.children[index].classList.add('disabled')
                    }
                })

            }
        },
        mounted(){
            this.checkDisabled()
        },
        components:{
            'x-icon':Icon
        }
    }
</script>

<style scoped lang="scss">
    @import "var";


    .cascader-item{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .now {

            height: 200px;
            background-color: white;
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar{
              display: none;
            }
            &.size-big{
                height: 210px;
                padding:0.23em 0.45em;
                font-size: 16px;
            }
            &.size-small{
                 height: 185px;
                 padding:0.17em 0.37em;
                 font-size: 13px;
             }

            .now-item{
                padding:0.2em 0.4em;
                display: flex;
                min-width: 6em;
                align-items: center;
                margin-bottom: 5px;
                &.disabled{
                    pointer-events: none;
                    opacity: 0.3;
                }
                .x-icon{
                    margin-left:auto;
                }
                &:hover{
                    color:#409eff;
                }
            }
            &:hover{
                cursor: pointer;
            }
        }
        .next {
            transition: all .3s ease;
            border-left: 1px solid $border-color;
        }
        .activeItem{
            color:#409eff;
        }
    }
</style>
