<template>
    <div class="f-popover"
         ref="popover"
         v-element-position-detector="setPopover"
         v-click-outside="clickCloseAll"
    >
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
        >
            <div ref="contentWrapper"
                 :class="wrapperClass"
                 @mouseenter="hoverInOPen"
                 @mouseleave="hoverOutAndClose"
                 :style="{width:this.width+'px'}"
                 v-show="visible">
                <div class="f-popover-content-title" v-if="title||$slots.title">
                    <Icon class="f-popover-content-title-icon" v-if="titleIcon&&!confirm" :color="titleIconColor"
                          font-size="16px" :name="titleIcon"></Icon>
                    <Icon class="f-popover-content-title-icon" v-if="confirm" :color="titleIconColor" font-size="16px"
                          :name="titleIcon||'gantan'"></Icon>
                    <span v-if="title">{{title}}</span>
                    <slot name="title" v-else></slot>
                </div>
                <div :class="{'f-popover-has-icon':titleIcon||confirm}">
                    <div v-if="content">{{content}}</div>
                    <slot v-else name="content"></slot>
                </div>
                <div class="f-popover-content-footer" v-if="confirm">
                    <Button @click="clickCancel" type="text" size="mini">取消</Button>
                    <Button :loading="confirmLoading" @click="clickConfirm" size="mini" type="primary">确定</Button>
                </div>
                <div v-else class="f-popover-content-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </transition>
        <span ref="trigger" style="display: inline-block">
            <slot></slot>
        </span>
    </div>
</template>

<script>

    import {on, off} from "../../../src/utils/dom"
    import Button from '../../button'
    import Icon from '../../icon'
    import clickOutside from "../../../src/directive/clickoutside"
    import elementPositionDetector from "../../../src/directive/elementPositionDetector"
    import {setPopoverPosition} from "../../../src/utils/set-position"

    export default {
        name: "f-popover",
        components: {Button, Icon},
        directives: {clickOutside, elementPositionDetector},
        model: {
            prop: 'visibleProps',
            event: 'change'
        },
        computed: {
            wrapperClass() {
                return [
                    `position-${this.position}`,
                    'f-popover-content-wrapper',
                    {
                        'f-popover-content-slot-is-exist': this.$slots.content
                    }
                ]
            }
        },
        data() {
            return {
                outClick: false,
                visible: false,
                confirmLoading: false,
            }
        },
        mounted() {
            this.addEventListener()
        },
        beforeDestroy() {
            this.removeAll()
        },
        props: {
            position: {
                type: String,
                default: 'top',
                validator: (val) => ['top', 'top-start', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end'].indexOf(val) > -1
            },
            beforeConfirm: Function,
            content: String,
            title: String,
            titleIcon: String,
            confirmTimeout: {
                type: Number,
                validator: val => val > 0
            },
            titleIconColor: {
                type: String,
                default: '#ffb311'
            },
            confirm: {
                type: Boolean,
                default: false
            },
            width: Number | String,
            trigger: {
                type: String,
                default: 'click',
                validator: (val) => ['click', 'hover', 'focus'].indexOf(val) > -1
            },
            visibleProps: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            removeAll() {
                let {popover, contentWrapper} = this.$refs
                this.event[this.trigger].event.forEach(eventName => off(popover, eventName, this.event[this.trigger].fn))
                this.$el.remove()
                contentWrapper.remove()
                clearTimeout(this.timer)
            },
            setPopover() {
                if (!this.visible) return
                const {contentWrapper, trigger} = this.$refs
                setPopoverPosition(this,trigger,contentWrapper)
            },
            addEventListener() {
                let {popover} = this.$refs
                this.event = {
                    click: {event: ['click'], fn: this.onClick},
                    hover: {event: ['mouseenter', 'mouseleave'], fn: this.hoverToggle},
                    focus: {event: ['mousedown', 'mouseup'], fn: this.focusToggle},
                }
                this.event[this.trigger].event.forEach(eventName => on(popover, eventName, this.event[this.trigger].fn))
            },
            hoverOutAndClose() {
                clearTimeout(this.timer)
                if (this.trigger !== 'hover') return
                this.timer = setTimeout(() => this.visible = false, 120)
            },
            hoverInOPen() {
                clearTimeout(this.timer)
                if (this.outClick || this.trigger !== 'hover') return
                this.visible = true
            },
            clickCloseAll(e) {
                if(this.confirmLoading) return
                if (this.$refs.contentWrapper&&this.$refs.contentWrapper.contains(e.target)) return
                this.visible = false
            },
            clickToggle() {
                if (this.confirmLoading) return
                this.visible = !this.visible
                if (this.visible) {
                    this.$nextTick(() => this.setPopover())
                }
            },
            hoverToggle(e) {
                clearTimeout(this.timer)
                this.outClick = false
                if (e.type === 'mouseenter') {
                    this.visible = true
                    this.$nextTick(() => this.setPopover())
                } else {
                    this.timer = setTimeout(() => this.visible = false, 120)
                }
            },
            focusToggle(e) {
                this.visible = e.type === 'mousedown'
                this.setPopover()
            },
            onClick(e) {
                if (this.trigger !== 'click') return
                if (this.$refs.trigger.contains(e.target)) {
                    this.clickToggle()
                }
            },

            beforeEnter(el) {
                this.$refs.contentWrapper.style.overflow = ''
                el.style.opacity = 0
            },
            enter(el) {
                setTimeout(() => el.style.opacity = 1, 30)
            },
            leave(el) {
                el.style.opacity = 0
            },
            beforeLeave(el) {
                el.style.opacity = 1
            },
            afterLeave() {
                this.confirmLoading = this.outClick = false
                if (this.$refs.contentWrapper) {
                    this.$refs.contentWrapper.style.overflow = ''
                }
            },
            clickCancel(e) {
                if (this.confirmLoading) return
                this.visible = false
                this.$emit('on-cancel', e)
            },
            clickConfirm(e) {
                if (this.beforeConfirm) {
                    this.confirmLoading = true
                    let racePromise = [Promise.resolve(this.beforeConfirm())]
                    if (this.confirmTimeout) racePromise.push(new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject('time out')
                        }, this.confirmTimeout)
                    }))
                    Promise.race(racePromise).then(res => {
                        this.visible = false
                        this.$emit('on-confirm-success', e, res)
                    }).catch(err => {
                        this.confirmLoading = false
                        this.$emit(err === 'time out' ? 'on-confirm-timeOut' : 'on-confirm-failed', e, err)
                    }).finally(() => {
                        this.$emit('on-confirm', e)
                    })
                } else {
                    this.visible = false
                    this.$emit('on-confirm', e)
                }
            }
        },
        watch: {
            visible() {
                if (this.visible !== this.visibleProps) {
                    this.$emit('change', this.visible)
                }
            },
            visibleProps() {
                if (this.visible !== this.visibleProps) {
                    this.visible = this.visibleProps
                }
            }
        }
    }
</script>
