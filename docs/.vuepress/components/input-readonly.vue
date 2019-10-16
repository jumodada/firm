<template>
    <div>
        <div style="margin-top: 20px">

            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-Input  :value="value" readonly>
                        </x-Input>
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
    import Input from '../../../components/form data/input'
    import marked from 'marked'

    export default {
        name: "input-demo",
        data(){
            return {
                selectTab:[1],
                value:'只读模式',
                input1:'```html\n' +
                    '<x-Input  :value="value" readonly>\n' +
                    '</x-Input>\n' +
                    '```'

            }
        },
        methods:{
            toggle(){
                this.loading = !this.loading
            }
        },
        components:{
            'x-Input':Input,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
        },
        computed: {
            html() {
                return marked(this.input1)
            },
        },
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style>

</style>
