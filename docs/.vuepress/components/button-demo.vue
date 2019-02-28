<template>
<div>

            <x-button icon="set">
                默认按钮
            </x-button>
            <x-button type="primary">
                主要按钮
            </x-button>
            <x-button type="info">
                信息按钮
            </x-button>
            <x-button type="success">
                成功按钮
            </x-button>
            <x-button type="warn">
                警告按钮
            </x-button>
            <x-button type="error">
                错误按钮
            </x-button>

            <pre>
               <code>
                    {{content}}
               </code>
            </pre>
</div>

</template>

<script>
    import collapse from '../../.././src/content'
    import collapseItem from '../../.././src/collapse-item'
    import Button from '../../.././src/button'
    export default {
        name: "button-demo",
        data(){
          return {
              selectTab:'1',
              content:`<x-button icon="set">
                          默认按钮
                       </x-button>
                      <x-button type="primary">
                          主要按钮
                       </x-button>
                      <x-button type="info">
                          信息按钮
                      </x-button>
                      <x-button type="success">
                         成功按钮
                      </x-button>
                      <x-button type="warn">
                         警告按钮
                      </x-button>
                      <x-button type="error">
                        错误按钮
                      </x-button>
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
