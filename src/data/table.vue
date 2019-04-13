<template>
    <div class="x-table-wrapper">
        <table class="x-table" :class="{bordered,compact,stripe:stripe}">
            <thead class="x-table-head">
            <tr>
                <th v-if="checkBoxOn"><input type="checkbox"></th>
                <th v-for="column in columns">
                    {{column.text}}
                </th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in data">
                  <th><input v-if="checkBoxOn" @change="changeItem(item,index,$event)" type="checkbox"></th>
                  <td v-if="numberVisible">{{index+1}}</td>
                    <template v-for="column in columns">
                        <td>
                            {{item[column.field]}}
                        </td>
                    </template>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "x-table",
        props:{
            stripe:{
                type:Boolean,
                default: true
            },
            compact:{
                type:Boolean,
                default: false
            },
            bordered:{
                type:Boolean,
                default:false
            },
            columns:{
                type:Array,
                required:true
            },

            data:{
                type: Array,
                required: true
            },
            numberVisible:{
                type:Boolean,
                default:false
            },
            checkBoxOn:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            changeItem(item,index,e){
               this.$emit('changeItem',{selected:e.target.checked,item,index})
            }
        }
    }
</script>

<style lang="scss">

        .x-table-wrapper{
            -webkit-font-smoothing: antialiased;
            .x-table{
                width: 100%;
                color:#515a6e;
                border-collapse: collapse;
                border-spacing: 0;
                border-bottom: 1px solid #efefef;

                &.bordered{
                    border:1px solid #efefef;
                    td,th{
                        border: 1px solid #efefef;
                    }
                }
                &.compact{
                    td,th{
                        padding: 4px;
                    }
                }
                &.stripe{
                    tbody {
                        >tr{
                            &:nth-child(odd){
                                background-color: lighten(#f1eeee,3.5%);
                            }
                        }
                    }
                }
                td,th{
                    color:lighten(#515a6e,13.5%);
                    text-align: left;
                    padding: 8px;
                    border-bottom: 1px solid #efefef;
                }

            }
        }
</style>
