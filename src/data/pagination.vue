<template>
<div class="x-pagination">
            <span v-for="page in pages">
            {{page}}
            </span>
</div>
</template>

<script>
    export default {
        name: "x-pagination",
        props:{
            totalPage:{
                type:Number,
                required:true
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
        },
        data(){
            let pages = [1,this.totalPage,this.currentPage,this.currentPage,this.currentPage-1,this.currentPage+1,this.currentPage+2]

            return {
                pages:unique(pages.sort((a,b)=>a-b))
            }
        }

    }
    function unique(array) {
        const object = {}
        array.map(number=>{
            object[number] = true
        })
        return Object.keys(object).map(s=>parseInt(s,10))
    }
</script>

<style scoped>

</style>
