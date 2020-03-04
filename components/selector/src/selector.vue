<template>
    <div
            v-click-outside="xxx"
            ref="reference" :class="selectClass">
        <Input
                :multiple="multiple"
                :width="width"
                :disabled="disabled"
        >
        </Input>
        <dropMenu></dropMenu>
    </div>
</template>

<script>
    import clickOutside from "../../../src/directive/clickoutside"
    import Input from './input'
    import dropMenu from './drop-down'

    export default {
        name: "f-selector",
        directives: {clickOutside},
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
        components: {Input, dropMenu},
        computed: {
            selectClass() {
                return [
                    'f-select'
                ]
            }
        },
        methods: {
            xxx(){
                console.log(1)
            }
        }
    }
</script>
