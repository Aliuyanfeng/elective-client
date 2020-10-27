<template>
  <div class="article_container">
    <el-table
      class="course"
      :data="dataShow"
      style="width: 100%"
      max-height="100%"
    >
      <!-- el-table v-loading 可以加载动画 -->
      <el-table-column fixed prop="cid" label="#" width="105"></el-table-column>
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
      <el-table-column prop="period" label="学时" width="50"></el-table-column>
      <el-table-column prop="credit" label="学分" width="50"></el-table-column>
      <el-table-column
        prop="address"
        label="时间地点"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="scope"
        label="适合范围"
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
            type="primary"
            size="small"
            @click="edit(scope.row.cid)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.cid)"
            icon="el-icon-delete"
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
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      //所有课程数据
      courseData: [],
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 15,
      // 共几页
      pageNum: null,
      // 当前显示的数据
      dataShow: [],
      // 默认当前显示第一页
      currentPage: 0,
    };
  },
  methods: {
    edit(cid) {
      // this.$router.push("/admin/courseList/courseEdit.vue");
      this.$router.push({
        path: "/admin/courseEdit",
        query: {
          id: cid,
        },
      });
    },
    del(cid) {
      // console.log(cid)
      this.$http.get("/api/admin/delCourse/" + cid).then((res) => {
        if (res.data.status == 0) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.reload();
        } else if (res.data.status == 409) {
          this.$message.error("没有权限!");
        }
      });
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
      if (res.data.status === 0) {
        this.courseData = res.data.courses;
        //给所有课程计算选课进度
        for (let j = 0; j < this.courseData.length; j++) {
          this.courseData[j].per =
            (this.courseData[j].selnum / this.courseData[j].maxnum) * 100;
        }
        //计算页数
        this.pageNum = Math.ceil(this.courseData.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = this.courseData.slice(
            this.pageSize * i,
            this.pageSize * (i + 1)
          );
        }
        //默认显示第一页
        this.dataShow = this.totalPage[this.currentPage];
        this.loading = false;
      }
    });
  },
};
</script>
<style lang="less">
.tablebox {
  th {
    padding: 0 !important;
    height: 80px !important;
    line-height: 80px;
  }
  td {
    padding: 0 !important;
    height: 50px;
    line-height: 50px;
  }
}
.el-main {
  line-height: 24px !important;
}
</style>