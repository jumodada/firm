# Table表格


## 基本用法
:::demo 通过`columns`和`data`设置表头和表格数据。`align`设置对齐方式：left、right和center。
```html
 <f-table  :columns="columns" :data="data"></f-table>

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
 <f-table  max-height="320"  :columns="columns" :data="data"></f-table>

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