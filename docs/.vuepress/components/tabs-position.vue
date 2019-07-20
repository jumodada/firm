<template>
    <div>

        <div style="color: #999999;margin-top: 30px">
            不支持卡片样式标签的位置选择
        </div>
            <div style="margin-top: 50px">
                <x-Button-group>
                   <x-button v-for="(item,index) in group" :class="{active:index===buttonIndex}"
                             @click="toggle(item,index)">
                       {{item}}
                   </x-button>
                </x-Button-group>
            </div>

        <div style="margin-top: 50px">

            <x-tabs :selected.sync="selected" :position="position">
                <x-tabs-item item="经济xxxx" name="1">
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

    import collapse from '../../../src/components/Exhibition/collapse'
    import collapseItem from '../../../src/components/Exhibition/collapse-item'
    import Button from '../../../src/components/currency/button'
    import ButtonGroup from '../../../src/components/currency/button-group'
    import Tabs from '../../../src/components/Exhibition/tabs'
    import TabsItem from '../../../src/components/Exhibition/tabs-item'


    export default {
        name: "button-demo-default",
        data(){
            return {
                selectTab:['1'],
                selected:'1',
                position:'bottom',
                group:['top','bottom','left','right'],
                buttonIndex:1
            }
        },
        methods:{
         toggle(item,index){
             this.buttonIndex = index
             this.position = item
         }

        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-tabs':Tabs,
            'x-tabs-item':TabsItem,
            'x-Button-group':ButtonGroup
        },
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style scoped lang="scss">
        .active{
            transition: .4s all ease-in-out;
                background-color: #ffcc66;
        }
</style>
