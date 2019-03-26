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
                return `position-${this.position}`
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
                let top = item.offsetTop
                let {width,height} = item.getBoundingClientRect()
                if(this.position==='left'){
                    this.$refs.line.style.height = `${height}px`
                    this.$refs.line.style.transform = `translateY(${top}px)`
                }else{
                    this.$refs.line.style.width = `${width}px`
                    this.$refs.line.style.transform = `translateX(${left}px)`
                }
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
    $blue:rgb(64, 158, 255);
    $border-color: #ddd;
    $animation-duration:0.3s;

    .tabs{
            display: flex;
            flex-direction: column;
        transition: .4s all ease-in-out;
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
            transition: .4s all ease-out;
            position: relative;
            overflow: hidden;
            width: 100%;
        }
        &.position-left{
            display: flex;
            flex-direction: row;
            transition: 0.4s all ease;
            .tabs-header{
                display: flex;
                flex-direction: column;
                height: auto;
                align-items: center;
                position: relative;
                border-right: 1px solid  $border-color;
                border-bottom:none;
                .tabs-header-item{
                    padding: 10px 0;
                    .tabs-header-name{
                        display: flex;
                        padding: 6px 0;
                        min-width: 100px;
                        width: auto;
                        align-items: center;
                        justify-content: center;
                        transition: .4s all;
                        &:hover{
                            color:$blue;
                            font-weight: bold;
                            font-size: 17px;
                            transform:none;
                        }
                    }
                }
                >.line{
                    position: absolute;
                    top: 0;
                    left: 97%;
                    border-right: $blue solid 3px;
                    transition: all $animation-duration;
                }
            }
            .tabs-content{
                margin-left: 25px;
                position: relative;
                overflow: hidden;
                width: 100%;
            }
        }
        &.position-bottom{
            flex-direction: column-reverse;
            .tabs-content{
                margin-bottom: 25px;

            }
        }
        &.position-right{
            display: flex;
            flex-direction: row-reverse;
            transition: 0.4s all ease;
            .tabs-header{
                display: flex;
                flex-direction: column;
                height: auto;
                align-items: center;
                position: relative;
                border-left: 1px solid  $border-color;
                border-bottom:none;
                .tabs-header-item{
                    padding: 10px 0;
                    .tabs-header-name{
                        display: flex;
                        padding: 6px 0;
                        min-width: 100px;
                        width: auto;
                        align-items: center;
                        justify-content: center;
                        transition: .4s all;
                        &:hover{
                            color:$blue;
                            font-weight: bold;
                            font-size: 17px;
                            transform:none;
                        }
                    }
                }
                >.line{
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-left: $blue solid 3px;
                    transition: all $animation-duration;
                }
            }
            .tabs-content{
                margin-left: 25px;
                position: relative;
                overflow: hidden;
                width: 100%;
            }
        }
    }
</style>
