<template>
    <div style="margin: 500px;">
        <x-cascader :source="source"></x-cascader>
    </div>
</template>
<script>
    import Button from "./button"
    import Cascader from "./cascader"
    export default {
        name: "demo",
        components: {
            "x-button": Button,
            "x-cascader": Cascader
        },
        data () {
            return {
                source: [
                    {
                        name: "四川",
                        children: [
                            {

                                name: "成都",
                                children: [{name: "青羊区"}, {name: "金牛区"}, {name: "武侯区"}]
                            },
                            {

                                name: "雅安",
                                children: [{name: "四川农业大学"}, {name: "大学食堂"}, {name: "兰州拉面"}]
                            }
                        ]
                    },
                    {
                        name: "福建",
                        children: [
                            {
                                name: "福州",
                                children: [{name: "鼓楼"}, {name: "台江"}, {name: "仓山"}]
                            }
                        ]
                    },
                    {
                        name: "广东",
                        children: [
                            {
                                name: "东莞",
                                children: [
                                    {
                                        name: "你懂得"
                                    },
                                    {
                                        name: "我不懂"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }
    };
</script>
<style>

</style>
