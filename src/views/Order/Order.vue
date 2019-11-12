<template>
  <div class="order">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <el-button style="float: right; margin-right:30px;" @click="change" size="small" :type="isEdit?'primary':'success'">{{btntext}}</el-button>
      </div>
      <div class="content">
        <span class="title">订单号：</span>
        <span v-if="isEdit">{{orderForm.orderNo}}</span>
        <el-input v-else v-model="orderForm.orderNo"></el-input>
        <el-divider></el-divider>
        <span class="title">下单时间：</span>
         <span v-if="isEdit">{{orderForm.orderTime}}</span>
 <el-date-picker  v-else
      v-model="orderForm.orderTime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
        <el-divider></el-divider>
        <span class="title">手机号：</span>
        <span v-if="isEdit">{{orderForm.phone}}</span>
        <el-input v-else v-model="orderForm.phone"></el-input>

        <el-divider></el-divider>
        <span class="title">收货人：</span>
        <span v-if="isEdit">{{orderForm.consignee}}</span>
        <el-input v-else v-model="orderForm.consignee"></el-input>

        <el-divider></el-divider>
        <span class="title">配送地址：</span>
        <span v-if="isEdit">{{orderForm.deliverAddress}}</span>
        <el-input v-else v-model="orderForm.deliverAddress"></el-input>

        <el-divider></el-divider>
        <span class="title">送达时间：</span>
        <span v-if="isEdit">{{orderForm.deliveryTime}}</span>
         <el-date-picker v-else
      v-model="orderForm.deliveryTime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>

        <el-divider></el-divider>
        <span class="title">用户备注：</span>
        <span v-if="isEdit">{{orderForm.remarks}}</span>
        <el-input v-else v-model="orderForm.remarks"></el-input>

        <el-divider></el-divider>
        <span class="title">订单金额：</span>
        <span v-if="isEdit">{{orderForm.orderAmount}}</span>
        <el-input v-else v-model="orderForm.orderAmount"></el-input>

        <el-divider></el-divider>
        <span class="title">订单状态：</span>
        <span v-if="isEdit">{{orderForm.orderState}}</span>


         <el-select v-else v-model="orderForm.orderState" placeholder="活动区域">
      <el-option  value="已接单"></el-option>
      <el-option value="正在派送"></el-option>
      <el-option  value="已处理"></el-option>

    </el-select>

        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
import {orderedit} from "../../api/order"
export default {
  data() {
    return {
      orderForm: {},
      isEdit:true
    };
  },
  methods:{
     async change(){
          this.isEdit=!this.isEdit

          if(this.isEdit){
            let {code} = await orderedit(this.orderForm)
              if(code===0){
                  this.$router.push("/home/ordermanagement")
              }
          }
      }
  }
  ,
  created() {
    this.orderForm = JSON.parse(window.sessionStorage.getItem("order"));
    console.log(this.orderForm);
  },
  computed:{
      btntext(){
          if(this.isEdit){
              return "编辑"
          }else{
              return "保存"
          }
      }
  }
};
</script>

<style lang="less" scoped>
.order {
  .content {
    span {
      font-size: 14px;
    }
    .el-input{
        width: 250px;
    }
    .title{
        display: inline-block;
        width: 90px;
        text-align: right;
        margin-right: 10px;
    }
  }
}
</style>