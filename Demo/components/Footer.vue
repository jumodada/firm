<template>
    <div style="height: 300px" class="firm-footer">
        <div class="firm-footer-link">
            <div class="firm-footer-link-about">
                <span>关于</span>
                <span>组件库</span>
                <span>github</span>
                <span>联系邮箱</span>
            </div>
            <div class="firm-footer-link-dependence">
                <span>官网依赖</span>
                <span>Vue-router</span>
                <span>animeJs</span>
                <span>highlightJs</span>
            </div>
            <div class="firm-footer-link-components">
                <span>更多 =></span>
            </div>
        </div>
        <div  class="nav-react">
            <x-icon style="margin-right: 10px" font-size="30px" name="React"></x-icon>
             React</div>
        <div class="nav-svg">
            <x-icon color="#cccccc" style="margin-right: 10px" font-size="30px" name="svg"></x-icon>
            SVG</div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        methods:{
        }
    }
</script>

<style scoped lang="scss">
@import "../assets/styles/color-select";
.firm-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &-link{
        position: absolute;
        left: 50px;
        top: 46px;
        display: flex;
        text-align: center;
        &-about,&-dependence,&-components{
            display: flex;
            margin-left: 45px;
            margin-right: 45px;
            flex-direction: column;
            span{
                margin-top: 15px;
                color: #919191;
            }

        }
        &-about{
            span{
                &:first-child{
                    color: #08AEEA;
                    font-size: 18px;
                }
            }
        }
        &-dependence{
            span{
                &:first-child{
                    color: #fdcb63;
                    font-size: 18px;
                }
            }
        }
        &-components{
            span{
                &:first-child{
                    color: #ab37cb;
                    font-size: 18px;
                }
            }
        }
    }
}
    .nav-react,.nav-svg{
        padding: 9px;
        font-size: 23px;
        text-align: center;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: white;
        position: absolute;
        left: 80%;
        transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: translateX(calc(-50% - 100px));
        &:hover{
            transform: translateX(calc(-50% - 100px)) scale(1.03);
        }

    }
    .nav-react{
        top: 50px;
        width: 300px;
        height: 100px;
        cursor: pointer;
        background-color: #8D48C9;
        background-image: linear-gradient(20deg,#8D48C9 0%,#F76B1C 100%);
        background-image: -webkit-linear-gradient(20deg,#8D48C9 0%,#F76B1C 100%);
        background-image: -moz-linear-gradient(20deg,#8D48C9 0%,#F76B1C 100%);
        background-image: -o-linear-gradient(20deg,#8D48C9 0%,#F76B1C 100%);
        border-radius: 10px;
    }
    .nav-svg{
        top: 200px;
        width: 300px;
        height: 100px;
        background-color: #F4D03F;
        background-image: linear-gradient(132deg,#F4D03F 0%,#16A085 100%);
        background-image: -webkit-linear-gradient(132deg,#F4D03F 0%,#16A085 100%);
        background-image: -moz-linear-gradient(132deg,#F4D03F 0%,#16A085 100%);
        background-image: -o-linear-gradient(132deg,#F4D03F 0%,#16A085 100%);
        border-radius: 10px;
    }
</style>
