<template>
    <div>
        <div style="margin-top: 40px">

            <x-Input v-model="value"></x-Input>
            {{value}}

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
                value:'输入框可以接受一个初始值，并v-model',
                content:`
           <x-Input v-model="value"></x-Input>
            {{value}}

                                                            js
                  data(){
            return {
                value:'输入框可以接受一个初始值，并v-model',
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
