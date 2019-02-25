<template>
    <div class="tabs" :class="positionStyle">
        <div class="tabs-header">
            <div  ref="item" class="tabs-header-item"  @click="onClick(index+1)" v-for="(item,index) in headerClass">
                <div  class="tabs-header-name"

                     :class="{active:(index===parseInt(active-1))}">
                    {{item}}
                </div>
            </div>
            <div ref="line" class="line"></div>
            <div class="actions-wrapper">
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
        name: "g-tabs",
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
                this.active = index
                this.activeChange()
                this.lineMove()
            },
            activeChange(){
                this.$children.forEach(child=>{
                    child._data.active = this.active
                })
            },
            lineMove(){
                let {width,left} = this.$refs.item[this.active-1].getBoundingClientRect()
                this.$refs.line.style.width = `${width}px`
                this.$refs.line.style.transform = `translateX(${left}px)`
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.lineMove()
                Object.keys(this.disabledClass).forEach(child=>{
                    let childValue =  this.disabledClass[child]
                    if(childValue){
                       this.$refs.item[child-1].classList.add('disabled')
                    }
                })
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
    .tabs{
            display: flex;
            flex-direction: column;
        .tabs-header{
            display: flex;
            height: $tab-height;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            border: 1px solid  $border-color;
            .tabs-header-item{
                .tabs-header-name{
                    padding: 0 2em;
                    cursor: pointer;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    &:hover{
                        color:$blue;
                        font-weight: bold;
                    }
                    &.active{
                        color:$blue;
                        font-weight: bold;
                    }

                }
                &.disabled{
                    cursor: not-allowed;
                    pointer-events: none;
                    opacity: 0.6;
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

    }
</style>
