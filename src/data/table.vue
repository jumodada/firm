<template>
    <div>
        <table>

        </table>
    </div>
</template>

<script>
    export default {
        name: "x-table",
        props:{
            columns:{
                type:Array,
                required:true
            },
            data:{
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
