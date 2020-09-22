<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像-->
      <div class="avatar">
        <img src="@/assets/logo.png" alt />
      </div>
      <!-- 表单 -->
      <el-form label-width="0px" class="login-form">
        <el-form-item>
          <el-input placeholder="管理员" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="alogin">管理员登陆</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/components/public/footer.vue";
export default {
  data() {
    return {};
  },
  methods: {
    alogin() {
      this.$router.push("/admin");
    },
  },
};
</script>
<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar {
      //   border: 1px solid #3c33c3;
      padding: 10px;
      border-radius: 50% 50%;
      width: 130px;
      height: 130px;
      box-shadow: 0 0 10px #dddddd;
      position: absolute;
      left: 50%;
      margin-left: -65px;
      margin-top: -65px;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50% 50%;
        background-color: #eeeeee;
      }
    }
    .login-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>