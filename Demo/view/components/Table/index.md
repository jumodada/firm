# Table表格


## 表格
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html
<f-row>
    <f-table 
    bordered
    :maxHeight="200"
    @on-select-change="getSelect"
    @on-select-cancel="selectCancel"
    align="center"
    :columns="columns"
     :data="data">
    </f-table>
</f-row>

<script>
export default {
    data(){
        return {
            columns:[
               {title:'名字',key:'name'},
               {type:'selection',width:60},
               {title:'年龄',key:'year'},
               {title:'性别',key:'sex'},
               {title:'天梯分数',key:'score'}
            ],
            data:[
              {name:'伍声',year:21,sex:'男',score:2009,_disabled:true},
              {name:'Pis',year:23,sex:'男',score:2100},
              {name:'蛛丝马迹',year:22,sex:'男',score:2001},
              {name:'阿川',year:24,sex:'男',score:1967},
              {name:'伍声',year:21,sex:'男',score:2009,_disabled:true},
              {name:'Pis',year:23,sex:'男',score:2100},
              {name:'蛛丝马迹',year:22,sex:'男',score:2001},
              {name:'阿川',year:24,sex:'男',score:1967},
              {name:'伍声',year:21,sex:'男',score:2009,_disabled:true},
              {name:'Pis',year:23,sex:'男',score:2100},
              {name:'蛛丝马迹',year:22,sex:'男',score:2001},
              {name:'阿川',year:24,sex:'男',score:1967},
            ]
        }
    },
    methods:{
        getSelect(val){
            console.log(val)
        },
        selectCancel(val,cancel){
              //console.log(val)
              //console.log(cancel)
        }
    }
}
</script>

```
:::
