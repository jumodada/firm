<style lang="scss">

    .demo-card-wrapper {
        width: 60vw;
        position: relative;
        margin-left: 21px;
        display: inline-flex;
        flex-direction: column;
        border: 1px solid #e2e2e2;
        border-radius: 5px;

        .demo-card-source {
            padding: 33px 23px;


            .f-button-group {
                button {
                    margin-left: 0;
                    margin-right: 0;
                }
            }

            .row {
                margin-top: 15px;
            }
        }

        .demo-card-tip {
            top: 10px;
            right: 10px;
        }
        .demo-card-drop {
            height: 40px;
            width: 100%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .3s transform ease-in-out;

            &:hover {
                transform: translateY(7px);
            }

            &-icon {
                transition: .23s transform ease;
            }

            &-down {
                transition: .23s all ease-in-out;
                width: 100%;
                padding: 10px;
            }
        }

        .demo-card-description {
            padding: 10px 10px 10px 20px;
            color: #1a2a3a;

            code {
                color: #1a2a3a;
                background-color: #ffecd9;
                margin: 0 4px;
                display: inline-block;
                padding: 2px 5px;
                font-size: 15px;
                border-radius: 4px;
            }
        }

        .icon-reverse {
            transform: rotate(180deg);

            &:hover {
                transform: rotate(180deg) translateY(7px) !important;
            }
        }
    }
    .demo-card-tip-content {
        color: #ff6666;
        font-size: 13px;
    }
    .button{
        button {
            margin-left: 5px;
            margin-right: 5px;
        }
    }
</style>


<template>
    <div class="demo-card-wrapper">
        <div :class="{button:$route.name==='button'}" class="demo-card-source">
            <slot name="source"></slot>
        </div>
        <f-popover position="top" class="demo-card-tip">
            <f-icon v-if="tipShow" color="#F1453D" name="gantan"></f-icon>
            <div class="demo-card-tip-content" slot="content">
               {{tip}}
            </div>
        </f-popover>
        <div class="demo-card-description">
            <slot></slot>
        </div>
        <transition @before-enter="beforeEnter"
                    @enter="enter"
                    @before-leave="beforeLeave"
                    @leave="leave">
            <div class="demo-card-drop-down" v-show="dropDownShow">
                <slot name="highlight"></slot>
            </div>
        </transition>
        <div :class="{'icon-reverse':dropDownShow}" class="demo-card-drop" @click="dropDownShow=!dropDownShow">
            <f-icon class="demo-card-drop-icon"
                    name="xia" color="#B1B1B1"></f-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'demo-card',
        data() {
            return {
                dropDownShow: false,
                tipShow: false,
                tip: ''
            }
        },
        methods: {
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
        },
        mounted() {
            let {innerText} = this.$slots.default[0].elm
            let arr = innerText.split('/')
            if (arr.length === 3) {
                this.$slots.default[0].elm.innerText = arr[0]
                this.tipShow = true
                this.tip = arr[1]
            }
        }
    }
</script>
