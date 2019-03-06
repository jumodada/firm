<template>
    <div class="cascader">
        <div class="trigger" @click="onClick" ref="trigger">
            {{selectedArray}}
        </div>

        <div class="popover-wrapper" v-if="popoverVisible" ref="popoverWrapper">
            <x-cascader-items
                    :items="source" class="popover"
                    :selected="selected"
                    @update:selected="onUpdateSelected"
            >

            </x-cascader-items>
        </div>
    </div>
</template>

<script>
    import xCascaderItems from './cascader-item'
    export default {
        name: 'x-',
        components: {
            xCascaderItems
        },
        props: {
            source: {
                type: Array
            },
            size:{
                type: String
            },
            selected:{
                type:Array,
                default:()=>[]
            },
        },
        data () {
            return {
                popoverVisible: false,
                showSelected:'',

            }
        },

        beforeDestroy(){
            this.remvoeListener()
            this.$refs.popoverWrapper && this.$refs.popoverWrapper.remove()
        },
        methods:{
            contentPosition(){
                const {popoverWrapper,trigger} = this.$refs
                document.body.appendChild(popoverWrapper)
                let {top,left,height} = trigger.getBoundingClientRect()
                let x = {
                        top:top + height + window.scrollY,
                        left:left + window.screenX
                }
                popoverWrapper.style.left = x.left + 'px'
                popoverWrapper.style.top = x.top + 'px'
            },
            onClick(){

                this.selectedCopy = JSON.parse(JSON.stringify(this.selected))//假使用户没有选完或者放弃选择，还可以保持之前的popover选择不被更改。
                this.addListener()
                this.popoverVisible =!this.popoverVisible
                if(!this.popoverVisible){
                    this.close()
                }
                if(this.popoverVisible){
                   this.$nextTick(()=>{
                       this.contentPosition()
                   })
                }
            },
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
            },
            close(){
                let length = this.selected.length

                if(this.selected[length-1]==='$#end' ||this.showSelected.length){
                    if(this.showSelected.length &&this.selected[length-1]!=='$#end'){
                        this.$emit('update:selected',this.selectedCopy)
                    }
                }else{
                    this.selectedCopy = []
                    this.$emit('update:selected',this.selectedCopy)
                }
                this.popoverVisible =false
                this.remvoeListener()
            },
            addListener(){
                this.fn = e=>{
                    if(e.path.indexOf(this.$refs.popoverWrapper)===-1 && e.path.indexOf(this.$refs.trigger)===-1){
                        this.close()
                    }
                }
                document.addEventListener('click',this.fn)
            },
            remvoeListener(){
                document.removeEventListener('click',this.fn)
            }
        },
        computed:{
            selectedArray(){
                 let length = this.selected.length

                 if(this.selected[length-1]==='$#end'){
                     this.close()
                    let arr = this.selected.map((item=>item.name))
                     arr.pop()
                     this.showSelected = arr.join(' /')
                     return this.showSelected
                 }else{
                     return this.showSelected
                 }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader {
        .trigger {
            border: 1px solid $border-color;
            height: 32px;
            width: 230px;
            padding: 0.3em 1em;
            display: flex;
            align-items: center;
            color: $font-color;
            border-radius: 5px;
            overflow: auto;
            &:hover{
                cursor: pointer;
            }
        }
    }
    .popover-wrapper {
        position: absolute;
        color:$font-color;
        display: flex;
        @extend .box-shadow;
        .popover{

        }
        .label {
            white-space: nowrap;
        }
    }
</style>
