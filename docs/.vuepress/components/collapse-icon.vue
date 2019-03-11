<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab1" exhibition>
                <template slot="description">
                    <div>
                        <x-collapse :selected.sync="selectTab2" exhibition>
                            <template slot="description">
                                <div>
                                    故宫庆祝600岁生日：《清明上河图》将再次展出
                                </div>
                            </template>
                            <x-collapse-item name="1" title="阅读更多" title2="收回">
                                <div>明年，紫禁城将迎来600岁诞辰纪念。故宫博物院4日透露，将推出数十项优质展览，展现六百岁紫禁城的魅力。

                                    这些展览将在午门正殿及东西雁翅楼、文华殿、武英殿、东西六宫、神武门等处展出，其中，备受追捧的《韩熙载夜宴图》和《清明上河图》则将于2020年再次与观众见面。</div>
                            </x-collapse-item>
                        </x-collapse>
                        <br>
                        <div style="color: #999999">通过 <code>exhibition</code>会改变折叠面板的样式，上面也会额外增加一个插槽以便输入更多内容</div>
                        <br>
                        <div style="color: #999999;font-weight: bold"> <code>title</code> 是收缩后展示的标题，<code>title2</code>是伸展后展示的标题</div>
                        <br>
                        <div style="color: #999999">最好是只有一个<code>x-collapse-item</code>子组件, 目前还没有加入遍历检查的功能（懒癌晚期）</div>

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
        name: "grid-arrange",
        data(){
            return {
                selectTab1:[1],
                selectTab2:['1'],
                xxx:false,
                content:` <x-collapse :selected.sync="selectTab2" exhibition>
                            <template slot="description">
                                <div>
                                    故宫庆祝600岁生日：《清明上河图》将再次展出
                                </div>
                            </template>
                            <x-collapse-item name="1" title="阅读更多" title2="收回">
                                <div>明年，紫禁城将迎来600岁诞辰纪念。故宫博物院4日透露，将推出数十项优质展览，展现六百岁紫禁城的魅力。

                                    这些展览将在午门正殿及东西雁翅楼、文华殿、武英殿、东西六宫、神武门等处展出，其中，备受追捧的《韩熙载夜宴图》和《清明上河图》则将于2020年再次与观众见面。</div>
                            </x-collapse-item>
                        </x-collapse>

`
            }
        },
        methods:{
            showMsg1() {
                this.$toast('<a href="https://www.google.com/">去谷歌</a>',{
                    type:'success',
                    enableHTML:true
                })
            },
        },
        components:{
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button':Button
        }
    }
</script>

<style scoped>

</style>
