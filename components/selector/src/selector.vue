<template>
    <div
            tabindex="0"
            class="f-select-input"
            v-click-outside="clickOutside"
            ref="reference"
            @click="toggleDrop"
            v-element-position-detector="setDrop"
            :class="selectClass">
        <Input
                ref="input"
                :multiple="multiple"
                :width="width"
                :disabled="disabled"
        >
        </Input>
        <transition name="drop">
            <dropMenu ref="drop" v-show="visible"></dropMenu>
        </transition>
    </div>
</template>

<script>
    import clickOutside from "../../../src/directive/clickoutside"
    import Input from './input'
    import dropMenu from './drop-down'
    import elementPositionDetector from "../../../src/directive/elementPositionDetector"
    import {setPopoverPosition} from "../../../src/utils/set-position"

    export default {
        name: "f-selector",
        directives: {clickOutside, elementPositionDetector},
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
                default: 200
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: false
            }
        },
        components: {Input, dropMenu},
        computed: {
            selectClass() {
                return [
                    'f-select'
                ]
            }
        },
        methods: {
            clickOutside(e) {
                if (this.$refs.drop.$el.contains(e.target)) return
                this.visible = false
            },
            toggleDrop() {
                this.visible = !this.visible
                if (this.visible) this.$nextTick(() => this.setDrop())
            },
            setDrop() {
                if (!this.visible) return
                const {drop, reference} = this.$refs
                setPopoverPosition(this, reference, drop.$el)
            },
        }
    }
</script>
