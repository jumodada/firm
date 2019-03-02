<template>
<div class="wrapper" ref="wrapper" :disabled="disabled">
    <input type="text"
           style="width: 300px"
           :value="value"
           :disabled="disabled"
           :readonly="readonly"
           :class="{error:error}"
           @input="$emit('input',$event.target.value)"
           @change="$emit('change',$event.target.value)"
           @blur="$emit('blur',$event.target.value)"
           @focus="$emit('focus',$event.target.value)"
           ref="input"

    >
    <xIcon v-if="error" name="gantan" color="#F1453D"></xIcon>
    <div class="cloak" v-if="disabled" ref="cloak"></div>
    <span v-if="error" :class="{errorMessage:error}">{{error}}</span>
</div>

</template>

<script>
    import xIcon from './icon'
    export default {
        name: "Input",
        components:{
            xIcon
        },
        props:{
            value:{
                type:String,

            },
            disabled:{
                type:Boolean,
                default:false
            },
            readonly:{
                type:Boolean,
                default:false
            },
            error:{
                type:String,
                validator(val){
                    if(val.length>10)return console.error('不能多于十个字')
                    return true
                }
            }
        },
        mounted(){
            if(this.disabled){
                 this.$refs.cloak.style.width = getComputedStyle(this.$refs.wrapper).width
            }

        }
    }
</script>

<style scoped lang="scss">
      $height:32px;
      $border-color:#999;
      $border-color-hover:#666;
      $font-size:12px;
      $box-shadow-color:rgba(0,0,0,0.5);
      $red:#F1453D;

      .wrapper{
          font-size: $font-size;
          display: inline-flex;
          align-items: center;
          > :not(:last-child){
              margin-right: .3em;
          }
          .cloak{
              position: absolute;
              height: $height;
              width: 120px;
              z-index: 2;
              opacity: 0;
          }
          > input{
              height: $height;
              border:1px solid $border-color;
              padding: 0 8px;
              font-size: inherit;

              &:hover{
                  border-color: $border-color-hover;
              }
              &:focus{
                  box-shadow: inset 0 1px 3px $box-shadow-color;
                  outline: none;
              }
              &[disabled]{
                  border-color: #ccc;
                  color:#ccc;
                  cursor: not-allowed;
                  pointer-events: none;
              }
              &.error{
                  border-color: $red;

              }

          }
          &[disabled]{
                cursor: not-allowed;
          }
          .errorMessage{
              color: $red;
          }
      }



</style>
