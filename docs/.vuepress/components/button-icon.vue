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
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-button>
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
                        <x-button type="error" >
                            错误按钮
                        </x-button>
                    </div>
                    <div style="margin-top:40px;">error除了本身的点击效果，还可以通过设置danger改变button按钮的hover效果</div>
                    <div style="margin-top: 20px">
                        <x-button  plain>
                            朴素按钮
                        </x-button>
                        <x-button type="primary" plain>
                            朴素按钮
                        </x-button>
                        <x-button type="info" plain>
                            朴素按钮
                        </x-button>
                        <x-button type="success" plain>
                            朴素按钮
                        </x-button>
                        <x-button type="warn" plain>
                            朴素按钮
                        </x-button>
                        <x-button type="error" plain danger>
                            朴素按钮
                        </x-button>
                    </div>
                    <div style="margin-top: 40px">
                        <x-button round>
                            默认按钮
                        </x-button>
                        <x-button type="primary" round>
                            圆角按钮
                        </x-button>
                        <x-button type="info" round>
                            圆角按钮
                        </x-button>
                        <x-button type="success" round>
                            圆角按钮
                        </x-button>
                        <x-button type="warn" round>
                            圆角按钮
                        </x-button>
                        <x-button type="error" round>
                            圆角按钮
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
