# Table表格


## 基本用法
:::demo 通过`columns`和`data`设置列和行数据。`align`设置对齐方式：left、right和center。
```html
    <f-row>边框：<f-switch v-model="bordered"></f-switch></f-row>
 <f-table :bordered="bordered"  :columns="columns" :data="data"></f-table>

<script>
export default {
    data(){
        return {
            bordered:false,
            columns:[
               {title:'商品名称',key:'name'},
               {title:'规格',key:'sku'},
               {title:'库存数量',key:'stock'},
               {title:'单价',key:'price',align:'center'}
            ],
            data:[
              {name:'陶锅',sku:'2.5L',stock:11,price:435},
              {name:'保温杯',sku:'500ml',stock:2234,price:99},
              {name:'一次性医用口罩',sku:'袋',stock:0,price:6},
              {name:'薏仁茶',sku:'盒',stock:648,price:34},
             
            ]
        }
    }
 
}
</script>

```
:::


## 固定表头
:::demo 设置`max-height`
```html
 <f-table max-height="320"  :columns="columns" :data="data"></f-table>

<script>
export default {
    data(){
        return {
            columns:[
               {title:'商品名称',key:'name'},
               {title:'规格',key:'sku'},
               {title:'库存数量',key:'stock'},
               {title:'单价',key:'price',align:'center'}
            ],
            data:[
              {name:'陶锅',sku:'2.5L',stock:11,price:435},
              {name:'保温杯',sku:'500ml',stock:2234,price:99},
              {name:'一次性医用口罩',sku:'袋',stock:0,price:6},
              {name:'薏仁茶',sku:'盒',stock:648,price:34},
              {name:'牛奶',sku:'箱',stock:2376,price:66},
              {name:'折叠椅',sku:'只',stock:78,price:101},
              {name:'陶锅',sku:'2.5L',stock:11,price:435},
              {name:'保温杯',sku:'500ml',stock:2234,price:99},
              {name:'一次性医用口罩',sku:'袋',stock:0,price:6},
              {name:'薏仁茶',sku:'盒',stock:648,price:34},
              {name:'牛奶',sku:'箱',stock:2376,price:66},
              {name:'折叠椅',sku:'只',stock:78,price:101},
            ]
        }
    }
 
}
</script>

```
:::


## API

~~*~~
### Props
| 参数      | 说明    | 类型      | 可选值       | 默认   |
|---------- |-------- |---------- |-------------  |-------- |
| columns     | 列的数据   | array  |   -   | [ ] |
| data     | 行的数据   | array  |   -   | [ ] |
| bordered     | 设置格子边框   | boolean  |   false/true  | false|


### Events
| 事件名      | 说明    | 参数      |
|---------- |-------- |---------- |
| on-confirm     | 点击确后触发   | - |
| on-confirm-success     | 绑定`before-confirm`，调用成功后触发   | - |
| on-confirm-failed     | 绑定`before-confirm`，调用失败后触发   | - |
| on-confirm-timeOut     | 绑定`before-confirm`，超时触发。需设置`before-timeOut `   | - |


### Slot
| 名称       | 说明    
|---------- |-------- |
| -    | 弹出框内嵌的内容 |
| title     | 标题   |
| content   | 内容   |
| footer    | 尾部。css设置了`text-align:right`   |
