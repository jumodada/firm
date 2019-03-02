<template>

    <div style="margin-top: 30px">
        <x-row gutter="10">
            <x-col span="12" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
            <x-col span="12" style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
        </x-row>
        <div style="margin-top: 15px">
            <x-row gutter="20">
                <x-col span="6" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                <x-col span="6" style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                <x-col span="6" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                <x-col span="6" style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
            </x-row>
        </div>
        <div style="margin-top: 15px">
            <x-row gutter="30">
                <x-col span="4" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                <x-col span="15" style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                <x-col span="5" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
            </x-row>
        </div>
        <div style="font-size: 17px;color: #999999;margin-top: 30px">
            row组件可以通过设置 <code>gutter</code>控制每个col之间的距离
        </div>

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab">
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
        name: "grid-gutter",
        data(){
            return {
                selectTab:[1],
                content:`
    <x-row gutter="10">
        <x-col span="12"></x-col>
        <x-col span="12"></x-col>
    </x-row>
    <x-row gutter="20">
        <x-col span="12"></x-col>
        <x-col span="12"></x-col>
        <x-col span="12"></x-col>
        <x-col span="12"></x-col>
    </x-row>
    <x-row gutter="30">
    <x-col span="12"></x-col>
    <x-col span="12"></x-col>
    <x-col span="12"></x-col>
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
