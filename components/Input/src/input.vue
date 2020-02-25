<template>
    <div :class="inputClass" ref="wrapper" :disabled="disabled">
        <Icon :class="iconClass" font-size="18px" v-if="icon" :name="icon"></Icon>
        <span :class="surplusBarClass" v-if="showSurplus&&!icon">
                {{this.value.length}}/{{this.maxLength}}
        </span>
        <textarea
                class="f-form-placeholder"
                v-if="type==='textarea'"
                name=""
                :id="id"
                :name="name"
                :autocomplete="autocomplete"
                :spellcheck="spellcheck"
                :rows="rows"
                :value="value"
                :disabled="disabled"
                :readonly="readonly"
                :maxlength="maxLength"
                :placeholder="placeholder"
                @input="$emit('input',$event.target.value)"
                @change="$emit('change',$event.target.value)"
                @blur="$emit('blur',$event.target.value)"
                @focus="$emit('focus',$event.target.value)"
        >

        </textarea>
        <input v-else type="text"
               :style="inputStyle"
               class="f-form-placeholder"
               :id="id"
               :name="name"
               :autocomplete="autocomplete"
               :spellcheck="spellcheck"
               :wrap="wrap"
               :value="value"
               :disabled="disabled"
               :readonly="readonly"
               :maxlength="maxLength"
               :placeholder="placeholder"
               @input="$emit('input',$event.target.value)"
               @change="$emit('change',$event.target.value)"
               @blur="$emit('blur',$event.target.value)"
               @focus="$emit('focus',$event.target.value)"
        >
    </div>

</template>

<script>
    import Icon from '../../icon/src/icon'
    import {isNumber,isString} from "../../../src/utils/type-of"

    export default {
        name: "f-input",
        components: {
            Icon
        },
        computed: {
            inputStyle() {
                let style = {}
                let {width} = this
                if(isNumber(width)){
                    style.width = width +'px'
                }else if(isString(width)){
                    style.width = width
                }
                return style
            },
            inputClass() {
                let positionClass = this.icon && this.iconPosition ? `f-input-has-icon-${this.iconPosition}` : ''
                return [
                    'f-input',
                    positionClass
                ]
            },
            surplusBarClass(){
              return [
                  'f-input-surplus-bar',
                  {
                      'f-input-surplus-bar-textarea':this.type==='textarea',
                      'f-input-surplus-bar-disabled':this.disabled
                  }
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
            id: String,
            name: String,
            width: Number | String,
            value: String,
            maxLength: Number,
            placeholder: String,
            rows: {
                type: Number,
                default: 2
            },
            spellcheck: {
                type: Boolean,
                default: false
            },
            wrap: {
                validator :(val) =>['hard', 'soft'].indexOf(val)>-1,
                default: 'soft'
            },
            autocomplete: {
                type: String,
                default: 'off'
            },
            showSurplus: {
                type: Boolean,
                default: false
            },
            type:{
                type:String,
                default:'text',
                validator:val=>['text','textarea'].indexOf(val)>-1
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
