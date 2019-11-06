<template>
    <div style="height: 300px" class="firm-footer">
        <div class="nav">联系</div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">
@import "../assets/styles/color-select";
.firm-footer{
    display: flex;
    justify-content: center;
    align-items: center;
}
    .nav{
        width: 100px;
        padding: 7px;
        text-align: center;
        color: white;
        
        background-color: #FAD961;
        background-image: linear-gradient(20deg,#FAD961 0%,#F76B1C 100%);
        background-image: -webkit-linear-gradient(20deg,#FAD961 0%,#F76B1C 100%);
        background-image: -moz-linear-gradient(20deg,#FAD961 0%,#F76B1C 100%);
        background-image: -o-linear-gradient(20deg,#FAD961 0%,#F76B1C 100%);
        border-radius: 5px;
    }
</style>
