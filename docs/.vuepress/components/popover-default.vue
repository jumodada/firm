<template>

    <div style="margin-top: 50px">

          <div style="margin-left: 100px;">
              <x-popover position="left">
                  <template slot="content" slot-scope="close">
                      <div>支持内部关闭</div>
                      <x-button @click="close.close">
                          左边
                      </x-button>

                  </template>
                  <x-button>关闭</x-button>
              </x-popover>
              <x-popover position="bottom">
                  <template slot="content">
                      <div>popover内容</div>
                  </template>
                  <x-button>底部</x-button>
              </x-popover>
              <x-popover>
                  <template slot="content">
                      <div class="xxx">
                          <div class="xx">
                              <x-button>点我</x-button>

                          </div>
                      </div>
                      <div>
                          <a href="https://www.baidu.com">去百度</a>
                      </div>
                  </template>
                  <x-button>顶部</x-button>
              </x-popover>
              <x-popover position="right">
                  <template slot="content">
                      <div>popover内容</div>
                  </template>
                  <x-button>右边</x-button>
              </x-popover>
              <x-popover position="bottom">
                  <template slot="content">
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                      <x-button>点我</x-button>
                  </template>
                  <x-button>超出</x-button>
              </x-popover>
          </div>

        <br>
        <br>

            <div style="color: #666666">通过设置 <code>position</code> 可以改变气泡框弹出的位置
                <br>
                默认位置是在顶部
                <br>
                内部可嵌入元素调用外面close关闭的功能，只需绑定slot-scope.
                <br>
                规定了气泡的大小，如果超出会以scroll展示
            </div>
        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab">
                <x-collapse-item name="1" title="代码">
           <pre>
               <code>
                    {{content}}
               </code>
            </pre>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import popover from '../../.././src/popover'
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Button from '../../.././src/button'

    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                content:`
                <x-popover position="left">
                  <template slot="content" slot-scope="close">
                      <div>支持内部关闭</div>
                      <x-button @click="close.close">
                          左边
                      </x-button>

                  </template>
                  <x-button>关闭</x-button>
              </x-popover>
              <x-popover position="bottom">
                  <template slot="content">
                      <div>popover内容</div>
                  </template>
                  <x-button>底部</x-button>
              </x-popover>
              <x-popover>
                  <template slot="content">
                      <div class="xxx">
                          <div class="xx">
                              <x-button>点我</x-button>

                          </div>
                      </div>
                      <div>
                          <a href="https://www.baidu.com">去百度</a>
                      </div>
                  </template>
                  <x-button>顶部</x-button>
              </x-popover>
              <x-popover position="right">
                  <template slot="content">
                      <div>popover内容</div>
                  </template>
                  <x-button>右边</x-button>
              </x-popover>
              <x-popover position="bottom">
                  <template slot="content">
                      <x-button>点我</x-button>
                  </template>
                  <x-button>超出</x-button>
              </x-popover>
`
            }
        },
        methods:{

        },
        components:{
            'x-popover':popover,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button':Button
        }
    }
</script>

<style scoped>

</style>
