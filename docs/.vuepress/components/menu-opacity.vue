<template>
    <div style="margin-top: 50px">


        <x-collapse :selected.sync="selectTab1" exhibition>
            <template slot="description">
                <div style="color: #999999">
                    <x-menu :selected.sync="selected"
                            opacity
                            text-color="#fff"
                            active-color="#ffd04b"
                            active-back-ground-color="#515151"
                            back-ground-color="#545c64"
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
                    使用 <code>opacity</code>，不处于hover状态有一个半透明效果
                </div>

            </template>
            <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                <div v-html="html"></div>
            </x-collapse-item>
        </x-collapse>
    </div>
</template>

<script>
    import Menu from '../../../components/Navigation/menu'
    import MenuItem from '../../../components/Navigation/menu-item'
    import subMenu from '../../../components/Navigation/sub-menu'
    import collapse from '../../../components/Exhibition/collapse/collapse'
    import collapseItem from '../../../components/Exhibition/collapse/collapse-item'
    import marked from 'marked'

    export default {
        name: "menu-default",
        data(){
            return {
                selected:['support'],
                selectTab1:[1],
                input1:'```html\n' +
                    '<x-menu :selected.sync="selected"\n' +
                    '               opacity\n' +
                    '               text-color="#fff"\n' +
                    '                 active-color="#ffd04b"\n' +
                    '              active-back-ground-color="#515151"\n' +
                    '                  back-ground-color="#545c64"\n' +
                    '                    >\n' +
                    '          <x-sub-menu name="extension">\n' +
                    '                   <template slot="title">扩展</template>\n' +
                    '                     <x-menu-item name="mac">for Mac</x-menu-item>\n' +
                    '                   <x-menu-item name="windows">for Windows</x-menu-item>\n' +
                    '                </x-sub-menu>\n' +
                    '              <x-sub-menu name="learn">\n' +
                    '                   <template slot="title">如何使用</template>\n' +
                    '                       <x-menu-item name="fast">快速入门</x-menu-item>\n' +
                    '                    <x-menu-item name="advanced">进阶配置</x-menu-item>\n' +
                    '                      <x-menu-item name="language">多语言支持</x-menu-item>\n' +
                    '                <x-sub-menu name="package">\n' +
                    '            <template slot="title">打包管理</template>\n' +
                    '                 <x-sub-menu name="webpack">\n' +
                    '                  <template slot="title">webpack</template>\n' +
                    '                   <x-menu-item name="rookie">webpack快速上手</x-menu-item>\n' +
                    '                 <x-menu-item name="master">webpack从入门到入土</x-menu-item>\n' +
                    '                    <x-menu-item name="fuck">配你🐴呢</x-menu-item>\n' +
                    '                    </x-sub-menu>\n' +
                    '                <x-menu-item name="parcel">使用parcel</x-menu-item>\n' +
                    '              </x-sub-menu>\n' +
                    '              </x-sub-menu>\n' +
                    '                <x-menu-item name="connect">联系我们</x-menu-item>\n' +
                    '                    <x-menu-item name="support">其他支持</x-menu-item>\n' +
                    '   </x-menu>\n' +
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
