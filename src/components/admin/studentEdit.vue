<template>
  <div class="addCourse_container">
    <el-form
      label-width="80px"
      label-position="right"
      class="add_wrap"
      :model="student"
      :rules="addRules"
      ref="addForm"
    >
      <el-form-item class="add_item" label="学号" prop="sno">
        <el-col :span="3">
          <el-input v-model="student.sno"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="add_item" label="姓名" prop="username">
        <el-col :span="4">
          <el-input v-model="student.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="add_item" label="密码" prop="password">
        <el-col :span="4"
          ><el-input type="password" v-model="student.password"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="学院" prop="institute">
        <el-row style="text-align: left">
          <el-select
            placeholder="请选择学院"
            v-model="student.institute"
            @change="checkMajor"
          >
            <el-option
              v-for="(item, i) in institutes"
              :key="i"
              :value="item.iname"
              >{{ item.iname }}</el-option
            >
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item class="add_item" label="专业" prop="major">
        <el-row style="text-align: left">
          <el-select
            placeholder="请选择专业"
            v-model="student.major"
            @change="checkClass"
          >
            <el-option
              v-for="(item, i) in majors"
              :key="i"
              :value="item.mname"
              >{{ item.mname }}</el-option
            >
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item class="add_item" label="班级" prop="class">
        <el-row style="text-align: left">
          <el-select placeholder="请选择班级" v-model="student.class">
            <el-option
              v-for="(item, i) in classes"
              :key="i"
              :value="item.cname"
              >{{ item.cname }}</el-option
            >
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addForm')"
          >保存 修改</el-button
        >
        <el-button @click="resetForm('addForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      sno: this.$route.query.sno,
      //当前学生
      student: {},
      //要添加的学生
      addForm: {
        sno: "",
        username: "",
        password: "888888",
        class: "",
        major: "",
        institute: "",
      },
      classes: [],
      institutes: [],
      majors: [],
      addRules: {
        sno: [
          { required: true, message: "请输入学号", trigger: "blur" },
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
    };
  },
  methods: {
    checkMajor() {
      if (this.student.institute) {
        this.student.major = "";
        this.student.class = "";
        this.$http
          .get("/api/admin/getMajorByInstitute/" + this.student.institute)
          .then((res) => {
            if (res.data.status === 0) {
              this.majors = res.data.majors;
            }
          });
      }
    },
    checkClass() {
      if (this.student.major) {
        this.student.class = "";
        this.$http
          .get("/api/admin/getClassByMajor/" + this.student.major)
          .then((res) => {
            if (res.data.status === 0) {
              this.classes = res.data.classes;
            }
          });
      }
    },
    merge() {
      let classify = this.value + "（" + this.value2 + "）";
      this.addForm.classify = classify;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/api/admin/updateStudent", this.student).then((res) => {
            if (res.data.status == 0) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.$router.go(-1);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.$http
      .get("/api/admin/getAllInstitute")
      .then((res) => {
        if (res.data.status === 0) {
          this.institutes = res.data.institutes;
        }
      })
      .then(() => {
        this.$http
          .get("/api/getStudentInfo/" + this.$route.query.sno)
          .then((res) => {
            if (res.data.status === 0) {
              this.student = res.data.student;
            }
            this.$http
              .get("/api/admin/getMajorByInstitute/" + this.student.institute)
              .then((res) => {
                if (res.data.status === 0) {
                  this.majors = res.data.majors;
                }
              })
              .then((res) => {
                this.$http
                  .get(
                    "/api/admin/getClassByMajor/" + this.student.major
                  )
                  .then((res) => {
                    if (res.data.status === 0) {
                      this.classes = res.data.classes;
                    }
                  });
              });
          });
      });
  },
};
</script>
<style lang="less" scoped>
.tl {
  text-align: left;
}
</style>