<template>
    <div class="firm-main">
        <logo></logo>
        <card></card>
        <div class="divide-line"></div>
        <Footer></Footer>
    </div>
</template>

<script>
    import logo from './src/logo'
    import {elementShowAddActive} from "../../utils/lazy-active"
    import card from './src/card/card'
    import Footer from '../Footer'

    export default {
        name: "Main",
        components: {
            logo,
            card,
            Footer
        },
        mounted() {
            elementShowAddActive(this)
        },
        methods: {}

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

    .divide-line {
        &::after {
            content: '';
            display: block;
            position: relative;
            border-radius: 0 100% 47% 53% / 0% 0% 100% 100%;
            background-size: cover;
            background-color: #313639;
            height: 80px;
            z-index: 100;
        }
    }

</style>
