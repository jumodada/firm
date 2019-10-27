<template>
    <div id="app">
        <Header></Header>
    </div>
</template>

<script>
    import Header from './components/Header'
    export default {
        name: "app",
        components:{
            Header
        }
    }
</script>

<style lang="scss">
    body{
        margin: 0;
        padding: 0;
    }
    *{
        box-sizing: border-box;
    }
    #app{
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
</style>
