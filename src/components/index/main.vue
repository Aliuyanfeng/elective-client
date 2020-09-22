<template>
  <div id="app">
    <el-menu
      default-active="/main/home"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item>
        <h1>高校选课系统</h1>
      </el-menu-item>
      <el-menu-item index="/main/home">首页</el-menu-item>
      <el-menu-item index="/main/news">动态</el-menu-item>
      <el-menu-item index="/main/schedule">课表</el-menu-item>
      <el-menu-item index="/main/record">选课记录</el-menu-item>
      <el-menu-item index="/main/analyse">图表分析</el-menu-item>
      <el-row class="userInfo">
        <el-button type="primary">刘艳峰</el-button>
        <el-button type="primary" @click="logout">退出</el-button>
      </el-row>
    </el-menu>
    <router-view></router-view>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/public/footer.vue";
export default {
  data() {
    return {
      ip: "",
    };
  },
  methods: {
    logout() {
      window.location.href = "/";
    },
    
  },
  created() {},
  components: {
    Footer,
  },
  
};
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // border: 1px solid red;
  position: relative;
  .el-menu-item {
    h1 {
      margin: 0;
      line-height: 60px;
    }
  }
  .userInfo {
    // border: 1px solid red;
    line-height: 60px;
    width: 200px;
    position: absolute;
    right: 0;
  }
}
</style>
