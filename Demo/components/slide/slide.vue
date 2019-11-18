<template>
    <div class="firm-slider">
        <div class="firm-slider-ul">
            <div class="firm-slider-ul-name">指南</div>
            <router-link :to="item.path" class="firm-slider-li" v-for="item in compass">
            {{item.meta.name}}
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
                    }else if(child.meta.type==='content.vue'){
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
        width: 240px;
        height: calc(100vh - 70px);
        box-shadow: $shadow-right-black;
        background-color: $brand1-3;
        &-ul{
            color: $text1-grey;

        }
    }
</style>
