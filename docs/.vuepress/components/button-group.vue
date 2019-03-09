<template>
    <div>

        <div style="margin-top: 20px;">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">

                    <div style="margin-top: 40px;display: flex;justify-content: center">

                        <x-button-group>
                            <x-button icon="left">
                            左
                             </x-button>
                            <x-button icon="set">
                                设置
                            </x-button>
                            <x-button icon="right">
                                右
                            </x-button>
                        </x-button-group>

                    </div>

                    <div style="margin-top: 40px;display: flex;justify-content: center">

                        <x-button-group>
                            <x-button icon="error">
                                确定
                            </x-button>
                            <x-button icon="success">
                                取消
                            </x-button>
                        </x-button-group>

                    </div>
                    <br>
                    <br>
                    <div style="color: #999999"> <code>button-group</code>的子元素应该全是 <code>x-button</code>,后续添加button-group的更多功能</div>
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
    import Button from '../../.././src/button'
    import ButtonGroup from '../../.././src/button-group'
    export default {
        name: "button-group",
        data(){
            return {
                selectTab:[1],
                content:`
                      <x-button-group>
                            <x-button icon="left">
                            左
                             </x-button>
                            <x-button icon="set">
                                设置
                            </x-button>
                            <x-button icon="right">
                                右
                            </x-button>
                        </x-button-group>

                        <x-button-group>
                            <x-button icon="error">
                                确定
                            </x-button>
                            <x-button icon="success">
                                取消
                            </x-button>
                        </x-button-group>

              `

            }
        },
        components:{
            'x-button':Button,
            'x-button-group':ButtonGroup,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
        }
    }
</script>

<style>

</style>
