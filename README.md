# 1.静态页面完成

# 2.Header部分

## 1.input插入到List最前面

1.用v-on和$emit来完成父子组件通信，父用v-on监听事件，子用$emit 触发事件并且给父传递数据

2.给ElementUI的input绑定原生事件要在后面加上.native =>比如@keyup.native.enter=""

3.给父传递的插入数据要整理成对象形式（因为原本的数据格式就是数组对象），id用nanoid生成，调用的时候不要忘记加()

## 2.点击搜索匹配input输入的事项

**思路：**当用户一点击搜索的时候，下面的列表展示匹配的搜索结果（未完成）

**目前进度：**只过滤了数组，没有更改List中的数据

## 3.回车后清空input框

**思路：**在@keyup.native.enter的回调中，把title重新赋为空即可

## 4.input为空时不能更新列表

**思路：**判断用户输入是否为空，为空则不让添加并且弹出提示框



# 2.List部分

## 1.数据持久存储

**思路：**存在localstorage中，这样每次一刷新数据就不会丢失了

1.用localstorage.setItem('key','value)来存储数据 =>在父组件watch中存，然后父组件的data中的数组数据就没必要写死了，用getItem读取localStorage中的数据，再给数据加一个容错判断

**问题：**什么时候更新存储呢？

**解决：**用watch深度监听数组的变化，然后之前定义的死数据就没必要保留了，用getItem读取localStorage中 存的数据并且给它加一个容错判断



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

## 3.删除按钮

**思路：**

- 鼠标移入对应的List才显示按钮 => 用table自带的事件+v-show来控制button的显示与隐藏。

- 一点击按钮，首先弹出提示框询问用户是否删除 => **this.$confirm('确定删除？')**，然后在$confirm的.then()回调中通知父组件删除该行数据 =>**全局事件总线**

> @cell-mouse-enter="" table的鼠标移入事件
>
> @cell-mouse-leave="" table的鼠标移出事件

## 4.编辑按钮

**思路：**一点击编辑按钮就从文本框切换到输入框并且**自动对焦**（这里重写了解构，用template+input和span来控制显示与隐藏），失焦和敲回车的时候判断输入框不能为空，如果不为空就保存用户输入+修改（因为用的是template，所以input框中一修改值就直接触发数组数据更新了，不需要额外通知父组件修改。失焦用的是@blur，在回调函数里让this.inputIndex=-1就可以切换回文本框了）

**问题：**用ref和$refs.xxx.onfocus()并没有实现输入框的自动对焦 （**问题原因**：data中的数据发生改变后，vue的依赖监听并更新视图过程是异步进行的，所以此时视图更新任务还在等待，输入框并没有渲染出来，此时通过$refs操作dom是无效的）

**解决：**this.$nextTick() => 更改数据后获取最新的DOM ，把this.$refs.xxx.focus()外层嵌套$nextTick就可以解决

```js
<el-input v-model="scope.row.title" v-if="scope.row.id==rowIndex" ref="focusInput"></el-input>

//编辑按钮
handleEdit(index, row) {
      console.log(index, row);
      this.rowIndex = row.id;
      this.$nextTick(()=>{
        this.$refs.focusInput.focus()
      })
},
```



## 5.input输入时隐藏右边两个按钮

**思路：**在两个button上的v-show里判断input框是否展示，如果展示了就隐藏。

点击编辑的时候保存了当前数组的title，方便后面输入为空的时候回退。



# 3.Footer部分

## 1.已完成和全部数量的展示

**思路：**已完成就是数组里的done有几个为true，全部就是数组的长度

1.用computed计算

- 已完成用reduce方法累加数组中done为true的和
- 全部就直接返回数组的length

## 2.底部checkbox全选or全不选

**思路：**一点击就让数组中的done全部为true或者全部为false，首先要知道用户是勾了还是没勾，用一个变量来保存是否勾选。这里也用的 **全局事件总线**（用不到事件总线来通知List组件是否全选了，用模板就可以根据数组的变化直接渲染页面了，不需要拿到checked的值再去nextTick了！！这个问题折磨了我两天，一条路走到黑...是在走不下去了才用的template）

**问题：**全选或者全不选没有改变List里每一项checkbox的视图，数据更新了视图没有更新怎么解决？==>原来是用的<el-table type="selection">发现数据更新了视图更新不了，后面改用<template>+<el-checkbox>就可以了

> **注意：** 当vue的data里面声明或者已经赋值过的对象或数组（包含对象值），向对象里面添加新的属性和更新这个新属性的值，页面视图是不会更新的



**解决：**当Footer组件checked为true的时候，让所有checkbox都为true => （兄弟组件通信）**全局事件总线**

> **toggleAllSelection** 用于多选表格，切换所有行的选中状态
>
> **clearSelection**清除表格所有的选中项

## 3.done都为true时自动勾选

**思路：**只要已完成和全部的数量相等就自动勾选 =>在computed里面通过get和set计算出来，注意这个checked值是set计算出来的，通过v-model绑定在了checkbox上。

**问题：**已完成为0和全部为0时也会自动勾选

**解决：**在computed的时候加上 && 判断总数是否为0

## 4.清除所有已完成

**思路：**只要done为true的都要删除（filter过滤） =>一点击清除按钮就要通知父组件去删除对应的数据 **全局事件总线**

## 5.当数组为空时隐藏Footer

**思路：**在computed中计算已经总数是否为0，然后v-show显示与隐藏<el-Footer>