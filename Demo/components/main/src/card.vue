<template>
    <div class="firm-main-card">
        <div class="parting"></div>
        <span class="mark"></span>
        <div :class="{active:isActive}" class="description" ref="description">
            一个基于Vue2.0的PC端组件库
        </div>
        <div class="card-group">
            <div class="card-group-item">
                <div class="card-group-item-title">
                    <svg ref="card" class="rotate" stroke="#fafaf1" stroke-width="24" viewBox="0 0 1024 1024"
                         width="200" height="240">
                        <path stroke="white" stroke-width="30"
                              d="M512 30.117647C246.964706 30.117647 30.117647 246.964706 30.117647 512s216.847059 481.882353 481.882353 481.882353 481.882353-216.847059 481.882353-481.882353S777.035294 30.117647 512 30.117647z m0 903.529412C280.094118 933.647059 90.352941 743.905882 90.352941 512S280.094118 90.352941 512 90.352941s421.647059 189.741176 421.647059 421.647059-189.741176 421.647059-421.647059 421.647059z"
                              fill="white" p-id="3712"></path>
                        <path class="path" stroke="white" stroke-width="30"
                              d="M256 768l382.494118-126.494118 126.494117-382.494117-382.494117 126.494117-126.494118 382.494118z m415.623529-415.623529L602.352941 560.188235 463.811765 421.647059l207.811764-69.270588zM560.188235 602.352941l-207.811764 69.270588 69.270588-207.811764 138.541176 138.541176z"
                              fill="white" p-id="3713"></path>
                    </svg>
                </div>
                <div class="card-group-item-content">
                    <div class="card-group-item-content-header">
                        指南
                    </div>
                    <div class="card-group-item-content-main"></div>
                    <div class="card-group-item-content-more"></div>
                </div>
            </div>
            <div class="card-group-item"></div>
            <div class="card-group-item"></div>
        </div>
    </div>
</template>

<script>
    import anime from 'animejs/lib/anime.es'
    export default {
        name: "card",
        data() {
            return {
                isActive: false
            }
        },
        mounted() {
            anime({
                targets: '.rotate',
                duration: 1500,
                rotate: {
                    value: 360,
                    duration: 1800,
                    easing: 'easeInOutSine'
                },
                delay: function (el, i) {
                    return i * 250
                },
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'

            })
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/styles/color-select";

    .description {
        color: $brand1-2;
        margin-top: 30px;
        font-size: 30px;
        opacity: 0;
        transition: all .3s ease-out;
    }

    .active {
        opacity: 1;
        transform: translateY(10px);
        transition-delay: .3s;
    }

    .firm-main-card {
        height: 1000px;
        background-color: $brand1-1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .parting {
            width: 100%;
            height: 30px;

            &::after {
                content: '';
                display: block;
                position: relative;
                margin: 0;
                padding-bottom: 3%;
                background-color: $brand1-1;
                border-radius: 0 100% 50% 50% / 0% 0% 100% 100%;
                background-size: cover;
                z-index: 100;
            }
        }

        .card-group {
            display: flex;
            justify-content: center;
            margin-top: 50px;

            &-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 300px;
                height: 450px;
                border-radius: 10px;
                transition: .35s all ease;
                cursor: pointer;
                &:first-child{
                    background-color: #27AE60;
                    .card-group-item-title{
                        background-color: #228743;
                    }
                }
                &:not(:first-child) {
                    margin-left: 3rem;
                }
                &:nth-child(2){
                    background-color: #fac958;
                    .card-group-item-title{
                        background-color: #eebd58;
                    }
                }

                &:hover {
                    box-shadow: 3px 0 4px 2px rgba(0, 0, 0, 0.15);
                    transform: scale(1.01);
                }

                &-title {
                    width: 100%;
                    height: 140px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px 10px 0 0;
                }
                &-content{
                    
                }
            }
        }

        .mark {
            margin-top: 30px;
            padding: 3px 30px;
            max-width: 0;
            height: 20px;
            border-radius: 12px;
            background-image: -webkit-gradient(linear, left top, right top, from(#ffd200), to(#cc3133));
            background-image: linear-gradient(90deg, #ffd200 0%, #cc3133 100%);
        }

        .rotate {
            width: 100px;
        }
    }
</style>
