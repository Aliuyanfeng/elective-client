<template>
  <div class="addCourse_container">
    <el-form
      label-width="80px"
      label-position="right"
      class="add_wrap"
      :model="currentCourse"
      :rules="addRules"
      ref="addForm"
    >
      <el-form-item class="add_item" label="课程ID" prop="cid">
        <el-col :span="3">
          <el-input v-model="currentCourse.cid"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程名称" prop="cname">
        <el-col :span="4">
          <el-input v-model="currentCourse.cname"></el-input>
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
          ><el-input v-model="currentCourse.teacher"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程学分" prop="credit">
        <el-col :span="4"
          ><el-input type="number" v-model="currentCourse.credit"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程学时" prop="period">
        <el-col :span="4"
          ><el-input type="number" v-model="currentCourse.period"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程地址" prop="address">
        <el-col :span="4"
          ><el-input v-model="currentCourse.address"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="最大选课人数" prop="maxnum">
        <el-col :span="4"
          ><el-input type="number" v-model="currentCourse.maxnum"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="适合范围" prop="scope">
        <el-row class="tl">
          <el-select placeholder="请选择适合范围" v-model="currentCourse.scope">
            <el-option
              v-for="(item, i) in institutes"
              :key="i"
              :value="item.iname"
              >{{ item.iname }}</el-option
            >
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item class="add_item" label="开办学校" prop="school">
        <el-col :span="4">
          <el-input v-model="currentCourse.school"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="开办年份" prop="year">
        <el-col :span="4"
          ><el-input v-model="currentCourse.year"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程目标" prop="objective">
        <el-col :span="4"
          ><el-input
            type="textarea"
            v-model="currentCourse.objective"
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item class="add_item" label="课程介绍" prop="introduce">
        <el-col :span="6">
          <el-input type="textarea" v-model="currentCourse.introduce"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="rsubmitForm('addForm')"
          >保存修改</el-button
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
      //路由传过来的id
      id: this.$route.query.id,
      //要添加的课程
      addForm: {
        cid: "",
        cname: "",
        introduce: "",
        teacher: "",
        classify: "",
        maxnum: "",
        credit: "",
        period: "",
        address: "",
        school: "",
        year: "",
        objective: "",
        scope: "",
      },
      //当前课程
      currentCourse: {},
      //类别
      value: "",
      //模块
      value2: "",
      //后台获取所有的分类
      classify: [],
      //后台获取所有学院
      institutes: [],
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
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        classify: [
          { required: true, message: "请输入课程分类", trigger: "blur" },
        ],
        scope: [
          { required: true, message: "请输入课程适合范围", trigger: "blur" },
        ],
        credit: [
          { required: true, message: "请输入课程学分", trigger: "blur" },
        ],
        period: [
          { required: true, message: "请输入课程学时", trigger: "blur" },
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
          {
            min: 7,
            max: 10,
            message: "长度在 7 到 10 个字符",
            trigger: "blur",
          },
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
    //合并后的分类
    merge() {
      let classify = this.value + "（" + this.value2 + "）";
      this.currentCourse.classify = classify;
    },
    rsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post("/api/admin/updateCourse", this.currentCourse)
            .then((res) => {
              if (res.data.status == 0) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.$router.push({
                  path: "/admin/courseList",
                });
              }
            });
          // console.log(this.currentCourse)
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
      .get("/api/admin/getCourseByCid/" + this.$route.query.id)
      .then((res) => {
        this.currentCourse = res.data.course;
        this.value = this.currentCourse.classify.slice(0, 2);
        this.value2 = this.currentCourse.classify.slice(3).slice(0, -1);
      });

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