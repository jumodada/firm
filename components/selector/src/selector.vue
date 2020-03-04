<template>
    <div  ref="reference" :class="selectClass">
        <Input
                :multiple="multiple"
                :width="width"
                :disabled="disabled"
        >

        </Input>
    </div>
</template>

<script>
    import Input from './input'
    export default {
        name: "f-selector",
        props:{
            multiple:{
                type:Boolean,
                default:false
            },
            width:{
                type:Number,
                default: 200
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        components:{
            Input
        },
        computed:{
            selectClass(){
                return [
                    'f-select'
                ]
            }
        },
        methods:{

        }
    }
</script>
