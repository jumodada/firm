<template>

   <div style="margin-top: 30px">

       <div style="font-size: 17px;color: #999999;margin-top: 30px">
           栅格系统必须要row和col结合使用，row组件里面只能有col组件。<br>
           通过设置 <code>span</code> 可以控制每个col的长度
       </div>
       <div style="margin-top: 20px">
           <x-collapse :selected.sync="selectTab" exhibition>
               <template slot="description">
                   <x-row >
                       <x-col span="12" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                       <x-col span="12" style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                   </x-row>
                   <div style="margin-top: 15px">
                       <x-row>
                           <x-col span="6" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                           <x-col span="6" style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                           <x-col span="6" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                           <x-col span="6" style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                       </x-row>
                   </div>
                   <div style="margin-top: 15px">
                       <x-row >
                           <x-col span="4" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                           <x-col span="15" style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                           <x-col span="5" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                       </x-row>
                   </div>
                   <div style="margin-top: 15px">
                       <x-row>
                           <x-col span="4" style="background-color: #e6e6e6;height: 60px;border-radius: 8px"></x-col>
                           <x-col span="4" style="background-color: #bfbfbf;height: 60px;border-radius: 8px"></x-col>
                           <x-col span="6" style="background-color: #e6e6e6;height: 60px;border-radius: 8px"></x-col>
                           <x-col span="2" style="background-color: #bfbfbf;height: 60px;border-radius: 8px"></x-col>
                           <x-col span="8" style="background-color: #e6e6e6;height: 60px;border-radius: 8px"></x-col>
                       </x-row>
                   </div>
               </template>
               <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                   <div  v-highlight v-html="html"></div>
               </x-collapse-item>
           </x-collapse>
       </div>
   </div>

</template>

<script>
    import Row from '../../../src/layout/row'
    import Col from '../../../src/layout/col'
    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark.css'
    import marked from 'marked'
    import Vue from 'vue'
    Vue.directive('highlight', (el) => {
        let blocks = el.querySelectorAll('pre code')
        blocks.forEach((block) => {
            hljs.highlightBlock(block)
        })
    })
    export default {
        name: "grid-default",
        data(){
          return {
              selectTab:[1],
              input1:'```html\n' +
                  '<x-row >\n' +
                  ' <x-col span="12"></x-col>\n' +
                  ' <x-col span="12"></x-col>\n' +
                  '</x-row>\n' +
                  '<div style="margin-top: 15px">\n' +
                  '<x-row>\n' +
                  ' <x-col span="6"></x-col>\n' +
                  ' <x-col span="6"></x-col>\n' +
                  ' <x-col span="6"></x-col>\n' +
                  ' <x-col span="6"></x-col>\n' +
                  '</x-row>\n' +
                  '</div>\n' +
                  '<div style="margin-top: 15px">\n' +
                  '<x-row >\n' +
                  '  <x-col span="4"></x-col>\n' +
                  '  <x-col span="15"></x-col>\n' +
                  '  <x-col span="5"></x-col>\n' +
                  '</x-row>\n' +
                  '</div>\n' +
                  '```'
          }
        },

        components:{
            'x-row':Row,
            'x-col':Col,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
        },
        computed: {
            html() {
                return marked(this.input1)
            },
        },
    }
</script>

<style scoped>

</style>
