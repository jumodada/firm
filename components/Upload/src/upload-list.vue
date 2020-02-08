<template>
    <ul>
        <li v-for="file in files">

        </li>
    </ul>
</template>

<script>
    import Icon from '../../icon'
    export default {
        name: "upload-list",
        components:{
            Icon
        },
        props:{
            files: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped>

</style>