<template>
    <div>
        <div class="cascader">
            <slot></slot>
        </div>
        <div class="popover">
            <div v-for="item in source">
                <cascaderItem :source-item="item"></cascaderItem>
            </div>
        </div>
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
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
.cascader{

}
</style>
