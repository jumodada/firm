<template>
    <div>
        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-button disabled>
                            默认按钮
                        </x-button>
                        <x-button type="primary" disabled>
                            主要按钮
                        </x-button>
                        <x-button type="info"  disabled>
                            信息按钮
                        </x-button>
                        <x-button type="success" disabled>
                            成功按钮
                        </x-button>
                        <x-button type="warn" disabled>
                            警告按钮
                        </x-button>
                        <x-button type="error"  disabled>
                            错误按钮
                        </x-button>
                    </div>
                    <div style="margin-top: 40px">
                        <x-button  plain disabled>
                            朴素按钮
                        </x-button>
                        <x-button type="primary" plain disabled>
                            朴素按钮
                        </x-button>
                        <x-button type="info" plain disabled>
                            朴素按钮
                        </x-button>
                        <x-button type="success" plain disabled>
                            朴素按钮
                        </x-button>
                        <x-button type="warn" plain disabled>
                            朴素按钮
                        </x-button>
                        <x-button type="error" plain disabled>
                            朴素按钮
                        </x-button>
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
    import Button from '../../.././src/button'
    export default {
        name: "button-disabled",
        data(){
            return {
                selectTab:[1],
                content:`<div style="margin-top: 40px">
                              <x-button disabled>
                                     默认按钮
                              </x-button>
                              <x-button type="primary" disabled>
                                     主要按钮
                              </x-button>
                              <x-button type="info" disabled>
                                     信息按钮
                              </x-button>
                              <x-button type="success" disabled>
                                     成功按钮
                              </x-button>
                              <x-button type="warn" disabled>
                                     警告按钮
                              </x-button>
                              <x-button type="error"  disabled>
                                     错误按钮
                              </x-button>
                      </div>


                      <div style="margin-top: 40px">
                              <x-button  plain disabled>
                                     朴素按钮
                              </x-button>
                              <x-button type="primary" plain disabled>
                                     朴素按钮
                              </x-button>
                              <x-button type="info" plain disabled>
                                     朴素按钮
                              </x-button>
                              <x-button type="success" plain disabled>
                                     朴素按钮
                              </x-button>
                              <x-button type="warn" plain disabled>
                                     朴素按钮
                              </x-button>
                              <x-button type="error" plain disabled>
                                      朴素按钮
                              </x-button>
                      </div>

              `

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
