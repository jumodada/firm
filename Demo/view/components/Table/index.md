# Table表格


## 表格
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html
 <f-table 
    bordered
    align="center"
    :columns="columns"
     :data="data">
        <template slot-scope="{row}"  slot="name">
        <f-button type="warn">{{row.name}}</f-button>
        </template>
    </f-table>

<script>
export default {
    data(){
        return {
            columns:[
               {title:'姓名',slot:'name'},
               {title:'年龄',key:'year'},
               {title:'性别',key:'sex'},
               {title:'天梯分数',key:'score'}
            ],
            data:[
              {name:'伍声',year:21,sex:'男',score:2009},
              {name:'Pis',year:23,sex:'男',score:2100},
              {name:'蛛丝马迹',year:22,sex:'男',score:2001},
            ]
        }
    }
 
}
</script>

```
:::
