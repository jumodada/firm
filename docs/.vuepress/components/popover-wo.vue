<template>

    <div style="margin-top: 50px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-left: 100px;">
                        <x-popover position="left" trigger="hover">
                            <template slot="content" slot-scope="close">
                                <div>支持内部关闭</div>
                                <x-button @click="close.close">
                                    关闭
                                </x-button>

                            </template>
                            <x-button>hover</x-button>
                        </x-popover>
                        <x-popover position="bottom">
                            <template slot="content">
                                <div>popover内容</div>
                            </template>
                            <x-button>默认</x-button>
                        </x-popover>
                        <x-popover trigger="focus">
                            <template slot="content">
                                <div class="xxx">
                                    <div class="xx">
                                        <x-button>focus</x-button>

                                    </div>
                                </div>
                                <div>
                                    <a href="https://www.baidu.com">去百度</a>
                                </div>
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
                <x-collapse-item name="1" title="代码">
           <pre>
               <code>
                    {{content}}
               </code>
            </pre>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import popover from '../../.././src/popover'
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Button from '../../.././src/button'

    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                content:`
              <x-popover position="left" trigger="hover">
                <template slot="content" slot-scope="close">
                    <div>支持内部关闭</div>
                    <x-button @click="close.close">
                        关闭
                    </x-button>

                </template>
                <x-button>hover</x-button>
            </x-popover>
            <x-popover position="bottom">
                <template slot="content">
                    <div>popover内容</div>
                </template>
                <x-button>默认</x-button>
            </x-popover>
            <x-popover trigger="focus">
                <template slot="content">
                    <div class="xxx">
                        <div class="xx">
                            <x-button>focus</x-button>

                        </div>
                    </div>
                    <div>
                        <a href="https://www.baidu.com">去百度</a>
                    </div>
                </template>
                <x-button>点我</x-button>
            </x-popover>



`
            }
        },
        methods:{

        },
        components:{
            'x-popover':popover,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button':Button
        }
    }
</script>

<style scoped>

</style>
