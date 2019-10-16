<template>

    <div style="margin-top: 30px">
        <div style="margin-top: 20px;">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-cascader :source.sync="source"
                                :selected.sync="selected"
                                :loadData="example"
                                dynamic
                                selectToChange>
                    </x-cascader>
                    <div style="margin-top: 40px;color: #999999">
                        使用 <code>selectToChange</code>，既点既显。这里发现有个问题就是再次点击选择栏，之前选的地区虽然是有选中的效果，但是并没有回到之前的高度位置，也就是要重新下拉到之前选中的地方。
                        后面会修复这个问题
                    </div>
                </template>
                <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                    <div  v-html="html"></div>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import collapse from '../../../components/Exhibition/collapse/collapse'
    import collapseItem from '../../../components/Exhibition/collapse/collapse-item'
    import Cascader from '../../../components/form data/cascader'
    import address from '../../../tests/fixtures/address.js'
    import marked from 'marked'
    function ajax(parent_id = 0){
        return new Promise(resolve=>{
            let res = address.filter(item=>item.parent_id===parent_id)
            resolve(res)
        })
    }
    export default {
        name: "grid-arrange",
        created(){
            ajax(0).then(res=>{
                this.source = res
            })
        },

        data(){
            return {
                selectTab:[1],
                selected:[1],
                input1:'```html\n' +
                    '<x-cascader :source.sync="source"\n' +
                    '   :selected.sync="selected"\n' +
                    '   :loadData="example"\n' +
                    '   dynamic\n' +
                    '   selectToChange>\n' +
                    '</x-cascader>\n' +
                    '```',
                source:[]
            }
        },
        methods:{
            example({id},updateSource){
                ajax(id).then(res=>{
                    updateSource(res)
                })
            }
        },
        components:{
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-cascader':Cascader
        },
        computed: {
            html() {
                return marked(this.input1)
            },
            js() {
                return marked(this.input2)
            },
        },
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style scoped>

</style>
