<template>
    <div
            @mouseenter="handleMouseEnter"
            @mouseleave="cancelIconShow=false"
            :class="inputClass"
            ref="wrapper"
            :disabled="disabled">
        <Icon :class="iconClass" :font-size="iconFontSize" v-if="ownIconShow" :name="icon"></Icon>
        <span :class="surplusBarClass" v-if="maxLengthShow">
                {{this.value.length}}/{{this.maxLength}}
        </span>
        <Icon @click="clearValue"  class="f-input-icon f-input-icon-right f-input-icon-cancel" :font-size="iconFontSize" v-if="cancelIconShow&&clearable" name="wrong"></Icon>
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
                @input="handleInput"
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
               @input="handleInput"
               @change="$emit('change',$event.target.value)"
               @blur="$emit('blur',$event.target.value)"
               @focus="$emit('focus',$event.target.value)"
        >
    </div>

</template>

<script>
    import Icon from '../../icon/src/icon'
    import {isNumber, isString} from "../../../src/utils/type-of"

    export default {
        name: "f-input",
        components: {
            Icon
        },
        data() {
            return {
                cancelIconShow: false
            }
        },
        computed: {
            iconFontSize(){
                if(this.size==='large')return '18px'
                if(this.size==='normal')return '16px'
                if(this.size==='small')return '14px'
            },
            ownIconShow(){
                return this.clearable?!(this.icon&&this.cancelIconShow&&this.iconPosition==='right'):this.icon
            },
            maxLengthShow() {
                return this.showLimit && this.iconPosition!=='right' && !this.cancelIconShow
            },
            inputStyle() {
                let style = {}
                let {width} = this
                if (isNumber(width)) {
                    style.width = width + 'px'
                } else if (isString(width)) {
                    style.width = width
                }
                return style
            },
            inputClass() {
                let positionClass = this.icon && this.iconPosition ? `f-input-has-icon-${this.iconPosition}` : ''
                let sizeClass
                if(this.size!=='normal'){
                  sizeClass = `f-input-${this.size}`
                }
                return [
                    'f-input',
                    positionClass,
                    sizeClass
                ]
            },
            surplusBarClass() {
                return [
                    'f-input-surplus-bar',
                    {
                        'f-input-surplus-bar-textarea': this.type === 'textarea',
                        'f-input-surplus-bar-disabled': this.disabled
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
            size:{
              type:String,
              default:'normal',
              validator:val=>['normal','large','small'].indexOf(val)>-1
            },
            rows: {
                type: Number,
                default: 2
            },
            clearable: {
                type: Boolean,
                default: false
            },
            spellcheck: {
                type: Boolean,
                default: false
            },
            wrap: {
                validator: (val) => ['hard', 'soft'].indexOf(val) > -1,
                default: 'soft'
            },
            autocomplete: {
                type: String,
                default: 'off'
            },
            showLimit: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'text',
                validator: val => ['text', 'textarea'].indexOf(val) > -1
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
        methods: {
            clearValue(){
                let val = this.value
                this.$emit('input','')
                this.$emit('on-cancel',val)
            },
            handleMouseEnter(){
                if(!this.clearable)return
                if(this.value)this.cancelIconShow= true
            },
            handleInput(e){
                let {value} = e.target
                this.$emit('input',value)
                if(value&&this.clearable)this.cancelIconShow = true
            }
        },
        watch:{
            value(){
                if(!this.value)this.cancelIconShow= false
            }
        }
    }
</script>
