<template>
    <div>

        <div style="margin-top: 40px">

            <x-button icon="loading" loading color="red">
                红色
            </x-button>
            <x-button icon="set" loading color="green">
                力量
            </x-button>
            <x-button icon="loading" loading color="blue">
                蓝色
            </x-button>

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
    import Button from '../../.././src/button'
    export default {
        name: "button-icon-color",
        data(){
            return {
                selectTab:[1],
                loading:false,
                content:`
            <x-button icon="loading" loading color="red">
                红色
            </x-button>
            <x-button icon="set" loading color="green">
                力量
            </x-button>
            <x-button icon="loading" loading color="blue">
                蓝色
            </x-button>

              `

            }
        },
        methods:{
            toggle(){
                this.loading = !this.loading
            }
        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
        }
    }
</script>

<style>

</style>
