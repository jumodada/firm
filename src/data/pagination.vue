<template>
<div class="x-pagination">
    <div class="x-pagination-button" :class="{disabled:currentPage===1}">
        <x-icon class="x-pagination-li-icon" name="left" color="#707070">

        </x-icon>
    </div>
            <ul class="x-pagination-ul">
                <li
                        v-for="page in pages"
                        @mouseenter="toggleIcon(page,$event)"
                        @mouseleave="toggleIcon(page,$event)"
                class="x-pagination-li"
                :class="{active:page===currentPage,separator:(page==='...')}">
                    <span v-if="(page!=='...')">{{page}}</span>
                    <transition name="fade" mode="out-in">
                        <Dots key="dynamic" v-if="(page==='...')&&!IconToggle" class="x-pagination-li-icon"></Dots>
                        <x-icon  key="static" class="x-pagination-li-icon" color="#8a8a8a" v-if="(page==='...')&&IconToggle" name="more"></x-icon>
                    </transition>
                </li>
            </ul>
    <div class="x-pagination-button"  :class="{disabled:currentPage===totalPage}" style="margin-left: 5px">
        <x-icon  class="x-pagination-li-icon" name="right" color="#707070">

        </x-icon>
    </div>
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

            let u =unique([1,this.totalPage,this.currentPage,this.currentPage-1,this.currentPage-2,this.currentPage+1,this.currentPage+2]
                .filter(n=>n>=1&&n<=this.totalPage)
                .sort((a,b)=>a-b))
                .reduce((prev,current,index,array)=>{
                prev.push(current)
                array[index+1]!==undefined&&array[index+1]-array[index]>1&&prev.push('...')

                return prev
            },[])
            return {
                pages:u,
                IconToggle:true
            }
        },
        mounted(){

        },
        methods:{
            toggleIcon(page,e){
                if(page!=='...')return
                    this.IconToggle = e.type === 'mouseleave' ? true : false;
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
    .fade-enter-active, .fade-leave-active {
        transition: all .15s;
    }
    .fade-enter, .fade-leave-to  {
        opacity: 0;
    }
            .x-pagination{
                display: inline-flex;
                justify-content: flex-start;
                align-items: center;
                &-button{
                    position: relative;
                    top: .5px;
                    border:1px solid #cdcdcd;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 20px;
                    height: 27px;
                    padding: 4px 6px 4px;
                    outline: none;
                    border-radius: 3px;
                    cursor: pointer;
                    &.disabled{
                        cursor: not-allowed;
                        opacity: .5;
                    }
                }
                        &-ul{
                            padding-left: 0;
                        }
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
                           width: 1.1em;
                           height: 1.1em;
                       }
               }

            }
</style>

