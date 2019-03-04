<template>
    <div class="cascader">
        <div>
            <slot></slot>
        </div>
        <div class="trigger" @click="popoverVisible=!popoverVisible">

        </div>
        <div class="popover" v-show="popoverVisible">
                <div v-for="sourceItem in source" class="level1">
                    {{sourceItem.name}}
                    <div v-for="item in sourceItem.children" class="level2">
                        {{item.name}}
                    </div>
                </div>

        </div>
        <!--<div class="popover">-->
            <!--<div v-for="item in source">-->
                <!--<cascaderItem :source-item="item"></cascaderItem>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import cascaderItem from './cascader-item'
    export default {
        name: "cascader",
        components:{
            cascaderItem
        },
        props:{
            source:{
                type:Array
            }
        },
        data(){
            return {
                popoverVisible:false
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
.cascader{
        .trigger{
            border:1px solid ;
            height: 32px;
            width: 100px;
        }
    .popover{
        border:1px solid red;
        height: 200px;
        width: 80px;
    }
    .level1{
        position: relative;
    }
    .level2{
        position: absolute;
        left: 100%;
        top: 0;
        width: 100%;
        height: 50px;

    }
}
</style>
