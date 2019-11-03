<template>
    <div class="firm-main-card">
        <div class="parting"></div>
        <span class="mark"></span>
        <div :class="{active:isActive}" class="description" ref="description">
            一个基于Vue2.0的PC端组件库
        </div>
        <div class="card-group">
            <div class="card-group-item"
                 @mouseenter="compass.play()"
                 @mouseleave="compass.pause()"
            >
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
                    <div class="card-group-item-content-main">
                        包括组件功能、流程使用逻辑、以及友好的API设计
                    </div>
                    <div class="card-group-item-content-more">
                        更多
                        <x-icon color="white" name="right"></x-icon>
                    </div>
                </div>
            </div>
            <div class="card-group-item">
                <div class="card-group-item-title">
                    <svg ref="components" class="stroke" stroke="#1ABC9C" stroke-width="20" viewBox="0 0 1024 1024"
                         width="200" height="240">
                        <path fill="#fafaf1"
                              d="M894.3616 223.0272l-370.688-109.3632c-3.4816-1.024-7.168-1.6384-10.8544-1.6384-3.6864 0-7.168 0.4096-10.6496 1.4336l-351.232 102.4c-4.9152 0.2048-9.4208 1.6384-13.5168 3.8912l-6.5536 1.8432c-16.384 4.7104-27.648 19.6608-27.648 36.864L102.1952 733.184c0 15.9744 9.8304 30.3104 24.7808 36.0448L497.4592 909.312c4.3008 1.6384 9.0112 2.4576 13.5168 2.4576 4.5056 0 9.216-0.8192 13.5168-2.4576l371.5072-138.8544c14.9504-5.5296 24.9856-19.8656 24.9856-35.84l0.8192-474.5216c0-17.2032-11.0592-32.1536-27.4432-37.0688zM529.2032 177.5616l216.064 63.6928c7.168 2.048 7.168 12.288 0.2048 14.5408l-215.6544 68.4032c-11.6736 3.6864-23.9616 3.6864-35.6352 0l-214.8352-69.2224c-7.168-2.2528-6.9632-12.4928 0.2048-14.5408l216.8832-63.0784c10.6496-2.8672 22.1184-2.8672 32.768 0.2048zM185.344 287.5392l284.672 91.5456c7.168 2.2528 12.0832 9.0112 12.0832 16.5888v418.816c0 12.0832-12.0832 20.48-23.552 16.1792L173.2608 722.7392c-6.7584-2.6624-11.264-9.0112-11.264-16.384l0.8192-402.2272c-0.2048-11.8784 11.4688-20.0704 22.528-16.5888z"
                              p-id="4388">
                        </path>
                    </svg>
                </div>
                <div class="card-group-item-content-more">
                    更多
                    <x-icon color="white" name="right"></x-icon>
                </div>
            </div>
            <div class="card-group-item">
                <div class="card-group-item-content-more">
                    更多
                    <x-icon color="white" name="right"></x-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import anime from 'animejs/lib/anime.es'
    import {deepClone} from "../../../../src/utils/common"

    export default {
        name: "card",
        data() {
            return {
                isActive: false,
                compass: {}
            }
        },
        mounted() {
            this.compassInit()
            this.componentsInit()
        },
        methods: {
            compassInit() {
                this.compass = anime({
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
                this.compass.pause()
            },
            componentsInit() {
                let anime = deepClone(anime)
                let path = anime.path('.stroke path')
                this.compass = anime({
                    targets: '.stroke',
                    translateX: path('x'),
                    translateY: path('y'),
                    rotate: path('angle'),
                    easing: 'linear',
                    duration: 2000,
                    loop: true
                })
                this.compass.pause()
            }
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
                position: relative;
                align-items: center;
                width: 300px;
                height: 450px;
                border-radius: 10px;
                transition: .35s all ease;
                cursor: pointer;

                &:first-child {
                    background-color: #27AE60;

                    .card-group-item-title {
                        background-color: #228743;
                    }
                }

                &:not(:first-child) {
                    margin-left: 3rem;
                }

                &:nth-child(2) {
                    background-color: #fac958;

                    .card-group-item-title {
                        background-color: #eebd58;
                    }
                }

                &:nth-child(3) {
                    background-color: #E74c3c;

                    .card-group-item-title {
                        background-color: #E74c3c;
                    }
                }

                &:hover {
                    box-shadow: 3px 0 4px 2px rgba(0, 0, 0, 0.15);
                    transform: scale(1.02);
                }

                &-title {
                    width: 100%;
                    height: 140px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px 10px 0 0;
                }

                &-content {
                    margin-top: 20px;
                    padding: 20px;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    &-header {
                        font-size: 24px;
                    }

                    &-main {
                        padding: 0 10px;
                        margin-top: 20px;
                        font-size: 15px;
                    }

                    &-more {
                        color: white;
                        display: inline-flex;
                        align-items: center;
                        vertical-align: center;
                        position: absolute;
                        right: 30px;
                        bottom: 30px;
                    }
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

        .rotate, .stroke {
            width: 100px;
        }
    }
</style>
