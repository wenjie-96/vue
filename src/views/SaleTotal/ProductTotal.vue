<template>
  <div class="productTotal">
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
export default {
  data() {
    return {
      dateForm: {
        date1: ""
      }
    };
  },
  methods: {
    orderEcharts() {
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "降水量",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.orderEcharts();
  }
};
</script>

<style lang="less" scoped>
.productTotal {
  .el-form {
    margin-top: 20px;
    padding-bottom: 20px;
  }
}
</style>