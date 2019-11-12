<template>
  <div class="index">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="content">
          <div class="font">
            <i class="iconfont icon-dingdan"></i>
          </div>

          <div class="box">
            <h1>总订单</h1>
            <span>13255</span>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="content">
          <div class="font">
            <i class="iconfont icon-qian"></i>
          </div>

          <div class="box">
            <h1>总销售额</h1>
            <span>13255</span>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="content">
          <div class="font">
            <i class="iconfont icon-dingdan1"></i>
          </div>

          <div class="box">
            <h1>总订单</h1>
            <span>13255</span>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="content">
          <div class="font">
            <i class="iconfont icon-jinqian"></i>
          </div>

          <div class="box">
            <h1>总订单</h1>
            <span>13255</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-card class="box-card">
      <div id="myChart" :style="{width: '950px', height: '500px'}"></div>
    </el-card>
  </div>
</template>

<script>
import { getIndexData } from "../api/order";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let { date, data } = await getIndexData();
      this.drawLine(date,data)
    },

    drawLine(xArr, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数", "销售额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArr
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数",
            type: "line",
            data: data.orderNum
          },
          {
            name: "销售额",
            type: "line",
            data: data.amount
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  .content {
    width: 100%;
    display: flex;
    flex-direction: row;
    background: #fff;
    height: 80px;
    padding: 20px 0;

    .font {
      // flex: 0 0 40px;
      flex: 1;
      width: 40px;
      text-align: left;
      margin-top: 10px;
    }
    .box {
      align-self: center;
      flex: 1;
      text-align: center;
      // padding-right: 25px;
      // margin-right: 10px;
      line-height: 28px;
      font-weight: 700;
      h1 {
        color: #ccc;
        font-size: 18px;
      }
    }
  }
  i.iconfont {
    font-size: 60px;
    margin-left: 25px;
  }
  .icon-dingdan {
    color: #1296db;
  }
  .icon-qian {
    color: #d4237a;
  }
  .icon-dingdan {
    color: #1296db;
  }
  .icon-jinqian {
    color: #1afa29;
  }
  .box-card {
    margin-top: 30px;
  }
}
</style>