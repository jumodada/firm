<template>
    <div class="popover"
         ref="popover"
    >
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
        >
            <div ref="contentWrapper" class="f-popover-content-wrapper"
                 :class="[[`position-${position}`]]"
                 @mouseenter="hoverInOPen"
                 @mouseleave="hoverOutAndClose"
                 v-show="visible">
                <div class="contentSlot" ref="contentSlot">
                    <slot name="content" :close="outerClick"></slot>
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

    export default {
        name: "f-popover",
        model: {
            prop: 'visibleProps',
            event: 'change'
        },
        data() {
            return {
                outClick: false,
                visible: false
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
                validator: (val) => ['top', 'topStart', 'topEnd', 'bottomStart', 'bottom', 'bottomEnd', 'leftStart', 'left', 'leftEnd', 'rightStart', 'right', 'rightEnd'].indexOf(val) > -1
            },
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
            contentPosition() {
                const {contentWrapper, trigger} = this.$refs;
                if(contentWrapper.parentElement.nodeName.toLowerCase()!=='body'){
                    document.body.appendChild(contentWrapper)
                }
                let {top, left, height, width} = trigger.getBoundingClientRect()
                let contentWidth = contentWrapper.clientWidth
                let contentHeight = contentWrapper.clientHeight
                let widthDiffer = -(Number(contentWidth) - width)
                let heightDiffer = -(Number(contentHeight) - height)
                console.log(left,width,contentWidth)
                let _tTop, _rTop, _tLeft, _rLeft
                _tTop = top + window.scrollY
                _rTop = top + height + window.scrollY
                _tLeft =  left + window.scrollX
                _rLeft = left + width + window.scrollX
                let position = {
                    topStart: {
                        top: _tTop,
                        left: _tLeft,
                        transition: `translate(0,-100%)`
                    },
                    top: {
                        top: _tTop,
                        left: _tLeft,
                        transition: `translate(${widthDiffer/2}px,-100%)`
                    },
                    topEnd: {
                        top: _tTop,
                        left: _tLeft,
                        transition: `translate(calc(-100% + ${width}px),-100%)`
                    },
                    leftStart: {
                        top: _tTop,
                        left: _tLeft,
                        transition: `translate(-100%,0)`
                    },
                    left: {
                        top: _tTop,
                        left: _tLeft,
                        transition: `translate(-100%,${heightDiffer / 2}px)`
                    },
                    leftEnd: {
                        top: _tTop,
                        left: _tLeft,
                        transition: `translate(-100%,${heightDiffer}px)`
                    },
                    bottomStart: {
                        top: _rTop,
                        left: _rLeft,
                        transition:`translate(-${width}px,0)`
                    },
                    bottom: {
                        top: _rTop,
                        left: _rLeft,
                        transition: `translate(calc(${-(width+contentWidth)/2+'px'}),0)`
                    },
                    bottomEnd: {
                        top: _rTop,
                        left: _rLeft,
                        transition: `translate(-${contentWidth}px,0)`
                    },
                    rightStart: {
                        top: _tTop,
                        left: _rLeft,
                        transition: `translate(0,0)`
                    },
                    right: {
                        top: _tTop,
                        left: _rLeft,
                        transition: `translate(0,0)`
                    },
                    rightEnd: {
                        top: _tTop,
                        left: _rLeft,
                        transition: `translate(0,0)`
                    }

                }
                Array.from(['left', 'top']).forEach(attr => contentWrapper.style[attr] = position[this.position][attr] + 'px')
                contentWrapper.style.transform = position[this.position].transition
            },
            addEventListener() {
                let {popover} = this.$refs
                this.event = {
                    click: {
                        event: ['click'],
                        fn: this.onClick
                    },
                    hover: {
                        event: ['mouseenter', 'mouseleave'],
                        fn: this.hoverToggle
                    },
                    focus: {
                        event: ['click'],
                        fn: this.focusToggle
                    }
                }
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
            outerClick() {
                this.outClick = true
                this.visible = false
            },
            clickCloseAll() {
                this.visible = false
                this.removeListener()
            },
            eventHandler(e) {
                if (this.isPopover(e) || this.isConWrapper(e)) return
                if (!this.isConWrapper(e) && this.$refs.popover && !(this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) {
                    this.clickCloseAll()
                }
            },
            clickToggle() {
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
            focusToggle() {
                let judge = this.$refs.trigger.children[0] === document.activeElement
                if (judge) {
                    this.visible = true
                    this.$nextTick(() => {
                        this.contentPosition()
                        this.listenToDocument()
                    })
                } else {
                    this.removeListener()
                }
            },
            onClick() {
                if (this.trigger !== 'click') return
                if (this.$refs.trigger.contains(event.target)) {
                    this.clickToggle()
                }
            },

            beforeEnter(el) {
                this.$refs.contentSlot.style.overflow = ''
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
                this.$refs.contentSlot.style.overflow = 'hidden'
            },
            afterLeave() {
                this.outClick = false
                if (this.$refs.contentSlot) {
                    this.$refs.contentSlot.style.overflow = ''
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
