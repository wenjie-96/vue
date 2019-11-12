<template>
  <div class="orderTotal">
    <el-card class="box-card">
      <el-form :model="dateForm" ref="dateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="时间范围" prop="date1">
          <el-date-picker
            label="时间"
            v-model="dateForm.date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary" style="margin-left:15px;">查询</el-button>
        </el-form-item>
      </el-form>

      <div id="main" style="width: 950px;height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
import {getOrderTotal} from "../../api/order"
import moment from "moment"
export default {
  data() {
    return {
      dateForm: {
        date1: ""
      }
    };
  },
  methods: {
    orderEcharts(xArr,yArr) {
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption({
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xArr
          }
        ],
        yAxis: [
          {
            type: "value",
             axisLabel: {
            formatter: "{value} 元"
          }
          }
        ],
        series: [
          {
            // name: "邮件营销",
            type: "line",
            stack: "总量",
            // areaStyle: {},
            data: yArr
          }
         
        ]
      });
    },

   async getDataInfo(){

   let {data} =  await getOrderTotal({date:JSON.stringify(this.dateForm.date1)})

   //循环 时间格式化
   data.forEach(v=>{
     v.orderTime=moment(v.orderTime).format("YY/MM/DD")
   })

   let obj ={}

   //数据处理
   data.forEach(v=>{
     if(!obj[v.orderTime]){
       obj[v.orderTime]=v.orderAmount;
     }else{
       obj[v.orderTime]+=v.orderAmount
     }
   });

    let xArr=[]
    let yArr=[]

    for(let key in obj) {
      xArr.push(key)
      yArr.push(obj[key])
    }

    this.orderEcharts(xArr,yArr)

  }
  },
  mounted() {
    this.getDataInfo()
  }
};
</script>

<style lang="less" scoped>
.orderTotal {
  .el-form {
    margin-top: 20px;
    padding-bottom: 20px;
  }
}
</style>