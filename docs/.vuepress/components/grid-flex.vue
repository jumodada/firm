<template>

    <div style="margin-top: 30px">
        <x-row flex="-50">
            <x-col span="12"   style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
            <x-col span="12"   style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
        </x-row>
        <div style="margin-top: 15px">
            <x-row>
                <x-col span="12"   style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                <x-col span="12"   style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
            </x-row>
        </div>
        <div style="margin-top: 15px">
            <x-row flex="150">
                <x-col span="12"   style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                <x-col span="12"   style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
            </x-row>
        </div>
        <div style="font-size: 17px;color: #999999;margin-top: 30px">
            row组件可以通过设置 <code>flex</code>控制整体的缩进和伸长
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
        name: "grid-flex",
        data(){
            return {
                selectTab:[1],
                content:`
      <x-row flex="-50">
            <x-col span="12"></x-col>
            <x-col span="12"></x-col>
        </x-row>
        <div style="margin-top: 15px">
            <x-row>
                <x-col span="12"></x-col>
                <x-col span="12"></x-col>
            </x-row>
        </div>
        <div style="margin-top: 15px">
            <x-row flex="150">
                <x-col span="12" ></x-col>
                <x-col span="12" ></x-col>
            </x-row>
        </div>`
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
