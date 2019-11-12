<template>
  <div class="ordermanagement">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单管理</span>
      </div>
      <div>
        <el-form  ref="orderForm" :model="orderForm" label-width="80px">
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="orderForm.orderNo" placeholder="订单号"></el-input>
          </el-form-item>

          <el-form-item label="收货人" prop="consignee">
            <el-input v-model="orderForm.consignee" placeholder="收货人"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input v-model="orderForm.phone" placeholder="手机号"></el-input>
          </el-form-item>

          <el-form-item label="订单状态" prop="orderState">
            <el-select v-model="orderForm.orderState" placeholder="订单状态">
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已接单" value="已接单"></el-option>
              <el-option label="正在处理" value="正在处理"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择时间" prop="date">
            <el-date-picker
              v-model="orderForm.date"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label-width="20px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="resetForm('orderForm')">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="tableData" border style="width: 95%">
          <el-table-column fixed prop="orderNo" label="订单号" width="120"></el-table-column>

          <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>

          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="80"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="100"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="120"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="80"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1,5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOrderList } from "../../api/order";
export default {
  data() {
    return {
      orderForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [],
      },
      //分页
      currentPage: 1,
      pageSize: 5,
      total: 5,

      //时间选择数据
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },

      //表格数据
      tableData: []
    };
  },
  methods: {
    //获取 订单列表
    async getOrders() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.orderForm.orderNo,
        consignee: this.orderForm.consignee,
        phone: this.orderForm.phone,
        orderState: this.orderForm.orderState,
        date: JSON.stringify(this.orderForm.date)
      };
      let {total, data } = await getOrderList(params);

      this.total = total;

      data.forEach(v => {
        v.orderTime = this.$moment(v.orderTime).format("YYYY/MM/DD hh:mm:ss");
        v.deliveryTime = this.$moment(v.deliveryTime).format(
          "YYYY/MM/DD hh:mm:ss"
        );
      });
      
  
      this.tableData = data;
    },

    //查看
    handleClick(row) {
      window.sessionStorage.setItem("order",JSON.stringify(row))
      this.$router.push("/home/order")
      
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrders();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrders();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getOrders()
    },

    //查询
    search(){
      this.currentPage =1
      this.getOrders()
    }
  },
  created() {
    this.getOrders();
  }
};
</script>

<style lang="less" scoped>
.ordermanagement {
  width: 100%;
  .el-card {
    width: 100%;
    .el-form {
      display: flex;
      flex-wrap: wrap;
      .el-input {
        width: 160px;
      }
      .el-select {
        width: 160px;
      }
    }
    .page {
      margin-top: 20px;
      margin-left: 240px;
    }
  }
}
</style>