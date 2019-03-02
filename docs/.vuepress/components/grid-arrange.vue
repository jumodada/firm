<template>

    <div style="margin-top: 30px">
        <x-row arrange="left">
            <x-col span="12" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>

        </x-row>
        <div style="margin-top: 15px">
            <x-row arrange="center">
                <x-col span="12" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
            </x-row>
        </div>
        <div style="margin-top: 15px">
            <x-row arrange="right">
                <x-col span="12" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
            </x-row>
        </div>
        <div style="font-size: 17px;color: #999999;margin-top: 30px">
            row组件可以通过设置 <code>arrange</code> 在row组件未被撑满的情况下控制col的位置。
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
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                content:`
    <x-row arrange="left">
        <x-col span="12"></x-col>

    </x-row>
    <x-row arrange="center">
        <x-col span="12"></x-col>
    </x-row>
    <x-row arrange="right">
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
