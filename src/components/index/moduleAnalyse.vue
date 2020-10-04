<template>
  <div class="analyse_container">
    <div id="myChart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataAxis: [],
      mdata: [],
      value: [],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        color: ["#3398DB"],
        title: {
          text: "选课模块数据统计",
          x: "center",
          y: "10px",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: false,
        },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b}: {c}",
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: { interval: 0 },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [],
          },
        ],
      });
      myChart.showLoading();
      this.$http.get("/api/getModuleData").then((res) => {
        if (res.data.status === 0) {
          console.log(res.data.module);
          var modules = res.data.module;
          for (var i = 0; i < modules.length; i++) {
            delete modules[i]._id;
            this.dataAxis.push(modules[i].name);
            this.mdata.push(modules[i]);
            this.value.push(modules[i].value);
          }
          myChart.setOption({
            xAxis: [
              {
                type: "category",
                data: this.dataAxis,
                axisTick: {
                  alignWithLabel: true,
                },
              },
            ],
            series: [
              {
                name: "模块统计",
                type: "bar",
                barWidth: "60%",
                data: this.mdata,
                itemStyle: {
                  normal: {
                    label: {
                      show: true, //开启显示
                      position: "top", //在上方显示
                      textStyle: {
                        //数值样式
                        color: "black",
                        fontSize: 16,
                      },
                    },
                  },
                },
              },
            ],
          });
          myChart.hideLoading();
        }
      });
    },
  },
  components: {},
};
</script>
<style lang="less" scoped>
.analyse_container {
  #myChart {

    width: 100%;
    height: 700px;
  }
}
</style>