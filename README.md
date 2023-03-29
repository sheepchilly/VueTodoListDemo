# 1.静态页面完成

# 2.Header部分

## 1.input插入到List最前面

1.用v-on和$emit来完成父子组件通信，父用v-on监听事件，子用$emit 触发事件并且给父传递数据

2.给ElementUI的input绑定原生事件要在后面加上.native =>比如@keyup.native.enter=""

3.给父传递的插入数据要整理成对象形式（因为原本的数据格式就是数组对象），id用nanoid生成，调用的时候不要忘记加()

## 2.点击搜索匹配input输入的事项

**思路：**当用户一点击搜索的时候，下面的列表展示匹配的搜索结果（未完成）

**目前进度：**只过滤了数组，没有匹配List的数据

# 2.List部分

## 1.数据持久存储

**思路：**存在localstorage中，这样每次一刷新数据就不会丢失了（未完成）

1.用localstorage.setItem('key','value)来存储数据

## 2.checkbox

1.**checkbox**并不是用<el-checkbox>而是手动添加一个`el-table-column`，设`type`属性为`selection`即可

2.在<el-table>中设置ref，然后在created钩子函数中使用elementUI提供的toggleRowSelection()方法来默认初始化是否勾选

```js
created(){
    this.$nextTick(()=>{
      for(let i =0;i<this.tableData.length;i++){
        if(this.tableData[i].done == true){
          this.$refs.tableSelect.toggleRowSelection(this.tableData[i])
        }
}})},
```

3.checkbox勾选后修改数组中done值，这里用的是 **全局事件总线**

> ElementUI的checkbox框 select 事件 当用户手动勾选数据行的 Checkbox 时触发的事件 参数selection：当前被勾选的数组, row：当前勾选的元素

```js
// 子组件用$emit向父组件传数据
methods:{
    //这里的_代表占位符，省略了selection
    select(_,row){
      this.$bus.$emit('checkChange',row)
    }
  },
// 父组件在mounted里面用$on接收，在methods里修改done的值
mounted(){
	this.$bus.$on('checkChange',this.checkChange)
},
methods:{
    //勾选框勾选
    checkChange(row){
        this.tableData.forEach(item=>{
            console.log('El',row)
            if(item.id==row.id)
                item.done =!item.done;
        })
    }
}
```



# 3.Header部分

## 1.已完成和全部数量的展示

**思路：**已完成就是数组里的done有几个为true，全部就是数组的长度

1.用computed计算

- 已完成用reduce方法累加数组中done为true的和
- 全部就直接返回数组的length

## 2.底部checkbox全选or全不选

**思路：**一点击就让数组中的done全部为true或者全部为false，首先要知道用户是勾了还是没勾，用一个变量来保存是否勾选。这里也用的 **全局事件总线**

**问题：**全选或者全不选没有改变List里每一项checkbox的视图，数据更新了视图没有更新怎么解决？

> 当vue的data里面声明或者已经赋值过的对象或数组（包含对象值），向对象里面添加新的属性和更新这个新属性的值，页面视图是不会更新的



**解决：**当Footer组件checked为true的时候，让所有checkbox都为true => （兄弟组件通信）**全局事件总线**

> **toggleAllSelection** 用于多选表格，切换所有行的选中状态
>
> **clearSelection**清除表格所有的选中项