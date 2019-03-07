<template>

    <div class="cascader-item">

        <div class="now" ref="now">
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
                                  :level="level+1"
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
            loadData:{
                type:Function
            }
        },
        computed: {
            rightItems () {
                let currentSelected = this.selected[this.level]
                if (currentSelected && currentSelected.children) {
                    return currentSelected.children
                } else {
                    return null
                }
            },
        },
        methods:{
            onClick(item){
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                selectedCopy[this.level] = item
                selectedCopy.splice(this.level+1)
                if(!item.children){
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
            padding:0.2em 0.4em;
            height: 200px;
            background-color: white;
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar{
              display: none;
            }
            .now-item{
                display: flex;
                min-width: 6em;
                align-items: center;
                margin-bottom: 5px;
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
