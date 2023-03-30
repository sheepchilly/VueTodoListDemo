<template>
  <el-main>
    <el-table
      :data="tableData"
      :key="tableData.id"
      style="width: 100%"
      :show-header="false"
      ref="tableSelect"
      @select="select"
      @cell-mouse-enter="moEnter"
      @cell-mouse-leave="moLeave"
    >
      <el-table-column prop="done" width="50">
        <!-- 原本的checkbox -->
        <!-- <el-table-column type="selection" v-model="tableData.done"> </el-table-column> -->
        <!-- 新版checkbox ->用插槽 -->
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.done"></el-checkbox>
        </template>
      </el-table-column>
      <!-- 文本框 -->
      <el-table-column prop="title"> 
        <template slot-scope="scope">
          <el-input 
          v-model="scope.row.title" 
          v-if="scope.row.id==rowIndex" 
          ref="focusInput" 
          @blur="leaveInput(scope.$index,scope.row)"
          @keyup.native.enter="leaveInput(scope.$index,scope.row)"
          ></el-input>
          <span v-else>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="u_btn"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-show="isShow && showId == scope.row.id && !(rowIndex == scope.row.id)"
            >编辑</el-button
          >
          <el-button
            slot="reference"
            class="u_btn"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            v-show="isShow && (showId == scope.row.id) && !(rowIndex == scope.row.id)"
            >删除</el-button
          >

          <!-- 删除确认的弹出框 -->
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleDelete" >
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: "MyList",
  props: ["tableData"],
  data() {
    return {
      check: true,
      isShow: false,
      showId: "",
      dialogVisible: false,
      isEdit:true,
      rowIndex:-1,
      oldEditMessage:'',
    };
  },
  created() {
    this.$nextTick(() => {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].done == true) {
          this.$refs.tableSelect.toggleRowSelection(this.tableData[i]);
        }
      }
    });
  },
  methods: {
    //通知父组件修改数组中done的值
    select(_, row) {
      this.$bus.$emit("checkChange", row);
    },
    //鼠标移入显示按钮
    moEnter(row) {
      this.isShow = true;
      this.showId = row.id;
    },
    //鼠标移出隐藏按钮
    moLeave(row) {
      this.isShow = false;
      this.showId = row.id;
    },
    //编辑按钮
    handleEdit(index, row) {
      this.oldEditMessage = row.title;
      this.rowIndex = row.id;
      this.$nextTick(()=>{
        this.$refs.focusInput.focus()
      })
    },
    //删除按钮
    handleDelete(_,row) {
      this.$confirm('确定删除？')
          .then(_ => {
            this.$bus.$emit('deleteList',row.id)
            done();
          })
          .catch(_ => {});
    },
    //鼠标离开input框
    leaveInput(_,row){
      if(row.title.trim()==''){
        this.$confirm('输入不能为空！')
          .then(res => {
            row.title = this.oldEditMessage;
            this.rowIndex=-1;
            done();
          })
          .catch(err => {
            row.title = this.oldEditMessage;
            this.rowIndex=-1;
          });
      }else{
        this.rowIndex=-1
      }
    }
  },
  mounted() {
    // this.$bus.$on('selectionAllChange',this.selectionAllChange)
  },
};
</script>

<style lang="less">
.el-main {
  width: 100%;
  color: #333;
  text-align: center;
  padding: 3px;
  .u_btn {
    float: right;
    margin-left: 10px;
  }
}
</style>