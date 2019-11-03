<template>
    <div class="firm-main">
        <logo></logo>
        <card></card>
    </div>
</template>

<script>
    import logo from './src/logo'
    import {elementShowAddActive} from "../../utils/lazy-active"
    import card from './src/card/card'
    export default {
        name: "Main",
        components:{
            logo,
            card
        },
        mounted() {
            elementShowAddActive(this)
        },
        methods: {

        }

    }
</script>

<style scoped lang="scss">

    body {
        display: flex;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100vh;
    }


</style>
