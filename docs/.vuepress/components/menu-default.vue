<template>
    <div style="margin-top: 50px">


        <x-collapse :selected.sync="selectTab1" exhibition>
            <template slot="description">
                <div style="color: #999999">
                    <x-menu :selected.sync="selected"
                    >
                        <x-sub-menu name="extension">
                            <template slot="title">扩展</template>
                            <x-menu-item name="mac">for Mac</x-menu-item>
                            <x-menu-item name="windows">for Windows</x-menu-item>
                        </x-sub-menu>
                        <x-sub-menu name="learn">
                            <template slot="title">如何使用</template>
                            <x-menu-item name="fast">快速入门</x-menu-item>
                            <x-menu-item name="advanced">进阶配置</x-menu-item>
                            <x-menu-item name="language">多语言支持</x-menu-item>
                            <x-sub-menu name="package">
                                <template slot="title">打包管理</template>
                                <x-sub-menu name="webpack">
                                    <template slot="title">webpack</template>
                                    <x-menu-item name="rookie">webpack快速上手</x-menu-item>
                                    <x-menu-item name="master">webpack从入门到入土</x-menu-item>
                                    <x-menu-item name="fuck">配你🐴呢</x-menu-item>
                                </x-sub-menu>
                                <x-menu-item name="parcel">使用parcel</x-menu-item>
                            </x-sub-menu>
                        </x-sub-menu>
                        <x-menu-item name="connect">联系我们</x-menu-item>
                        <x-menu-item name="support">其他支持</x-menu-item>
                    </x-menu>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <code>name</code>就是每个组件的索引，必须设置。
                    <br>
                    通过<code>:selected.sync="你要头一个选中的item"</code>进行"双向绑定"。
                    <br>
                    弹出框是默认 <code>hover</code>触发
                </div>

            </template>
            <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                <div v-html="html"></div>
            </x-collapse-item>
        </x-collapse>
    </div>
</template>

<script>
    import Menu from '../../../src/components/Navigation/menu'
    import MenuItem from '../../../src/components/Navigation/menu-item'
    import subMenu from '../../../src/components/Navigation/sub-menu'
    import collapse from '../../../src/components/Exhibition/collapse'
    import collapseItem from '../../../src/components/Exhibition/collapse-item'
    import marked from 'marked'

    export default {
        name: "menu-default",
        data(){
            return {
                selected:['support'],
                selectTab1:[1],
                input1:'```html\n' +
                    '<x-menu :selected.sync="selected" single>\n' +
                    '   <x-sub-menu name="extension">\n' +
                    '     <template slot="title">扩展</template>\n' +
                    '     <x-menu-item name="mac">for Mac</x-menu-item>\n' +
                    '     <x-menu-item name="windows">for Windows</x-menu-item>\n' +
                    '   </x-sub-menu>\n' +
                    '   <x-sub-menu name="learn">\n' +
                    '       <template slot="title">如何使用</template>\n' +
                    '       <x-menu-item name="fast">快速入门</x-menu-item>\n' +
                    '       <x-menu-item name="advanced">进阶配置</x-menu-item>\n' +
                    '       <x-menu-item name="language">多语言支持</x-menu-item>\n' +
                    '   <x-sub-menu name="package">\n' +
                    '       <template slot="title">打包管理</template>\n' +
                    '       <x-sub-menu name="webpack">\n' +
                    '          <template slot="title">webpack</template>\n' +
                    '             <x-menu-item name="rookie">webpack快速上手</x-menu-item>\n' +
                    '             <x-menu-item name="master">webpack从入门到入土</x-menu-item>\n' +
                    '             <x-menu-item name="fuck">配你🐴呢</x-menu-item>\n' +
                    '       </x-sub-menu>\n' +
                    '       <x-menu-item name="parcel">使用parcel</x-menu-item>\n' +
                    '       </x-sub-menu>\n' +
                    '   </x-sub-menu>\n' +
                    '   <x-menu-item name="connect">联系我们</x-menu-item>\n' +
                    '   <x-menu-item name="support">其他支持</x-menu-item>\n' +
                    '</x-menu>\n' +
                    '```'
            }
        },
        components:{
            'x-menu':Menu,
            'x-menu-item':MenuItem,
            'x-sub-menu':subMenu,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
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

<style scoped>

</style>
