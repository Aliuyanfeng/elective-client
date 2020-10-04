<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像-->
      <div class="avatar">
        <img src="@/assets/logo.png" alt />
      </div>
      <!-- 表单 -->

      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item prop="sno">
          <el-input
            placeholder="用户名"
            v-model="loginForm.sno"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login('loginFormRef')"
            >学生登陆</el-button
          >
          <el-button type="info" @click="reset">重置</el-button>
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
    return {
      loginForm: {
        sno: "20712420006",
        password: "888888",
      },
      loginFormRules: {
        sno: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
          {
            min: 10,
            max: 15,
            message: "长度在 10 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 10 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    loginFail() {
      this.$message({
        message: "账号或密码错误",
        type: "warning",
      });
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/api/login", this.loginForm).then((res) => {
            console.log(res.data);
            if (res.data.status === 0) {
              localStorage.setItem("studentToken", res.data.token);
              this.$message({
                message: "欢迎您，" + res.data.user.username,
                type: "success",
              });
              this.$router.push({
                path: "/main",
                query: {
                  user: res.data.user.sno,
                },
              });
            } else if (res.data.status === 1) {
              this.loginFail();
            } else {
              console.log(res.data.msg);
              return false;
            }
          });
        } else {
          this.Checkfailure();
        }
      });
    },
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    Checkfailure() {
      this.$message.error("休想逃过预校检");
    },
  },
  created() {},
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