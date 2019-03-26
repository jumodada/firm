<template>
    <div class="tabs" :class="positionStyle">
        <div class="tabs-header" :class="{cardsStyle:cards}">
            <div  ref="item" class="tabs-header-item"
                  @click="onClick(index+1)" v-for="(item,index) in headerClass">
                <div  class="tabs-header-name"
                      ref="itemHeader"
                     :class="{active:(index===parseInt(active-1))}">
                    {{item}}
                </div>
            </div>
            <div ref="line" class="line" v-if="!cards"></div>
            <div class="actions-wrapper" v-if="!cards">
                <slot name="actions"></slot>
            </div>
        </div>
            <div class="tabs-content">
                <slot></slot>
            </div>
    </div>
</template>

<script>

    export default {
        name: "x-tabs",
        props:{
            selected:{
                type:String,
                required:true
            },
            position:{
                type: String,
                default:'top',
                validator(val){
                    return ['top','left','right','bottom'].indexOf(val)>-1
                }
            },
            cards:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                headerClass:[],
                disabledClass:{},
                active:this.selected,
            }
        },

        computed:{
            positionStyle(){
                return `postion-${this.position}`
            },
        },
        methods:{
            onClick(index){
                 if(this.disabledClass[index])return
                this.tellChildren(index)
                this.active = index
                this.$nextTick(()=>{
                    this.activeChange()
                    this.lineMove()
                })
            },
            tellChildren(index){
                this.$children.forEach(child=>{
                    index<this.active? child.isReverse=true:child.isReverse=false
                })
            },
            activeChange(){
                this.$children.forEach(child=>{
                    child._data.active = this.active
                })
            },
            lineMove(){
                if(this.cards)return
                let item = this.$refs.item[this.active-1]
                let   left =  item.offsetLeft
                let {width} = item.getBoundingClientRect()
                this.$refs.line.style.width = `${width}px`
                this.$refs.line.style.transform = `translateX(${left}px)`
            },
            addDisabled(){
                Object.keys(this.disabledClass).forEach(child=>{
                    let childValue =  this.disabledClass[child]
                    if(childValue){
                        this.$refs.itemHeader[child-1].classList.add('disabled')
                    }
                })
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.lineMove()
                this.addDisabled()
            })
            this.activeChange()

        }
    }
</script>

<style scoped lang="scss">
    $tab-height:40px;
    $blue:#1296db;
    $border-color: #ddd;
    $animation-duration:0.3s;
    @keyframes xuan {
       0%{
           border-bottom: 1px solid $blue;

       }
    }
    .tabs{
            display: flex;
            flex-direction: column;
        .tabs-header{
            display: flex;
            height: $tab-height;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            border-bottom: 1px solid  $border-color;
            .tabs-header-item{
                .tabs-header-name{
                    padding: 0 2em;
                    cursor: pointer;
                    height: 100%;
                    color:#515a6e;
                    display: flex;
                    align-items: center;
                    transition:  all .3s;
                    &:hover{
                        color:$blue;
                        font-weight: bold;
                        transform: translateX(-10%);
                    }
                    &.active{
                        color:$blue;
                        font-weight: bold;
                    }
                    &.disabled{
                        cursor: not-allowed;
                        opacity: 0.4;
                        &:hover{
                            color:#727171;
                            font-weight: normal;
                            transform: translateX(0);
                        }
                    }
                }

            }

            &.cardsStyle{
                align-items: normal;

                .tabs-header-item{
                    border: 1px solid #dddddd;
                    border-bottom: none;
                    &:first-child{
                        border-top-left-radius: 4px;
                    }
                    &:last-child{
                        border-top-right-radius: 4px;
                    }
                    &:not(:first-child){
                        border-left: none;
                    }
                    .tabs-header-name{
                        &:hover{
                            color:$blue;
                            font-weight: bold;
                            transform:none;
                        }
                        &.active{
                            transition: 0s;
                            border-bottom: solid 1px rgba(255,255,254,255);
                        }
                    }
                }
            }
            >.line{
                position: absolute;
                bottom: 0;
                border-bottom: $blue solid 3px;
                transition: all $animation-duration;
            }
            >.actions-wrapper{
                margin-left: auto;
                margin-right: 2em;
            }

        }

        .tabs-content{
            margin-top: 25px;
            position: relative;
            overflow: hidden;
            width: 100%;
        }

    }
</style>
