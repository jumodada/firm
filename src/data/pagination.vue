<template>
<div class="x-pagination">
            <ul class="x-pagination-ul">
                <li
                        v-for="page in pages"
                class="x-pagination-li"
                :class="{active:page===currentPage,separator:(page==='...')}">
                    <span v-if="(page!=='...')">{{page}}</span>
                    <Dots  v-if="(page==='...')" class="x-pagination-li-icon"></Dots>
                </li>
            </ul>
</div>
</template>

<script>
    import Dots from '../currency/dynamic icon/dots'
    import Icon from '../currency/icon'
    export default {
        name: "x-pagination",
        components:{
          'x-icon':Icon,
            Dots
        },
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
                &-li{
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    vertical-align: center;
                    padding: 4px 6px;
                    margin-left: 5px;
                    min-width: 20px;
                    min-height: 25px;
                    border:1px solid #cdcdcd;
                    border-radius: 3px;
                    color: rgb(96, 98, 102);
                    cursor: pointer;
                    transition: .3s all  ease;
                    &:hover{
                        color: #409eff;
                    }
                    &.separator{
                        position: relative;
                        top: 5px;
                        border:none;
                        font-size: 16px;
                    }
                    &.active{
                        border:1px solid #409eff;
                        cursor: default;
                    }
                    &-icon{
                        position: relative;
                        top: 14px;
                        &:hover{
                            fill: #409eff;
                        }
                    }
                }
            }
</style>

