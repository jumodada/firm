<template>
    <div>
        <x-switch>
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
        }
    }
</script>

<style scoped lang="scss">
</style>
