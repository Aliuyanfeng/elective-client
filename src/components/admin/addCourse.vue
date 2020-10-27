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
      <el-form-item class="add_item" label="课程ID" prop="cid">
        <el-col :span="3">
          <el-input v-model="addForm.cid"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程名称" prop="cname">
        <el-col :span="4">
          <el-input v-model="addForm.cname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程分类" prop="classify">
        <el-row class="tl">
          <el-select
            placeholder="请选择分类"
            v-model="value"
            @change="checkModule"
          >
            <el-option
              v-for="(item, i) in classify"
              :key="i"
              :value="item.cname"
              >{{ item.cname }}</el-option
            >
          </el-select>
          <el-select
            placeholder="请选择模块"
            v-if="isShow"
            v-model="value2"
            @change="merge"
          >
            <el-option
              v-for="(item, i) in module"
              :key="i"
              :value="item.mname"
              >{{ item.mname }}</el-option
            >
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item class="add_item" label="课程老师" prop="teacher">
        <el-col :span="4"
          ><el-input v-model="addForm.teacher"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程学分" prop="credit">
        <el-col :span="4"
          ><el-input type="number" v-model="addForm.credit"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程学时" prop="period">
        <el-col :span="4"
          ><el-input type="number" v-model="addForm.period"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程地址" prop="address">
        <el-col :span="4"
          ><el-input v-model="addForm.address"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="最大选课人数" prop="maxnum">
        <el-col :span="4"
          ><el-input type="number" v-model="addForm.maxnum"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="开办学校" prop="school">
        <el-col :span="4">
          <el-input v-model="addForm.school"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="开办年份" prop="year">
        <el-col :span="4"><el-input v-model="addForm.year"></el-input></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程目标" prop="objective">
        <el-col :span="4"
          ><el-input type="textarea" v-model="addForm.objective"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程介绍" prop="introduce">
        <el-col :span="6">
          <el-input type="textarea" v-model="addForm.introduce"></el-input
        ></el-col>
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
  data() {
    return {
      //要添加的课程
      addForm: {
        cid: "K010313056",
        cname: "vue实战项目",
        introduce: "学习vue啊",
        teacher: "刘艳峰",
        classify: "",
        maxnum: "50",
        credit: "3",
        period: "20",
        address: "516",
        school: "哈尔滨信息工程学院",
        year: "2020秋",
        objective: "学习vue",
      },
      value: "",
      value2: "",
      //后台获取所有的分类
      classify: [],
      //联动需要的模块
      module: [],
      //后台获取所有的模块
      modules: [],
      //二级下拉显示默认隐藏
      isShow: false,
      addRules: {
        cid: [
          { required: true, message: "请输入课程ID", trigger: "blur" },
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        cname: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        introduce: [
          { required: true, message: "请输入课程介绍", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
        teacher: [
          { required: true, message: "请输入教师名字", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        classify: [
          { required: true, message: "请输入课程分类", trigger: "blur" },
        ],
        credit: [
          { required: true, message: "请输入课程学分", trigger: "blur" },
          { min: 1, max: 2, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        period: [
          { required: true, message: "请输入课程学时", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入上课地点", trigger: "blur" },
        ],
        school: [
          { required: true, message: "请输入开办学校", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        year: [
          { required: true, message: "请输入开办年份", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 4 到 5 个字符", trigger: "blur" },
        ],
        objective: [
          { required: true, message: "请输入课程分类", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    checkModule() {
      if (this.value) {
        this.isShow = true;
        this.module = [];
        for (let i = 0; i < this.modules.length; i++) {
          if (this.modules[i].pname == this.value)
            this.module.push(this.modules[i]);
        }
      } else {
        this.isShow = false;
      }
    },
    merge() {
      let classify = this.value + "（" + this.value2 + "）";
      this.addForm.classify = classify;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/api/admin/addCourse", this.addForm).then((res) => {
            if (res.data.status == 0) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.$router.push({
                path: "/admin/courseList",
              });
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
      });
  },
};
</script>
<style lang="less" scoped>
.tl {
  text-align: left;
}
</style>