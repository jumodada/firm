# Tabs标签页


## 基础用法
:::demo 设置`name`作为头部文字，`index`则是为了切换标签做标识
```html
<f-tabs :selected.sync="value">
    <f-tabs-item name="首页" index="1">首页信息</f-tabs-item>
    <f-tabs-item name="新闻" index="2">新闻信息</f-tabs-item>
    <f-tabs-item name="娱乐" index="3">娱乐信息</f-tabs-item>
</f-tabs>

<script>
export default{
   data(){
    return {
    value:'1'
   } 
  }
}
</script>
```
:::


## 位置
:::demo 设置`position`改变方位，支持的值有 top / bottom / left / right
```html

<f-button-group style="margin: 20px">
<f-button @click="changePosition('left')">left</f-button>
<f-button @click="changePosition('right')">right</f-button>
<f-button @click="changePosition('top')">top</f-button>
<f-button @click="changePosition('bottom')">bottom</f-button>
</f-button-group>   


<f-tabs :position="position" :selected.sync="value">
    <f-tabs-item name="首页" index="1">首页信息</f-tabs-item>
    <f-tabs-item name="新闻" index="2">新闻信息</f-tabs-item>
    <f-tabs-item name="娱乐" index="3">娱乐信息</f-tabs-item>
</f-tabs>

<script>
export default{
   data(){
    return {
      value:'1',
      position:'left'
    }
  },
   methods:{
        changePosition(position){
            this.position = position
        }
    }
}
</script>
```
:::
