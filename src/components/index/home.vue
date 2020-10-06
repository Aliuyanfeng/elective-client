<template>
  <div class="home_container">
    <div class="course_container">
      <h3>已选课程</h3>
      <el-table
        :data="selectedcourse"
        style="width: 100%"
        max-height="100%"
      >
        <el-table-column
          fixed
          prop="cid"
          label="#"
          width="105"
        ></el-table-column>
        <el-table-column
          prop="classify"
          label="课程类别"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="cname"
          label="课程名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="teacher"
          label="任课老师"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="period"
          label="学时"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="credit"
          label="学分"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="时间地点"
          width="200"
        ></el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              @click="del(scope.row)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <hr />
      <h3>搜索</h3>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键字搜索">
          <el-input v-model="keywords" placeholder="请输入课程名称"></el-input>
        </el-form-item>
      </el-form>
      <hr />
      <h3>所有课程</h3>
      <el-table
        v-loading="loading"
        :data="tables"
        style="width: 100%"
        max-height="100%"
      >
        <el-table-column
          fixed
          prop="cid"
          label="#"
          width="105"
        ></el-table-column>
        <el-table-column
          prop="classify"
          label="课程类别"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="cname"
          label="课程名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="teacher"
          label="任课老师"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="period"
          label="学时"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="credit"
          label="学分"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="时间地点"
          width="150"
        ></el-table-column>
        <el-table-column label="所选人数" width="150">
          <template slot-scope="scope">
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="scope.row.per"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="check(scope.row)"
              icon="el-icon-circle-plus-outline"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="pageNum"
        @current-change="currentChange"
        @prev-click="prePage()"
        @next-click="nextPage()"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      sno: this.$route.query.user,
      //搜索关键字
      keywords: "",
      //后台传过来的所有课程
      Allcourse: [],
      //学生已选课程
      selectedcourse: [],
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 10,
      // 共几页
      pageNum: null,
      // 当前显示的数据
      dataShow: [],
      // 默认当前显示第一页
      currentPage: 0,
      //选课提交
      currentCourse: {},
      //加载提示
      loading: true,
    };
  },
  components: {},
  methods: {
    async del(course) {
      console.log(course);
      await this.$http.post("/api/delSelectedCourse", course).then((res) => {
        if (res.data.status == 0) {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
        }
      });
      await this.$http.get("/api/getSelectedCourse/" + this.sno).then((res) => {
        this.selectedcourse = res.data.selCourse;
      });
      await this.reload();
    },
    Finddup(course) {
      return course.cid == this.currentCourse.cid;
    },
    check(course) {
      this.currentCourse = course;
      delete this.currentCourse._id;
      this.currentCourse.sno = this.$route.query.user;
      console.log(course);
      var flag = this.selectedcourse.findIndex(this.Finddup) == -1;
      if (course.per !== 100) {
        if (flag === true) {
          this.$http
            .post("/api/selectCourse", this.currentCourse)
            .then((res) => {
              this.$message({
                message: "选课成功！",
                type: "success",
              });
            });
          this.reload();
          this.$http.get("/api/getSelectedCourse/" + this.sno).then((res) => {
            this.selectedcourse = res.data.selCourse;
            this.loading = false;
          });
        } else {
          this.$message({
            message: "不可以重复！",
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: "人数已满！",
          type: "warning",
        });
      }
    },
    currentChange(current) {
      // this.currentPage = current;
      this.dataShow = this.totalPage[current - 1];
    },
    nextPage() {
      if (this.currentPage === this.pageNum - 1) return;
      this.dataShow = this.totalPage[++this.currentPage];
    },
    prePage() {
      if (this.currentPage === 0) return;
      this.dataShow = this.totalPage[--this.currentPage];
    },
  },
  created() {
    this.$http.get("/api/getAllCourse").then((res) => {
      console.log(res.data.courses);
      this.Allcourse = res.data.courses;
      this.loading = !this.loading;
      //给所有课程计算选课进度
      for (let j = 0; j < this.Allcourse.length; j++) {
        this.Allcourse[j].per =
          (this.Allcourse[j].selnum / this.Allcourse[j].maxnum) * 100;
      }
      //计算页数
      this.pageNum = Math.ceil(this.Allcourse.length / this.pageSize) || 1;
      for (let i = 0; i < this.pageNum; i++) {
        this.totalPage[i] = this.Allcourse.slice(
          this.pageSize * i,
          this.pageSize * (i + 1)
        );
      }
      //默认显示第一页
      this.dataShow = this.totalPage[this.currentPage];
    });
    this.$http.get("/api/getSelectedCourse/" + this.sno).then((res) => {
      this.selectedcourse = res.data.selCourse;
      this.loading = false;
    });
  },
  computed: {
    tables() {
      const keyword = this.keywords;
      if (keyword) {
        return this.Allcourse.filter((data) => {
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(keyword) > -1;
          });
        });
      }
      return this.dataShow;
    },
  },
};
</script>
<style lang="less" scoped>
.home_container {
  .course_container {
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
}
</style>