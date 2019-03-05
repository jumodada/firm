<template>

<div class="collapse-item" ref="item">
<div class="collapse-item-title" @click="onClick" v-if="!exhibition">
    <x-icon name="arrow" class="arrow" ref="arrow" :class="{rotate:open}"></x-icon>
    {{title}}
</div>

    <transition   @before-enter="beforeEnter"
                  @enter="enter"
                  @before-leave="beforeLeave"
                  @leave="leave"
    >
        <div class="collapse-item-content"
             v-show="open" ref="content"
        >
            <slot>
            </slot>
        </div>
    </transition>
    <div class="collapse-item-header" @click="onClick"  v-if="exhibition">
    <div class="header-description">
        <x-icon style="width: 1em;
                 height: 1em;
                 fill: #efecec"
                name="xia"
                class="x-icon" ref="xia"
                :class="{xRotate:open}">
        </x-icon> <div class="header-title" v-if="!title2 || !open">{{title}} </div><div class="header-title" v-else>{{title2}} </div>
    </div>

    </div>



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
              exhibition:false
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
            },
            title2:{
                type:String,
            }

        },
        mounted(){
            setTimeout(()=>{
                console.log(this.exhibition)
            })
            this.eventBus&&this.eventBus.$on('update:selected',arr=>{
                if(arr.indexOf(this.name)>-1){
                    this.open = true
                }else{
                        this.open =false
                }
            })
        },
        methods:{
            onClick(){
                if(this.open){
                    this.eventBus&& this.eventBus.$emit('update:removeSelected',this.name)
                }else{
                    this.eventBus&& this.eventBus.$emit('update:addSelected',this.name)
                }
            },
            beforeEnter(el) {
                    el.style.height = 0
                    el.style.paddingTop = 0
                    el.style.paddingBottom = 0
            },
            enter(el) {
                    if (el.scrollHeight !== 0) {
                        el.style.height = el.scrollHeight + 'px'
                    }
                    el.style.overflow = 'hidden'
            },
            beforeLeave(el) {
                    el.style.height = el.scrollHeight + 'px'
                    el.style.overflow = 'hidden'
            },
            leave(el) {
                        el.style.height = 0
                        el.style.paddingTop = 0
                        el.style.paddingBottom = 0
            },
        }
    }
</script>

<style scoped lang="scss">
    $grey:#ddd;
    $border-radius:4px;

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
                transition: all .2s;
            }
            .rotate{
                margin-right: 10px;
                transform: rotate(90deg);
                transition: all .2s;
            }
        }
        >.collapse-item-header{
            border: 1px solid #eeeeee;
            filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
            min-height: 30px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            vertical-align:center;
            padding:8px 8px;
            background-color: white;
            border-bottom: none;
            .header-description{
                transition: .3s all ease-in-out;
                .header-title{
                    opacity: 0;
                    margin-left: 10px;
                    display: inline-flex;
                    transition: .3s all ease-in-out;
                    font-family: Avenir;
                }
                .x-icon{
                    transition: .3s all ease-in-out;
                    transform: rotate(0deg);
                }
                .xRotate{
                    transition: .3s all ease-in-out;
                    transform: rotate(180deg);
                }

            }
            &:hover{
                cursor:pointer;
                transition: all .3s;
                background-color: #ffffff;
                >.header-description{
                    opacity: 1;
                    transform: translateX(-50%);
                    transition: .3s all ease-in-out;
                    >.header-title{
                        opacity: 1;
                        color: #999999;
                        transition: .3s all ease-in-out;
                    }
                    >.x-icon{
                        transition: .2s;
                        fill:#0ab1ef !important;
                    }

                }
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
                transition: .2s all ease-in-out;
                padding:10px;
                border-bottom: 1px solid $grey;

        }

    }
</style>
