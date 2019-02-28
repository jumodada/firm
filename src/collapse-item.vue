<template>

<div class="collapse-item">
<div class="collapse-item-title" @click="spread">
    <x-icon name="arrow" class="arrow" ref="arrow" :class="{rotate:open}"></x-icon>
{{title}}
</div>
        <transition name="slide">
            <div class="collapse-item-content" v-show="open">
                <slot>
                </slot>
            </div>
        </transition>
</div>

</template>

<script>
    import Icon from './icon'
    export default {
        name: "x-collapse-item",
        data(){
          return {
              open:false,
              rotate:45,
              interval:null,
              timer:null
          }
        },
        components:{
            'x-icon':Icon
        },
        inject:['eventBus'],
        props:{
            title:{
                type:String,
                required:true
            },
            name:{
                type: String
            }
        },
        mounted(){
            this.eventBus&&this.eventBus.$on('update:selected',arr=>{
                if(arr.indexOf(this.name)>-1){
                    this.open = true
                }else{
                    this.open = false
                }
            })
        },
        methods:{
            spread(){
                if(this.open){
                    this.eventBus&& this.eventBus.$emit('update:removeSelected',this.name)
                }else{
                    this.eventBus&& this.eventBus.$emit('update:addSelected',this.name)
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    $grey:#ddd;
    $border-radius:4px;
    .slide-enter-active {
        transition: all .15s ease-in-out;

    }
    .slide-leave-active{
        transition: all .1s ease-in-out;
    }
    .slide-enter-to,.slide-leave{
        height: 100%;
        padding:10px;
    }
    .slide-leave-to,.slide-enter {
        height: 0;
        padding:0;
        font-size: 0;
        border:none;
        margin: 0;
    }
    .slide-enter {
        opacity: 0;
    }

    .collapse-item{

        >.collapse-item-title{
            border: 1px solid $grey;
            margin-top: -1px;
            margin-left: -1px;
            margin-right:-1px;
            min-height: 52px;
            font-size: 15px;
            display: flex;
            align-items: center;
            padding:0 8px;
            background-color: #eeeeee;
            .arrow{
                margin-right: 10px;
                transform: rotate(0deg);
                transition: all .3s;
            }
            .rotate{
                margin-right: 10px;
                transform: rotate(90deg);
                transition: all .3s;
            }
        }
        &:first-child{
            >.collapse-item-title{
                border-top-left-radius: $border-radius;
                border-top-right-radius: $border-radius;
            }
        }
        &:last-child{
            >.collapse-item-title:last-child{
                border-bottom-left-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
            }
        }
        >.collapse-item-content{
                padding:10px;
                border-bottom: 1px solid $grey;
        }

    }
</style>
