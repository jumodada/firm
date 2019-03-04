<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab1" exhibition>
                <template slot="description">
                   <div>
                       <x-collapse :selected.sync="selectTab2">
                           <x-collapse-item name="1" title="英雄">
                               <div>火猫</div>
                           </x-collapse-item>
                           <x-collapse-item name="2" title="装备">
                               <div>暗灭，电锤</div>
                           </x-collapse-item>
                           <x-collapse-item name="3" title="技能">
                               <div>余烬</div>
                           </x-collapse-item>
                           <x-collapse-item name="4" title="地图">
                               <div>xxxxx</div>
                           </x-collapse-item>
                           <x-collapse-item name="5" title="皮肤">
                               <div>null</div>
                           </x-collapse-item>
                       </x-collapse>
                       <br>
                       <div style="color: #999999">默认是可以多个弹出的,<code>selected</code> 绑定的会默认弹出</div>
                       <br>
                       <div style="color: #999999"> 使用 <code>single</code>可以固定只能单个出现</div>
                       <br>
                       <div style="color: #999999">内部可以嵌套，如你所看到的，<code>collapse</code> 内部也可以嵌套<code>collapse</code> </div>
                       <x-collapse :selected.sync="selectTab2" style="margin-top: 30px" single>
                           <x-collapse-item name="1" title="英雄">
                               <div>火猫</div>
                           </x-collapse-item>
                           <x-collapse-item name="2" title="装备">
                               <div>暗灭，电锤</div>
                           </x-collapse-item>
                           <x-collapse-item name="3" title="技能">
                               <div>余烬</div>
                           </x-collapse-item>
                           <x-collapse-item name="4" title="地图">
                               <div>xxxxx</div>
                           </x-collapse-item>
                           <x-collapse-item name="5" title="皮肤">
                               <div>null</div>
                           </x-collapse-item>
                       </x-collapse>
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
                content:`<x-collapse :selected.sync="selectTab2" style="margin-top: 30px" single>
                           <x-collapse-item name="1" title="英雄">
                               <div>火猫</div>
                           </x-collapse-item>
                           <x-collapse-item name="2" title="装备">
                               <div>暗灭，电锤</div>
                           </x-collapse-item>
                           <x-collapse-item name="3" title="技能">
                               <div>余烬</div>
                           </x-collapse-item>
                           <x-collapse-item name="4" title="地图">
                               <div>xxxxx</div>
                           </x-collapse-item>
                           <x-collapse-item name="5" title="皮肤">
                               <div>null</div>
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
