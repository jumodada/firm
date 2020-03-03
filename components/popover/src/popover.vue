<template>
    <div class="f-popover"
         ref="popover"
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
    import {getAllScrollParents} from "../../../src/utils/window"
    import Button from '../../button'
    import Icon from '../../icon'

    export default {
        name: "f-popover",
        components: {Button, Icon},
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
                type:Number,
                validator:val=>val>0
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
                if (!this.scrollParents) this.scrollParents = getAllScrollParents(this.$refs.popover)
                this.scrollParents.forEach(node => {
                    if (node) node.removeEventListener('scroll', () => this.contentPosition())
                })
                window.removeEventListener('resize', () => this.contentPosition())
                this.$el.remove()
                contentWrapper.remove()
                clearTimeout(this.timer)
            },
            contentPosition() {
                if (!this.visible) return
                const {contentWrapper, trigger} = this.$refs;
                if (contentWrapper.parentElement.nodeName.toLowerCase() !== 'body') {
                    document.body.appendChild(contentWrapper)
                }
                let {top, left, height, width} = trigger.getBoundingClientRect()
                this.setPosition(contentWrapper, top, left, width, height)
                this.$nextTick(() => this.setTransform(contentWrapper, height, width))
            },
            setTransform($el, height, width) {
                let contentWidth = $el.clientWidth
                let contentHeight = $el.clientHeight
                let widthDiffer = -(Number(contentWidth) - width)
                let heightDiffer = -(Number(contentHeight) - height)
                let transform = {
                    'top-start': `translate(0,-100%)`,
                    top: `translate(${widthDiffer / 2}px,-100%)`,
                    'top-end': `translate(calc(-100% + ${width}px),-100%)`,
                    'left-start': `translate(-100%,0)`,
                    left: `translate(-100%,${heightDiffer / 2}px)`,
                    'left-end': `translate(-100%,${heightDiffer}px)`,
                    'bottom-start': `translate(-${width}px,0)`,
                    bottom: `translate(calc(${-(width + contentWidth) / 2 + 'px'}),0)`,
                    'bottom-end': `translate(-${contentWidth}px,0)`,
                    'right-start': `translate(0,0)`,
                    right: `translate(0,${heightDiffer / 2}px)`,
                    'right-end': `translate(0,${heightDiffer}px)`
                }
                $el.style.transform = transform[this.position]
            },
            setPosition($el, top, left, width, height) {
                let _tTop, _rTop, _tLeft, _rLeft
                _tTop = top + window.scrollY
                _rTop = top + height + window.scrollY
                _tLeft = left + window.scrollX
                _rLeft = left + width + window.scrollX
                let _position = this.position.split('-')[0]
                let position = {
                    top: {top: _tTop, left: _tLeft},
                    left: {top: _tTop, left: _tLeft},
                    bottom: {top: _rTop, left: _rLeft},
                    right: {top: _tTop, left: _rLeft}
                }
                Array.from(['left', 'top']).forEach(attr => $el.style[attr] = position[_position][attr] + 'px')
            },
            addEventListener() {
                let {popover} = this.$refs
                this.event = {
                    click: {event: ['click'], fn: this.onClick},
                    hover: {event: ['mouseenter', 'mouseleave'], fn: this.hoverToggle},
                    focus: {event: ['mousedown', 'mouseup'], fn: this.focusToggle},
                }
                this.scrollParents = getAllScrollParents(this.$refs.popover)
                this.scrollParents.forEach(node => node.addEventListener('scroll', () => this.contentPosition()))
                window.addEventListener('resize', () => this.contentPosition())
                this.event[this.trigger].event.forEach(eventName => on(popover, eventName, this.event[this.trigger].fn))
            },
            listenToDocument() {
                on(document, 'click', this.eventHandler)
            },
            removeListener() {
                off(document, 'click', this.eventHandler)
            },

            isConWrapper(e) {    //判断点击的地方是否在contentWrapper里面
                let path = e.path || e.composedPath()
                return path.some(child => child === this.$refs.contentWrapper)
            },
            isPopover(e) {    //判断点击的地方是否在contentPopover里面
                let path = e.path || e.composedPath()
                return path.some(child => child === this.$refs.popover)
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
            clickCloseAll() {
                this.visible = false
                this.removeListener()
            },
            eventHandler(e) {
                if (this.confirmLoading) return
                if (this.isPopover(e) || this.isConWrapper(e)) return
                if (!this.isConWrapper(e) && this.$refs.popover && !(this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) {
                    this.clickCloseAll()
                }
            },
            clickToggle() {
                if (this.confirmLoading) return
                this.visible = !this.visible
                if (this.visible) {
                    this.$nextTick(() => {
                        this.contentPosition()
                        this.listenToDocument()
                    })
                } else {
                    this.removeListener()
                }
            },
            hoverToggle(e) {
                clearTimeout(this.timer)
                this.outClick = false
                if (e.type === 'mouseenter') {
                    this.visible = true
                    this.$nextTick(() => this.contentPosition())
                } else {
                    this.timer = setTimeout(() => this.visible = false, 120)
                }
            },
            focusToggle(e) {
                this.visible = e.type==='mousedown'
                this.contentPosition()
            },
            onClick() {
                if (this.trigger !== 'click') return
                if (this.$refs.trigger.contains(event.target)) {
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
                    if(this.confirmTimeout)racePromise.push(new Promise((resolve, reject) => {
                        setTimeout(()=>{
                            reject('time out')
                        },this.confirmTimeout)
                    }))
                    Promise.race(racePromise).then(res => {
                        this.visible = false
                        this.$emit('on-confirm-success', e, res)
                    }).catch(err=>{
                        this.confirmLoading = false
                        this.$emit(err ==='time out'?'on-confirm-timeOut':'on-confirm-failed', e, err)
                    }).finally(()=>{
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
