<template>
  <div id="admin">
    <el-container>
      <el-header
        >选课系统后台管理
        <el-row class="userInfo">
          <el-button type="primary">admin</el-button>
          <el-button type="primary" @click="logout">退出</el-button>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <Nav style="height: 100%"></Nav>
        </el-aside>
        <el-container>
          <el-main>
            <router-view v-if="isAlive"></router-view>
          </el-main>
          <el-footer>高校选课系统后台管理 - Powered By Aliuyanfeng V1.0</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Nav from "../admin/nav.vue";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isAlive: true,
    };
  },
  components: {
    Nav,
  },
  methods: {
    reload() {
      this.isAlive = false;
      this.$nextTick(() => {
        this.isAlive = true;
      });
    },
    logout() {
      sessionStorage.removeItem("adminToken");
      window.location.href = "/admin.html";
    },
  },
};
</script>
<style lang="less" scoped>
#admin {
  width: 100%;
  height: 100%;
  position: absolute;
  .el-container {
    height: 100%;
    .el-header,
    .el-footer {
      position: relative;
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
      .userInfo {
        position: absolute;
        z-index: 9;
        top: 0;
        right: 100px;
      }
    }
    .el-aside {
      background-color: #d3dce6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
    body > .el-container {
      margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
  }
}
</style>