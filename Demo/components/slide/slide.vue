<template>
    <div class="firm-slider">
        <div class="firm-slider-ul">
            <div class="firm-slider-ul-name">指南</div>
            <router-link :key="item.path" :to="item.path" class="firm-slider-li" v-for="item in compass">
                <span class="firm-slider-li-es">{{item.name}}</span>
                <span class="firm-slider-li-zh">{{item.meta.name}}</span>
            </router-link>
            <div class="firm-slider-ul-name">组件</div>
            <router-link :key="item.path" :to="item.path" class="firm-slider-li" v-for="item in components">
                <span class="firm-slider-li-es">{{item.name}}</span>
                <span class="firm-slider-li-zh">{{item.meta.name}}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    import routes from '../../router'
    export default {
        name: "slide",
        data(){
          return {
              compass:[],
              components:[]
          }
        },
        mounted() {
            this.assort()
        },
        methods:{
            assort(){
                routes.options.routes[1].children.forEach(child=>{
                    if(child.meta.type==='compass'){
                        this.compass.push(child)
                    }else if(child.meta.type==='component'){
                        this.components.push(child)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/color-select";
    @import "../../assets/styles/shadow-select";
    .firm-slider{
        width: 260px;
        height: calc(100vh - 70px);
        box-shadow: $shadow-right-black;
        background-color: $slider-dark-2;
        overflow: auto;
        &-ul{
            margin-top: 20px;
            color: #ffb311;
            display: flex;
            flex-direction: column;
            align-items: start;
            padding-left: 25px;
            &-name{
                margin-left: -10px;
                margin-top: 20px;
            }
        }
        &-li{
            margin-top: 12px;
            text-decoration: none;
            color: white;
            font-size: 14px;
            transition: .2s ease transform,.18s ease color ;
            &:hover{
                color: $text1-orange;
                transform: translateX(3px);
            }
            &-es{
                font-size: 16px;
                margin-right: 5px;
                color: #edf0f6;
            }
            &-zh{
                font-size: 13px;
                color: #c2c5cb;
            }
        }
    }
</style>
