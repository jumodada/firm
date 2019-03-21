<template>
    <div style="margin-top: 50px;display: flex">


        <x-collapse :selected.sync="selectTab1" exhibition>
            <template slot="description">
                <div style="color: #999999">
                    <x-menu :selected.sync="selected1" vertical
                            style="margin-right: 50px"
                    >
                        <x-sub-menu name="extension" icon-name="set">
                            <template slot="title">设置</template>

                            <x-menu-item-group name="group1">
                                <template slot="title">分组1</template>
                                <x-menu-item name="item1-1">item1</x-menu-item>
                                <x-menu-item name="item2-1">item2</x-menu-item>
                            </x-menu-item-group>
                            <x-menu-item-group name="group2">
                                <template slot="title">分组2</template>
                                <x-menu-item name="item2-1">item2</x-menu-item>
                                <x-menu-item name="item2-2">item2</x-menu-item>
                            </x-menu-item-group>
                            <x-sub-menu name="user">
                                <template slot="title">账号管理</template>
                                <x-menu-item-group name="sub-group1">
                                    <template slot="title">分组1</template>
                                    <x-menu-item name="sub-item1-1">item1</x-menu-item>
                                    <x-menu-item name="sub-item1-2">item2</x-menu-item>
                                </x-menu-item-group>
                                <x-menu-item name="toggle">切换账号</x-menu-item>
                                <x-menu-item name="cancel">注销</x-menu-item>
                            </x-sub-menu>
                            <x-menu-item name="windows">消息通知</x-menu-item>
                        </x-sub-menu>
                        <x-sub-menu name="address" icon-name="dizhi">
                            <template slot="title">地址管理</template>
                            <x-menu-item name="addAddress">添加地址</x-menu-item>
                            <x-menu-item name="modifyAddress">修改地址</x-menu-item>
                            <x-menu-item name="defaultAddress">默认地址选择</x-menu-item>
                        </x-sub-menu>
                        <x-sub-menu name="package" icon-name="dingdan">
                            <template slot="title">我的订单</template>
                            <x-sub-menu name="order">
                                <template slot="title">全部订单</template>
                                <x-menu-item name="delivery">待发货</x-menu-item>
                                <x-menu-item name="receiving">待收货</x-menu-item>
                            </x-sub-menu>
                            <x-menu-item name="parcel">取消的订单</x-menu-item>
                        </x-sub-menu>
                        <x-menu-item name="connect" icon-name="lianxidaogou">联系我们</x-menu-item>
                        <x-menu-item name="support" icon-name="Support">其他支持</x-menu-item>
                    </x-menu>


                    <x-menu :selected.sync="selected2" vertical
                            text-color="#fff"
                            active-color="#ffd04b"
                            active-back-ground-color="#515151"
                            back-ground-color="#545c64"
                    >
                        <x-sub-menu name="extension" icon-name="set">
                            <template slot="title">设置</template>

                            <x-menu-item-group name="group1">
                                <template slot="title">分组1</template>
                                <x-menu-item name="item1-1">item1</x-menu-item>
                                <x-menu-item name="item2-1">item2</x-menu-item>
                            </x-menu-item-group>
                            <x-menu-item-group name="group2">
                                <template slot="title">分组2</template>
                                <x-menu-item name="item2-1">item2</x-menu-item>
                                <x-menu-item name="item2-2">item2</x-menu-item>
                            </x-menu-item-group>
                            <x-sub-menu name="user">
                                <template slot="title">账号管理</template>
                                <x-menu-item-group name="sub-group1">
                                    <template slot="title">分组1</template>
                                    <x-menu-item name="sub-item1-1">item1</x-menu-item>
                                    <x-menu-item name="sub-item1-2">item2</x-menu-item>
                                </x-menu-item-group>
                                <x-menu-item name="toggle">切换账号</x-menu-item>
                                <x-menu-item name="cancel">注销</x-menu-item>
                            </x-sub-menu>
                            <x-menu-item name="windows">消息通知</x-menu-item>
                        </x-sub-menu>
                        <x-sub-menu name="address" icon-name="dizhi">
                            <template slot="title">地址管理</template>
                            <x-menu-item name="addAddress">添加地址</x-menu-item>
                            <x-menu-item name="modifyAddress">修改地址</x-menu-item>
                            <x-menu-item name="defaultAddress">默认地址选择</x-menu-item>
                        </x-sub-menu>
                        <x-sub-menu name="package" icon-name="dingdan">
                            <template slot="title">我的订单</template>
                            <x-sub-menu name="order">
                                <template slot="title">全部订单</template>
                                <x-menu-item name="delivery">待发货</x-menu-item>
                                <x-menu-item name="receiving">待收货</x-menu-item>
                            </x-sub-menu>
                            <x-menu-item name="parcel">取消的订单</x-menu-item>
                        </x-sub-menu>
                        <x-menu-item name="connect" icon-name="lianxidaogou">联系我们</x-menu-item>
                        <x-menu-item name="support" icon-name="Support">其他支持</x-menu-item>
                    </x-menu>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <code>x-sub-menu</code>和<code>x-menu-item</code>都可以设置 <code>icon-name</code>来给选择栏添加图标作为标识
                    <br>
                    使用 <code>vertical</code> 换为侧栏
                    <br>

                    <br>
                    弹出框是默认 <code>click</code>触发

                </div>
            </template>
            <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                <div v-html="html"></div>
            </x-collapse-item>
        </x-collapse>
    </div>
</template>

<script>
    import Menu from '../../../src/Navigation/menu'
    import MenuItem from '../../../src/Navigation/menu-item'
    import subMenu from '../../../src/Navigation/sub-menu'
    import MenuItemGroup from '../../../src/Navigation/menu-item-group'
    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
    import 'highlight.js/styles/atom-one-dark.css'
    import marked from 'marked'

    export default {
        name: "menu-default",
        data(){
            return {
                selected1:['connect'],
                selected2:['connect'],
                selectTab1:[1],
                input1:'```html\n' +
                    '<x-menu :selected.sync="selected" vertical>\n' +
                    '<x-sub-menu name="extension" icon-name="set">\n' +
                    '   <template slot="title">设置</template>\n' +
                    '       <x-sub-menu name="user">\n' +
                    '              <template slot="title">账号管理</template>\n' +
                    '              <x-menu-item name="toggle">切换账号</x-menu-item>\n' +
                    '          <x-menu-item name="cancel">注销</x-menu-item>\n' +
                    '            </x-sub-menu>\n' +
                    '           <x-menu-item name="windows">消息通知</x-menu-item>\n' +
                    '           </x-sub-menu>\n' +
                    '         <x-sub-menu name="address" icon-name="dizhi">\n' +
                    '         <template slot="title">地址管理</template>\n' +
                    '             <x-menu-item name="addAddress">添加地址</x-menu-item>\n' +
                    '               <x-menu-item name="modifyAddress">修改地址</x-menu-item>\n' +
                    '            <x-menu-item name="defaultAddress">默认地址选择</x-menu-item>\n' +
                    '               </x-sub-menu>\n' +
                    '           <x-sub-menu name="package" icon-name="dingdan">\n' +
                    '             <template slot="title">我的订单</template>\n' +
                    '          <x-sub-menu name="order">\n' +
                    '                 <template slot="title">全部订单</template>\n' +
                    '                <x-menu-item name="delivery">待发货</x-menu-item>\n' +
                    '              <x-menu-item name="receiving">待收货</x-menu-item>\n' +
                    '        </x-sub-menu>\n' +
                    '           <x-menu-item name="parcel">取消的订单</x-menu-item>\n' +
                    '            </x-sub-menu>\n' +
                    '         <x-menu-item name="connect" icon-name="lianxidaogou">联系我们</x-menu-item>\n' +
                    '       <x-menu-item name="support" icon-name="bangzhuyuzhichi">其他支持</x-menu-item>\n' +
                    ' </x-menu>\n' +
                    '```'
            }
        },
        components:{
            'x-menu':Menu,
            'x-menu-item':MenuItem,
            'x-menu-item-group':MenuItemGroup,
            'x-sub-menu':subMenu,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
        },
        computed: {
            html() {
                return marked(this.input1)
            },
        },
    }
</script>

<style scoped>

</style>
