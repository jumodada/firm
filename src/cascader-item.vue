<template>
    <div class="cascader-item">
        <div class="now">
            <div class="now-item"
                 v-for="item in items"
                 @click="leftSelected = item"
                 :style="{marginRight:repairPadding(item)}"
            >
                {{item.name}}
                <x-icon  class="x-icon" name="right" v-if="item.children" color="#e6e6e6"></x-icon>
            </div>
        </div>
        <div class="next" v-if="rightItems">
            <x-cascader-items :items="rightItems"></x-cascader-items>
        </div>
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        name: "xCascaderItems",
        props: {
            items: {
                type: Array
            }
        },
        data () {
            return {
                leftSelected: null
            }
        },
        computed: {
            rightItems () {
                if (this.leftSelected && this.leftSelected.children) {
                    return this.leftSelected.children
                } else {
                    return null
                }
            }
        },
        methods:{
            repairPadding(item){
                if(item.children){
                    return '0'
                }else{
                    return '1.5em'   //最后一个没有箭头，用margin补右边的间隙。还有伪类icon的方法，后面改用这个。
                }
            }
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
            padding: .5em 0.5em .5em 1em;
            height: 200px;
            background-color: white;
            .now-item{
                display: flex;
                align-items: center;
                .x-icon{
                    margin-left:1.5em;
                }
            }
        }
        .next {
            border-left: 1px solid $border-color;
        }
    }
</style>
