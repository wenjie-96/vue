<template>
  <div class="accountlist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户列表</span>
      </div>
      <div>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          ref="accountlist"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="账号" width="180">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.account }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="用户级别" width="180">
            <template slot-scope="scope">
              <i class="el-icon-user"></i>
              <span style="margin-left: 10px">{{ scope.row.userGroup }}</span>
            </template>
          </el-table-column>

          <el-table-column label="创建日期" width="260">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ $moment(scope.row.ctime).format("YYYY/MM/DD") }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit( scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="button">
        <el-button type="danger" @click="batchDel">批量删除</el-button>
        <el-button type="primary" @click="cancelSelection">取消选择</el-button>
      </div>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 模态框 -->
    <el-dialog width="460px" title="编辑账号" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" style="width:317px">
        <el-form-item label="账号" label-width="100px">
          <el-input v-model="editForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" label-width="100px">
          <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAccount,
  accountDel,
  batchDel,
  editAccount
} from "../../api/account.js";
export default {
  data() {
    return {
      tableData: [],

      //分页数据
      total: 0,
      currentPage: 1,
      pageSize: 5,
      ids: [],
      editForm: {
        account: "",
        userGroup: ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    // //删除
    // handleDelete(index, row) {
    //   this.tableData.splice(index, 1);
    // },
    //取消选中
    cancelSelection() {
      this.$refs.accountlist.clearSelection();
    },
    //获取用户列表
    async getList() {

      let { total, data } = await getAccount({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      if(!data.length&&this.currentPage!==1){
        this.currentPage--
        this.getList()
      }

      this.total = total;
      this.tableData = data;
    },
    //当页面显示内容变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    //当当前页变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //删除
    handleDel(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { id } = row;
          let { code} = await accountDel({ id });
          if (code === 0) {
           
            this.getList();
          } 
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //当选中状态改变时
    handleSelectionChange(rows) {
      this.ids = rows.map(row => row.id);
    },
    //批量删除
    batchDel() {
      //拦截没有选择的点击
      if (!this.ids.length) {
        this.$message.error("请选择需要删除的项");
        return;
      }

      // 确认是否删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //确认
          let { code, msg } = await batchDel({ ids: JSON.stringify(this.ids) });
          if (code === 0) {
           
            this.getList();
          } 
        })
        .catch(() => {
          //取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    handleEdit(row) {
      this.editForm = { ...row };
      this.dialogFormVisible = true;
    },
    //提交修改
    async saveEdit() {
      //关闭模态框
      this.dialogFormVisible = false;
      let { id, account, userGroup } = this.editForm;
      let { code } = await editAccount({ id, account, userGroup });
      if (code === 0) {
 
        this.getList();
      } 
    }
  },
  //加载用户列表
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.accountlist {
  .button {
    margin-top: 10px;
  }
  .page {
    margin-top: 20px;
    margin-left: 60px;
  }
}
</style>