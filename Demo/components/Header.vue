<template>
    <div class="header">
        <div class="header-brand">
            <x-icon color="white" font-size="70" name="symbol"></x-icon>
        </div>
        <div class="header-nav">
            <router-link class="header-nav-item" :to="'/'" v-for="item in routerItems">
                {{item}}
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return {
                routerItems:['首页','组件','指南']
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/color-select";

    .header {
        background-color: $brand1-1;
        position: fixed;
        top: 0;
        z-index: 9999;
        width: 100%;
        padding: 0 19px;
        display: flex;
        align-items: center;

        &-brand {
            cursor: pointer;
        }
        &-nav{
            position: absolute;
            right: 60px;
            &-item{
                margin-left: 20px;
                color: white;
                cursor: pointer;
            }
        }
    }
</style>
