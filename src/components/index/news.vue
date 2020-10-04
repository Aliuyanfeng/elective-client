<template>
  <div class="news_container">
    <div class="news_list">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4 @click="getDetails()">公共选修课补选</h4>
            <p>admin 发布于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getDetails() {
      this.$router.push("/main/news/newsdetails");
    },
  },
  created() {},
  components: {},
};
</script>
<style lang="less" soped>
.news_container {
  .news_list {
    
    padding: 10px;
    ul{
      padding: 0;
      margin: 0;
      h4{
        cursor: pointer;
      }
    }
  }
}
</style>