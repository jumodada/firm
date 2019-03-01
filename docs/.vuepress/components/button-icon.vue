<template>
    <div>

        <div style="margin-top: 40px">
            <x-button icon="set">
               设置按钮
           </x-button>
            <x-button icon="dianzan">
                点赞按钮
            </x-button>
            <x-button icon="download">
                下载按钮
            </x-button>
            <x-button icon="loading">
                加载按钮
            </x-button>
            <x-button icon="left">
                左
            </x-button>
            <x-button icon="right">
                右
            </x-button>

        </div>
        <br>
        <br>
        {{describe}}
        <div style="margin-top: 20px">
            <x-button icon="set" position="right">
                设置按钮
            </x-button>
            <x-button icon="dianzan" position="right">
                点赞按钮
            </x-button>
            <x-button icon="download" position="right">
                下载按钮
            </x-button>
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
    export default {
        name: "button-icon",
        data(){
            return {
                selectTab:[1],
                describe:'图标默认放在左边，也可以设置position放置图标在右边',
                content:`
           <div style="margin-top: 40px">
           <x-button icon="set">
               设置按钮
           </x-button>
            <x-button icon="dianzan">
                点赞按钮
            </x-button>
            <x-button icon="download">
                下载按钮
            </x-button>
            <x-button icon="loading">
                加载按钮
            </x-button>
            <x-button icon="left">
                左
            </x-button>
            <x-button icon="right">
                右
            </x-button>
                      </div>
                <div style="margin-top: 40px">
            <x-button icon="set" position="right">
                设置按钮
            </x-button>
            <x-button icon="dianzan" position="right">
                点赞按钮
            </x-button>
            <x-button icon="download" position="right">
                下载按钮
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
