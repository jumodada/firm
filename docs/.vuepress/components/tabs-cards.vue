<template>
    <div>


        <div style="margin-top: 90px">
            <x-tabs :selected.sync="selected" cards>
                <x-tabs-item item="经济" name="1">
                    财经报道
                </x-tabs-item>
                <x-tabs-item item="体育" name="2" disabled>体育xxxxxxx</x-tabs-item>
                <x-tabs-item item="民生" name="3" disabled>民生xxxxxxx</x-tabs-item>
                <x-tabs-item item="游戏" name="4">
                    带带大师兄
                </x-tabs-item>
                <x-tabs-item item="科技" name="5" >
                    科技新闻
                </x-tabs-item>
                <x-tabs-item item="军事" name="6">
                    各国军事
                </x-tabs-item>
            </x-tabs>
        </div>

    </div>

</template>

<script>

    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
    import Button from '../../../src/currency/button'
    import Tabs from '../../../src/Exhibition/tabs'
    import TabsItem from '../../../src/Exhibition/tabs-item'


    export default {
        name: "button-demo-default",
        data(){
            return {
                selectTab:['1'],
                selected:'1',


            }
        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-tabs':Tabs,
            'x-tabs-item':TabsItem
        },
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style scoped>

</style>
