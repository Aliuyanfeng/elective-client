<template>
  <div class="analyse_container">
    <div id="myChart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      cdata: [],
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
        title: {
          text: "选课分类数据统计",
          x: "center",
          y: "50px",
        },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: "{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "选课人数",
            type: "pie",
            radius: "70%",
            roseType: "angle",
            data: [],
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      myChart.showLoading();
      this.$http.get("/api/getClassifyData").then((res) => {
        if (res.data.status === 0) {
          console.log(res.data.classify);
          var classify = res.data.classify;
          for (var i = 0; i < classify.length; i++) {
            delete classify[i]._id;

            this.cdata.push(classify[i]);
          }
          console.log(this.cdata);

          var optionClassify = {
            series: [
              {
                name: "选课人数",
                type: "pie",
                radius: "70%",
                roseType: "angle",
                data: this.cdata,
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      formatter: "{b} : {c} ({d}%)",
                      textStyle: {
                        //数值样式
                        fontSize: 16,
                      },
                    },
                    labelLine: { show: true },
                  },
                },
              },
            ],
          };
          myChart.setOption(optionClassify);
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