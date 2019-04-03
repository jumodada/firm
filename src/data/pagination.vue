<template>
<div class="x-pagination">
    
</div>
</template>

<script>
    export default {
        name: "x-pagination",
        props:{
            totalPage:{
                type:Number,
                required:true
            }
        },
        currentPage:{
            type:Number,
            required:true
        },
        onePageNumber:{
            type:Number,
            required:true
        },
        disabled:{
            type:Boolean,
            default:false
        },
        hideIfOnePage:{
            type:Boolean,
            default:true
        }
    }
</script>

<style scoped>

</style>
