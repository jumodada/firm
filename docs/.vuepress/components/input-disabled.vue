<template>
    <div>
        <div style="margin-top: 40px">
            <x-Input  :value="value" disabled>

            </x-Input>
        </div>
        <br>
        <br>
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
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Input from '../../.././src/input'
    export default {
        name: "input-demo",
        data(){
            return {
                selectTab:[1],
                value:'不能使用input输入框',
                content:`
           <x-Input v-model="value" disabled></x-Input>
              `

            }
        },
        methods:{
            toggle(){
                this.loading = !this.loading
            }
        },
        components:{
            'x-Input':Input,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
        }
    }
</script>

<style>

</style>
