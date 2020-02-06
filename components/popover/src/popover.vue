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
            <div ref="contentWrapper" class="content-wrapper"
                 :class="[[`position-${position}`],themeStyle]"
                 @mouseenter="hoverInOPen"
                 @mouseleave="hoverOutAndClose"
                 v-show="visible">
                <div class="contentSlot" ref="contentSlot">
                    <slot name="content" :close="outerClick"></slot>
                </div>
            </div>
        </transition>
        <span ref="trigger"
              style="display: inline-block">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "x-popover",
        data() {
            return {
                visible: false,
                outClick: false
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
                validator:(val) =>['top', 'topLeft', 'topRight', 'bottomLeft', 'bottom', 'bottomRight', 'leftTop', 'left', 'leftBottom', 'rightTop', 'right', 'rightBottom'].indexOf(val) > -1
            },
            trigger: {
                type: String,
                default: 'click',
                validator:(val)=>['click', 'hover', 'focus'].indexOf(val) > -1
            },
            theme: {
                type: String,
                default: 'blackBorder',
                validator:(val)=>['blackBorder', 'whiteBg'].indexOf(val) > -1
            },
        },
        computed: {
            themeStyle() {
                if (this.theme === 'whiteBg') {
                    return 'theme2'
                }
            }
        },
        methods: {
            removeAll() {
                let {popover, contentWrapper} = this.$refs
                this.event[this.trigger].event.forEach(eventName => popover.removeEventListener(eventName, this.event[this.trigger].fun))
                this.$el.remove()
                contentWrapper.remove()
                clearTimeout(this.timer)
            },
            contentPosition() {
                const {contentWrapper, trigger} = this.$refs
                document.body.appendChild(contentWrapper)
                let {top, left, height, width} = trigger.getBoundingClientRect()
                let contentWidth = contentWrapper.clientWidth
                let contentHeight = contentWrapper.clientHeight
                let widthDiffer = -(Number(contentWidth) - width)
                let heightDiffer = -(Number(contentHeight) - height)
                let position = {
                    topLeft: {
                        top: top + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(0,-100%)`
                    },
                    top: {
                        top: top + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(${widthDiffer / 2}px,-100%)`
                    },
                    topRight: {
                        top: top + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(calc(-100% + ${width}px),-100%)`
                    },
                    leftTop: {
                        top: top + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(-100%,0)`
                    },
                    left: {
                        top: top + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(-100%,${heightDiffer / 2}px)`
                    },
                    leftBottom: {
                        top: top + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(-100%,-50%)`
                    },
                    bottomLeft: {
                        top: top + height + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(0,0)`
                    },
                    bottom: {
                        top: top + height + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(${widthDiffer / 2}px,0)`
                    },
                    bottomRight: {
                        top: top + height + window.scrollY,
                        left: left + window.scrollX,
                        transition: `translate(calc(-100% + ${width}px),0)`
                    },
                    rightTop: {
                        top: top + window.scrollY,
                        left: left + width + window.scrollX,
                        transition: `translate(0,0)`
                    },
                    right: {
                        top: top + window.scrollY,
                        left: left + width + window.scrollX,
                        transition: `translate(0,${heightDiffer / 2}px)`
                    },
                    rightBottom: {
                        top: top + window.scrollY,
                        left: left + width + window.scrollX,
                        transition: `translate(0,-50%)`
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
                        fun: this.onClick
                    },
                    hover: {
                        event: ['mouseenter', 'mouseleave'],
                        fun: this.hoverToggle
                    },
                    focus: {
                        event: ['click'],
                        fun: this.focusToggle
                    }
                }
                this.event[this.trigger].event.forEach(eventName => popover.addEventListener(eventName, this.event[this.trigger].fun))
            },
            listenToDocument() {
                document.addEventListener('click', this.eventHandler)
            },
            removeListener() {
                document.removeEventListener('click', this.eventHandler)
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
    }
</script>

<style scoped lang="scss">
    @import "popover";
</style>
