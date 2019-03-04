<template>

    <div style="margin-top: 30px">


        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-row arrange="left">
                        <x-col  span="3" offset="3"  style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        <x-col span="3" offset="3" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        <x-col span="3"  offset="6"style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>

                    </x-row>
                    <div style="margin-top: 15px">
                        <x-row>
                            <x-col span="12" offset="3" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="12" offset="3" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        </x-row>
                    </div>
                    <div style="margin-top: 15px">
                        <x-row>
                            <x-col span="2"  offset="1"style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="4" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="6" offset="5" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        </x-row>
                    </div>
                    <div style="font-size: 17px;color: #999999;margin-top: 30px">
                        col组件可以通过设置 <code>offset</code>使col向左发生偏移，如果超出24格，会整体缩进。
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
    import Row from '../../.././src/row'
    import Col from '../../.././src/col'
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                content:`
    <x-row>
        <x-col offset="3" span="12"></x-col>
        <x-col offset="3" span="12"></x-col>
    </x-row>
    <x-row>
        <x-col offset="6" span="12"></x-col>
    </x-row>
    <x-row>
    <x-col  offset="5" span="12"></x-col>
    </x-row>
`
            }
        },

        components:{
            'x-row':Row,
            'x-col':Col,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
        }
    }
</script>

<style scoped>

</style>
