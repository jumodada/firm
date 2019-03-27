<template>
    <div>

        <x-Button-group>
            <x-button @click="Top">Top</x-button>
            <x-button @click="Bottom">Bottom</x-button>
            <x-button @click="Left">Left</x-button>
            <x-button @click="Right">Right</x-button>
        </x-Button-group>

        <div style="margin-top: 90px">

            <x-tabs :selected.sync="selected" :position="position">
                <x-tabs-item item="经济xxxx" name="1">
                    财经报道xxxxxx
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
    import ButtonGroup from '../../../src/currency/button-group'
    import Tabs from '../../../src/Exhibition/tabs'
    import TabsItem from '../../../src/Exhibition/tabs-item'


    export default {
        name: "button-demo-default",
        data(){
            return {
                selectTab:['1'],
                selected:'1',
                position:'bottom'
            }
        },
        methods:{
            Top(){
                this.position='top'
            },
            Bottom(){
                this.position='bottom'
            },
            Left(){
                this.position='left'
            },
            Right(){
                this.position='right'
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
    }
</script>

<style scoped>

</style>
