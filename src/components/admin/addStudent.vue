<template>
  <div class="addCourse_container">
    <el-form
      label-width="80px"
      label-position="right"
      class="add_wrap"
      :model="addForm"
      :rules="addRules"
      ref="addForm"
    >
      <el-form-item class="add_item" label="学号" prop="sno">
        <el-col :span="3">
          <el-input v-model="addForm.sno"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="add_item" label="姓名" prop="username">
        <el-col :span="4">
          <el-input v-model="addForm.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="add_item" label="密码" prop="password">
        <el-col :span="4"
          ><el-input type="password" v-model="addForm.password"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="学院" prop="institute">
        <el-row style="text-align: left">
          <el-select
            placeholder="请选择学院"
            v-model="addForm.institute"
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
            v-model="addForm.major"
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
          <el-select placeholder="请选择班级" v-model="addForm.class">
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
          >立即添加</el-button
        >
        <el-button @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
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
      if (this.addForm.institute) {
        this.addForm.major = "";
        this.addForm.class = "";
        this.$http
          .get("/api/admin/getMajorByInstitute/" + this.addForm.institute)
          .then((res) => {
            if (res.data.status === 0) {
              this.majors = res.data.majors;
            }
          });
      }
    },
    checkClass() {
      if (this.addForm.major) {
        this.addForm.class = "";
        this.$http
          .get("/api/admin/getClassByMajor/" + this.addForm.major)
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
          this.$http.post("/api/admin/addStudent", this.addForm).then((res) => {
            if (res.data.status == 0) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.reload();
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
      .get("/api/admin/getAllClassify")
      .then((res) => {
        if (res.data.status === 0) {
          this.classify = res.data.list;
        }
      })
      .then(() => {
        this.$http.get("/api/admin/getAllModule").then((res) => {
          if (res.data.status === 0) {
            this.modules = res.data.list;
          }
        });
      })
      .then(() => {
        this.$http.get("/api/admin/getAllInstitute").then((res) => {
          if (res.data.status === 0) {
            this.institutes = res.data.institutes;
          }
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