<template>
  <div class="article_container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      class="tablebox"
    >
      <el-table-column
        prop="ctime"
        label="发布日期"
        sortable
        width="180"
        :formatter="setDate"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        sortable
        width="auto"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row._id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="del(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import moment from "moment";
export default {
  inject: ["reload"],
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    setDate(row, column) {
      var newdate = row[column.property];
      if (newdate == undefined) {
        return "";
      }
      return moment(newdate).format("YYYY-MM-DD HH:MM:SS");
    },
    edit(id) {
      this.$router.push({
        path: "/admin/articleDetails",
        query: {
          id: id,
        },
      });
    },
    del(id) {
      this.$http.get("/api/admin/delById/" + id).then((res) => {
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
  },
  created() {
    this.$http.get("/api/admin/getAllArticle").then((res) => {
      if (res.data.status == 0) {
        this.tableData = res.data.articles;
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
</style>