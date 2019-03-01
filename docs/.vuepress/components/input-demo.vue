<template>
    <div>
        <div style="margin-top: 40px">

            <x-Input></x-Input>

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
                loading:false,
                content:`
           <x-button icon="loading" :loading="loading" @click="toggle">
                加载按钮
            </x-button>

                                                            js
                 data(){
                    return {
                         loading:false,
                            }
                       }
                        methods:{
                 toggle(){
                    this.loading = !this.loading
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
