<template>
    <div :class="inputClass" ref="wrapper" :disabled="disabled">
        <Icon :class="iconClass"  font-size="18px" v-if="icon" :name="icon"></Icon>
        <input type="text"
               class="f-form-placeholder"
               :value="value"
               :disabled="disabled"
               :readonly="readonly"
               :maxlength="maxLength"
               :placeholder="placeholder"
               @input="$emit('input',$event.target.value)"
               @change="$emit('change',$event.target.value)"
               @blur="$emit('blur',$event.target.value)"
               @focus="$emit('focus',$event.target.value)"
               ref="input"

        >
        <span class="f-input-surplus-bar" v-if="showSurplus&&!icon">
                {{this.value.length}}/{{this.maxLength}}
        </span>
    </div>

</template>

<script>
    import Icon from '../../icon/src/icon'

    export default {
        name: "f-input",
        components: {
            Icon
        },
        computed: {
            inputClass() {
                let positionClass = this.icon && this.iconPosition?`f-input-has-icon-${this.iconPosition}`:''
                return [
                    'f-input',
                    positionClass
                ]
            },
            iconClass() {
              return [
                  'f-input-icon',
                  `f-input-icon-${this.iconPosition}`
              ]
            }
        },
        props: {
            value: String,
            maxLength: Number,
            placeholder: String,
            showSurplus:{
              type:Boolean,
              default:false
            },
            icon: String,
            iconPosition: {
                type: String,
                default: 'left',
                validator: val => ['left', 'right'].indexOf(val) > -1
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
        },
        methods: {}
    }
</script>
