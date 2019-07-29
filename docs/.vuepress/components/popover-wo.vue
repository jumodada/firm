<template>

    <div style="margin-top: 50px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-left: 100px;">
                        <x-popover position="left" trigger="hover">
                            <template slot="content" slot-scope="close">
                                <div>支持内部关闭</div>
                                <x-button @click="close.close">关闭</x-button>
                            </template>
                            <x-button>hover</x-button>
                        </x-popover>
                        <x-popover position="bottom">
                            <template slot="content"><div>popover内容</div></template>
                            <x-button>默认</x-button>
                        </x-popover>
                        <x-popover trigger="focus">
                            <template slot="content" slot-scope="close">
                                <x-button @click="close.close">关闭</x-button>
                            </template>
                            <x-button>focus</x-button>
                        </x-popover>
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <div style="color: #666666">通过设置 <code>trigger</code> 可以改变触发气泡框弹出的方式
                        <br>
                        默认click触发


                    </div>
                </template>
                <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                    <div   v-html="html"></div>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import popover from '../../../src/components/Exhibition/popover/popover'
    import collapse from '../../../src/components/Exhibition/collapse'
    import collapseItem from '../../../src/components/Exhibition/collapse-item'
    import Button from '../../../src/components/currency/button'
    import marked from 'marked'


    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                input1:'```html\n' +
                    '<x-popover position="left" trigger="hover">\n' +
                    '<template slot="content" slot-scope="close">\n' +
                    ' <div>支持内部关闭</div>\n' +
                    ' <x-button @click="close.close">关闭</x-button>\n' +
                    ' </template>\n' +
                    ' <x-button>hover</x-button>\n' +
                    '</x-popover>\n' +
                    '                        \n' +
                    '<x-popover position="bottom">\n' +
                    '  <template slot="content"><div>popover内容</div></template>\n' +
                    '  <x-button>默认</x-button>\n' +
                    '</x-popover>\n' +
                    '                                                \n' +
                    '<x-popover trigger="focus">\n' +
                    '  <a href="https://www.baidu.com">去百度</a>\n' +
                    '  </template> ' +
                    '<x-button>focus</x-button>\n' +
                    '</x-popover>\n' +
                    '```'
            }
        },
        methods:{

        },
        components:{
            'x-popover':popover,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button':Button
        },
        computed: {
            html() {
                return marked(this.input1)
            },
        },
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style scoped>

</style>
