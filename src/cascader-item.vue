<template>
    <div class="cascader-item">
        {{sourceItem.name}}
        <cascader-item v-for="item in sourceItem.children"
             v-if="sourceItem.children"
             :source-item="item"
        > </cascader-item>
    </div>
</template>

<script>
   export  default {
        name: "cascader-item",

        props:{
            sourceItem:{
                type:Object
            }
        },
    }
</script>

<style scoped>
            .cascader-item{
                border:1px solid red;
                margin: 10px;
            }
</style>
