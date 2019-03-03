<template>
    <div>

        <div style="margin-top: 40px">


            <div style="margin-bottom: 20px">
                <x-button-group>
                <x-button @click="bigOne">big</x-button>
                <x-button @click="mediumOne">medium</x-button>
                <x-button @click="smallOne">small</x-button>
                <x-button @click="miniOne">mini</x-button>
                </x-button-group>
            </div>

            <div>
                <x-button type="primary"  :size="buttonSize">
                    {{buttonSize}}
                </x-button>
            </div>
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
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Button from '../../.././src/button'
    import ButtonGroup from '../../.././src/button-group'
    export default {
        name: "button-disabled",
        data(){
            return {
                selectTab:[1],
                buttonSize:'big',
                content:` <x-button @click="bigOne">big</x-button>
                <x-button @click="mediumOne">medium</x-button>
                <x-button @click="smallOne">small</x-button>
                <x-button @click="miniOne">mini</x-button>

                                                            js




               data(){
            return {
                buttonSize:'big',
                }
            },
        methods:{
            bigOne(){
                this.buttonSize = 'big'
            }  ,
            mediumOne(){
                this.buttonSize = 'medium'
            },
            smallOne(){
                this.buttonSize = 'small'
            },
            miniOne(){
                this.buttonSize = 'mini'
            }
        },


              `

            }
        },
        methods:{
            bigOne(){
                this.buttonSize = 'big'
            }  ,
            mediumOne(){
                this.buttonSize = 'medium'
            },
            smallOne(){
                this.buttonSize = 'small'
            },
            miniOne(){
                this.buttonSize = 'mini'
            }
        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button-group':ButtonGroup
        }
    }
</script>

<style>

</style>
