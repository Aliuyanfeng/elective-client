<template>
  <div class="studentList_container">
    <el-table :data="tables" style="width: 100%" max-height="100%">
      <!-- el-table v-loading 可以加载动画 -->
      <el-table-column
        fixed
        type="index"
        label="#"
        width="105"
      ></el-table-column>
      <el-table-column prop="sno" label="学号" width="200"></el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="100"
      ></el-table-column>
      <el-table-column prop="class" label="班级" width="150"></el-table-column>
      <el-table-column prop="major" label="专业" width="150"></el-table-column>
      <el-table-column prop="institute" label="学院" width="150">
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row.sno)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row._id)"
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
      //所有学生数据
      studentData: {},
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 20,
      // 共几页
      pageNum: null,
      // 当前显示的数据
      dataShow: [],
      // 默认当前显示第一页
      currentPage: 0,
      //关键词
      search: "",
    };
  },
  methods: {
    edit(sno) {
      console.log(sno);

      this.$router.push({
        path: "/admin/studentEdit",
        query: {
          sno: sno,
        },
      });
    },
    del(id) {
      // console.log(id)
      this.$http.get("/api/admin/delStudent/" + id).then((res) => {
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
    this.$http.get("/api/admin/getAllStudent").then((res) => {
      if (res.data.status === 0) {
        this.studentData = res.data.students;
        //计算页数
        this.pageNum = Math.ceil(this.studentData.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = this.studentData.slice(
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
  computed: {
    tables() {
      const keyword = this.search;
      if (keyword) {
        return this.studentData.filter((data) => {
          console.log(data);
          return Object.keys(data).some((key) => {
            // console.log(key)
            console.log(String(data[key]));
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
</style>