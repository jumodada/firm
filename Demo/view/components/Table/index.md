# Table表格


## 表格
:::demo 通过`columns`和`data`设置表头和表格数据
```html
 <f-table :columns="columns" :data="data"></f-table>

<script>
export default {
    data(){
        return {
            columns:[
               {title:'姓名',key:'name',align:'center'},
               {title:'年龄',key:'year',align:'center'},
               {title:'性别',key:'sex',align:'center'},
               {title:'天梯分数',key:'score',align:'center'}
            ],
            data:[
              {name:'伍声',year:21,sex:'男',score:2009},
              {name:'Pis',year:23,sex:'男',score:2100},
              {name:'蛛丝马迹',year:22,sex:'男',score:2001},
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
