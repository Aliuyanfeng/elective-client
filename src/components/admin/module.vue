<template>
  <div>
    <el-table :data="modules" style="width: 100%" max-height="100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        prop="mname"
        label="模块名称"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="pname"
        label="所属分类"
        width="200"
      ></el-table-column>

      <el-table-column fixed="right" label="操作">
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
    <el-button type="primary" @click="addVisible = true">新增模块</el-button>
    <!--编辑dialog -->
    <el-dialog
      title="修改分类"
      :visible.sync="editVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input type="text" v-model="moduleDetails.mname"></el-input>
      <el-select placeholder="请选择分类" v-model="moduleDetails.pname">
        <el-option
          v-for="(item, i) in AllClassify"
          :key="i"
          :value="item.cname"
          >{{ item.cname }}</el-option
        >
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保存 修改</el-button>
      </span>
    </el-dialog>
    <!--新增dialog -->
    <el-dialog
      title="修改分类"
      :visible.sync="addVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        type="text"
        v-model="addModule.mname"
        placeholder="请输入模块名称"
      ></el-input>
      <el-select placeholder="请选择所属分类" v-model="addModule.pname">
        <el-option
          v-for="(item, i) in AllClassify"
          :key="i"
          :value="item.cname"
          >{{ item.cname }}</el-option
        >
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">新 增</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      //下拉
      classify: "",
      //后台获取所有分类
      AllClassify: {},
      //后台获取所有模块
      modules: [],
      //新增dialog
      addVisible: false,
      //编辑dialog
      editVisible: false,
      //点击的模块详情
      moduleDetails: {},
      //要新增的模块
      addModule: {
        mname: "",
        pname: "",
      },
    };
  },
  methods: {
    edit(module) {
      this.editVisible = true;
      this.moduleDetails = module;
    },
    add() {
      console.log(this.addModule);
      this.$http.post("/api/admin/addModule", this.addModule).then((res) => {
        if (res.data.status == 0) {
          this.reload();
        }
      });
    },
    del(module) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.$http.get("/api/admin/delModule/" + module._id).then((res) => {
            if (res.data.status == 0) {
              this.reload();
            } else if (res.data.status == 409) {
              this.$message.error("没有权限!");
            }
          });
        })
        .catch((_) => {});
    },
    save() {
      console.log(this.moduleDetails);
      this.$http
        .post("/api/admin/updateModule", this.moduleDetails)
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
    this.$http
      .get("/api/admin/getAllModule")
      .then((res) => {
        if (res.data.status == 0) {
          this.modules = res.data.list;
          // console.log(res)
        }
      })
      .then(() => {
        this.$http.get("/api/admin/getAllClassify").then((res) => {
          if (res.data.status == 0) {
            this.AllClassify = res.data.list;
          }
        });
      });
  },
};
</script>
<style lang="less" scoped>
</style>