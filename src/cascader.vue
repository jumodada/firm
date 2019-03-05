<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
        </div>
        <div class="popover-wrapper" v-if="popoverVisible">
            <x-cascader-items :items="source" class="popover"></x-cascader-items>
        </div>
    </div>
</template>

<script>
    import xCascaderItems from './cascader-item'
    export default {
        name: 'x-',
        components: {
            xCascaderItems
        },
        props: {
            source: {
                type: Array
            },
            size:{
                type: String
            }
        },
        data () {
            return {
                popoverVisible: false,

            }
        },
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader {
        position: relative;
        .trigger {
            border: 1px solid $border-color;
            height: 32px;
            width: 200px;
        }
        .popover-wrapper {
            position: absolute;
            top:100%;
            left: 0;
            display: flex;
            @extend .box-shadow;
            .popover{

            }
            .label {
                white-space: nowrap;
            }
        }
    }
</style>
