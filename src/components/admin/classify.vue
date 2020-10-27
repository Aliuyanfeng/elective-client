<template>
  <div>
    <el-table :data="classify" style="width: 100%" max-height="100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        prop="cname"
        label="分类名称"
        width="200"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row)"
            icon="el-icon-edit"
            circle
          ></el-button>
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
    <el-divider content-position="center">到底啦</el-divider>

    <el-button type="primary" @click="addVisible = true">新增分类</el-button>
    <!--编辑dialog -->
    <el-dialog
      title="修改分类"
      :visible.sync="editVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input type="text" v-model="classifyDetails.cname"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保存 修改</el-button>
      </span>
    </el-dialog>
    <!--新增dialog -->
    <el-dialog
      title="添加分类"
      :visible.sync="addVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input type="text" v-model="addClassify.cname"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      classify: [],
      classifydata: [],
      editVisible: false,
      addVisible: false,
      classifyDetails: {},
      addClassify: {
        cname: "",
        value: 0,
      },
    };
  },
  methods: {
    edit(course) {
      this.editVisible = true;
      this.classifyDetails = course;
    },
    add() {
      this.addVisible = true;
      this.$http
        .post("/api/admin/addClassify", this.addClassify)
        .then((res) => {
          if (res.data.status == 0) this.reload();
        });
    },
    del(course) {
      this.$confirm("确认删除？")
        .then(() => {
          this.$http.get("/api/admin/delClassify/" + course._id).then((res) => {
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
        })
        .catch((_) => {
          console.log("没删除");
        });
    },
    save() {
      console.log(this.classifyDetails);
      this.$http
        .post("/api/admin/updateClassify", this.classifyDetails)
        .then((res) => {
          if (res.data.status == 0) {
            this.reload();
          }
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  created() {
    this.$http.get("/api/admin/getAllClassify").then((res) => {
      if (res.data.status == 0) {
        this.classify = res.data.list;
        // console.log(res)
      }
    });
  },
};
</script>
<style lang="less">

</style>