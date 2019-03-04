<template>
    <div>

        <div style="margin-top: 20px">

            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-Input  :value="value" :error="errorMsg">

                        </x-Input>
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
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Input from '../../.././src/input'
    export default {
        name: "input-demo",
        data(){
            return {
                selectTab:[1],
                value:'error',
                errorMsg:'输入格式错误',
                content:`
             <x-Input :value="value"  :error="errorMsg"></x-Input>

                                                                js

          data(){
            return {
                errorMsg:'输入格式错误',
            }
        },



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
