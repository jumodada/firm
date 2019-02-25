<template>
    <div class="tabs-item" @click="onClick" :class="classes"
         :data-name="name"
         :disabled="disabled">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: "g-tabs-item",
        inject:['eventBus'],
        data(){
          return {
              active:false
          }
        },
        computed:{
          classes(){
              return {
                  active:this.active
              }
          }
        },
        props:{
            disabled:{
                type:Boolean,
                default:false
            },
            name:{
              type: Number|String,
                required:true
            }
        },
        created(){
            if(!this.eventBus)return
            this.eventBus.$on('update:selected',(name)=>{
               this.active = name === this.name;
            })
            this.$emit('click',this)
        },
        methods:{
            onClick(){
                this.eventBus.$emit('update:selected', this.name,this)
            }
        }
    }
</script>

<style scoped lang="scss">
       $blue:#1296db;
       .tabs-item{
            flex-shrink: 0;
            padding: 0 2em;
            cursor: pointer;
            height: 100%;
            display: flex;
            align-items: center;
           &:hover{
               color:$blue;
               font-weight: bold;
           }
           &.active{
               color:$blue;
               font-weight: bold;
           }
           &[disabled]{
               pointer-events: none;
               opacity: 0.6;
           }
       }
</style>
