<template>
  <div class="news_container">
    <Aside style="float:left"></Aside>
    <div class="news_list" style="float:right">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>公共选修课补选</h4>
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
import Aside from "../public/aside.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    Aside,
  },
};
</script>
<style lang="less" soped>
.news_container{
    overflow: hidden;
    .news_list{
        // border: 1px solid red;
        width: 70%;
        padding: 10px;
    }
}
</style>