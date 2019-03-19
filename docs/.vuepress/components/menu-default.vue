<template>
    <div style="margin-top: 50px">
        <x-menu :selected.sync="selected" single>
            <x-sub-menu name="extension">
                <template slot="title">扩展</template>
                <x-menu-item name="mac">for Mac</x-menu-item>
                <x-menu-item name="windows">for Windows</x-menu-item>
            </x-sub-menu>
                <x-sub-menu name="learn">
                    <template slot="title">如何使用</template>
                    <x-menu-item name="fast">快速入门</x-menu-item>
                    <x-menu-item name="advanced">进阶配置</x-menu-item>
                    <x-menu-item name="package">多语言支持</x-menu-item>
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
    </div>
</template>

<script>
    import Menu from '../../../src/Navigation/menu'
    import MenuItem from '../../../src/Navigation/menu-item'
    import subMenu from '../../../src/Navigation/sub-menu'
    export default {
        name: "menu-default",
        data(){
            return {
                    selected:['1']
            }
        },
        components:{
            'x-menu':Menu,
            'x-menu-item':MenuItem,
            'x-sub-menu':subMenu,
        }
    }
</script>

<style scoped>

</style>
