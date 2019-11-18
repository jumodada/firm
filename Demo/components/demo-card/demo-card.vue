<style lang="scss" scoped>
    .demo-card-wrapper {
        width: 60vw;
        padding: 33px 23px;
        display: inline-flex;
        border: 1px solid #eaeaea;
        border-radius: 5px;
        .demo-card-source {

        }
        .demo-card-drop{
            height: 70px;
        }
    }
</style>


<template>
    <div class="demo-card-wrapper">
        <div class="demo-card-source">
            <slot name="source"></slot>
        </div>
        <div class="demo-card-drop">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'demo-card',
        data() {
            return {}
        },
    }
</script>
