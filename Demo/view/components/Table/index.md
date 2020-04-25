# Table表格


## 基本用法
:::demo 通过`columns`和`data`设置列和行数据。`align`设置对齐方式：left、right和center。
```html
 <f-row>
<f-col span="6">边框：<f-switch v-model="bordered"></f-switch></f-col>
<f-col span="6">条纹：<f-switch v-model="stripe"></f-switch></f-col>
<f-col span="6">
</f-col>
</f-row>
 <f-table :bordered="bordered" :stripe="stripe"  :columns="columns" :data="data"></f-table>

<script>
export default {
    data(){
        return {
            bordered:false,
            stripe:false,
 cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
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


## 固定列
:::demo 设置`width`和`fixed`。fixed支持`left`和`right`。
```html
 <f-table width="600"  :columns="columns" :data="data"></f-table>

<script>
export default {
    data(){
        return {
            columns:[
               {title:'规格',key:'sku',width:140},
               {title:'商品名称',key:'name',width:140,fixed:'left'},
               {title:'库存数量',key:'stock',width:140},
               {title:'销售数量',key:'sale',width:140},
               {title:'单价',key:'price',align:'center',width:140,fixed:'right'},
               {title:'进价',key:'purchase',width:140}              
            ],
            data:[
              {name:'陶锅',sku:'2.5L',stock:11,price:435,sale:0,purchase:389},
              {name:'保温杯',sku:'500ml',stock:2234,price:99,sale:1135,purchase:50},
              {name:'一次性医用口罩',sku:'袋',stock:0,price:6,sale:9999,purchase:2.5},
              {name:'薏仁茶',sku:'盒',stock:648,price:34,sale:3014,purchase:28},
              {name:'牛奶',sku:'箱',stock:2376,price:66,sale:201,purchase:39}
            ]
        }
    }
 
}
</script>

```
:::


## 自定义模板
:::demo设置`slot`来自定义内容。
```html
 <f-table  :columns="columns" :data="data">
    <template slot="action" slot-scope="{row,index}">
   <f-popover @on-confirm-success="deleteGoods(index)" :before-confirm="handleBeforeSuccess" @on-cancel="handleCancel(row)"  confirm  title="提示" content="确定要删除吗">
   <f-button  type="error" size="mini"  class="button">删除</f-button>
   </f-popover>
    </template>
</f-table>

<script>
export default {
    data(){
        return {
            columns:[
               {title:'商品名称',key:'name'},   
               {title:'规格',key:'sku'},
               {title:'销售数量',key:'sale'},
               {title:'单价',key:'price'},
               {title:'进价',key:'purchase'}, 
               {title:'操作',slot:'action',align:'center',width:140}, 
            ],
            data:[
              {name:'陶锅',sku:'2.5L',stock:11,price:435,sale:0,purchase:389},
              {name:'保温杯',sku:'500ml',stock:2234,price:99,sale:1135,purchase:50},
              {name:'一次性医用口罩',sku:'袋',stock:0,price:6,sale:9999,purchase:2.5},
              {name:'薏仁茶',sku:'盒',stock:648,price:34,sale:3014,purchase:28},
              {name:'牛奶',sku:'箱',stock:2376,price:66,sale:201,purchase:39}
            ]
        }
    },
    methods:{
       handleCancel(){
          this.$message.error('已取消') 
       }, 
      handleBeforeSuccess(){
         return new Promise((resolve,reject)=>{
           resolve('success')
       })
      }, 
      deleteGoods(index){
        this.data.splice(index,1)
       }, 
     }
 
}
</script>

```
:::

## 加载中
:::demo设置`loading`来控制加载动画的显隐。
```html
 <f-table :loading="loading"  :columns="columns" :data="data"></f-table>
 <f-switch style="margin-top:10px" v-model="loading"></f-switch>
<script>
export default {
    data(){
        return {
            columns:[
               {title:'商品名称',key:'name'},   
               {title:'规格',key:'sku'},
               {title:'销售数量',key:'sale'},
               {title:'单价',key:'price'},
               {title:'进价',key:'purchase'},  
            ],
            data:[
              {name:'陶锅',sku:'2.5L',stock:11,price:435,sale:0,purchase:389},
              {name:'保温杯',sku:'500ml',stock:2234,price:99,sale:1135,purchase:50},
              {name:'一次性医用口罩',sku:'袋',stock:0,price:6,sale:9999,purchase:2.5},
              {name:'薏仁茶',sku:'盒',stock:648,price:34,sale:3014,purchase:28},
              {name:'牛奶',sku:'箱',stock:2376,price:66,sale:201,purchase:39}
            ],
            loading:false
        }
    },
    methods:{
     
     }
 
}
</script>

```
:::

## API

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
