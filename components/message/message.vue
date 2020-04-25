<template>
    <div class="f-message" ref="toast" :class="[toastClass,typeSelect]">
        <f-icon class="f-message-icon" v-if="type" :name="type" font-size="16px">
        </f-icon>
        <div class="f-message-text">
            <slot v-if="!enableHTML"></slot>
            <div v-else v-html="$slots.default[0]"></div>
        </div>
        <span v-if="closeButtonShow" class="f-message-close" @click="onClickClosed">
        <div v-if="closeButton.text &&!closeButton.closeIcon">
            {{closeButton.text}}
        </div>
         <f-icon class="f-message-close-icon" v-if="closeButton.closeIcon"
                 :name="closeButton.closeIcon"
                 font-size="16px"
                 :style="typeStyle"
         >
        </f-icon>
    </span>
    </div>
</template>

<script>
    import Icon from '../icon/src/icon'

    export default {
        name: "toast",
        components: {
            'f-icon': Icon
        },
        props: {
            type: {
                type: String,
                validator(val) {
                    return ['success', 'warn', 'error'].indexOf(val) > -1
                }
            },
            autoClosed: {
                type: [Boolean, Number],
                default: 2,
                validator(val) {
                    return val === false || typeof val === 'number'
                }
            },
            closeButtonShow: {
                type: Boolean,
                default: false
            },
            closeButton: {
                type: Object,
                default: () => {
                    return {
                        text: null,
                        closeIcon: 'wrong',
                        callback: () => {

                        }
                    }
                },

                validator(val) {
                    let judge = ['wrong', 'correct'].indexOf(val.closeIcon) > -1
                    if (!val.text && !val.closeIcon) return console.error('至少设置一项')
                    if (val.text && val.text.length > 5) return console.error('不能输入超过5个字')
                    if (judge) return true
                    return false
                }
            },
            enableHTML: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'top',
                validator(val) {
                    return ['top', 'bottom', 'center'].indexOf(val) > -1
                }
            },
        },
        mounted() {
            this.exeAutoClosed()
        },
        computed: {
            typeSelect() {
                if (!this.type) return
                return `type-${this.type}`
            },
            typeStyle() {
                if (!this.type) return
                let typeColor = {
                    success: 'fill:#17cc15;',
                    warn: 'fill:#ffb311;',
                    error: 'fill:#F1453D;'
                }
                return typeColor[this.type]
            },
            toastClass() {
                return `position-${this.position}`
            }
        },
        methods: {
            exeAutoClosed() {
                if (this.autoClosed) {
                    setTimeout(() => {
                        this.close()
                    }, this.autoClosed * 1000)
                }
            },

            leaveActive() {
                let {bottom, height, top} = this.$el.getBoundingClientRect()
                let $el = this.$el.style
                let position = this.position
                if (position === 'top') {
                    $el.top = `${top - height}px`
                } else if (position === 'bottom') {
                    $el.top = `${bottom + height}px`
                } else if (position === 'center') {
                    $el.opacity = 0
                }
            },
            close() {
                this.leaveActive()
                setTimeout(() => {
                    this.$el.remove()
                    this.$emit('close')
                    this.$destroy()
                }, 450)
            },
            onClickClosed() {
                this.close()
                if (this.closeButton && typeof this.closeButton.callback === 'function') {
                    this.closeButton.callback()
                }
            }
        }

    }
</script>
