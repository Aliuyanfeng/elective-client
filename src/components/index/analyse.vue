<template>
  <div class="analyse_container">
    <Aside style="float:left"></Aside>
    <div id="myChart"></div>
  </div>
</template>
<script>
import Aside from "../public/aside.vue";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
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
          title:{
              text:"Vue使用echarts",
              x:'center',
              y:'50px'
          },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "70%",
            roseType: "angle",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" },
            ],
          },
        ],
      });
    },
  },
  components: {
    Aside,
  },
};
</script>
<style lang="less" scoped>
.analyse_container {
  overflow: hidden;
  #myChart {
    width: 70%  ;
    height: 700px;
    float: right;
    
  }
}
</style>