<template>
    <div>
        <x-switch @on-change="xxx" active-color="#f39812" inactive-color="#08af31" size="small">
            <span slot="open">
            开
            </span>
            <span  slot="close">
                关
            </span>
        </x-switch>
    </div>
</template>

<script>
    import Switch from '../../../src/form data/switch'
    export default {
        name: "table-default",
        components:{
            'x-switch':Switch
        },

        methods:{
            xxx(e){
                console.log(e)
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
