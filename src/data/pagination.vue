<template>
<div class="x-pagination">
            <span v-for="page in pages"
                  class="x-pagination-span"
                  :class="{active:page===currentPage,separator:page==='...'}"
            >
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

            let u =unique([1,this.totalPage,this.currentPage,this.currentPage+1,this.currentPage+2].sort((a,b)=>a-b))
            let u2 = u.reduce((prev,current,index,array)=>{
                prev.push(current)
                array[index+1]!==undefined&&array[index+1]-array[index]>1&&prev.push('...')

                return prev
            },[])
            return {
                pages:u2
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

<style scoped lang="scss">
            .x-pagination{
                &-span{
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px 6px;
                    margin-left: 5px;
                    min-width: 18px;
                    border:1px solid #cdcdcd;
                    border-radius: 3px;
                    color: rgb(96, 98, 102);
                    cursor: pointer;
                    transition: .3s all  ease;
                    &:hover{
                        color: #409eff;
                    }
                    &.separator{
                        border:none;
                        font-size: 18px;
                    }
                    &.active{
                        border:1px solid #409eff;
                        cursor: default;
                    }
                }
            }
</style>
