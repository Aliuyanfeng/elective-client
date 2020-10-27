<template>
  <div id="container">
    <el-form ref="form" :model="nform">
      <el-form-item label="发布标题:">
        <el-col :span="6">
          <el-input
            clearable
            class="titlebox"
            v-model="currentArticle.title"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="发布内容">
        <mavon-editor
          ref="md"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
          v-model="currentArticle.mcontent"
        ></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="rsubmit()">重新发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nform: {
        id: "",
        title: "",
        ctime: new Date(),
        content: "",
        mcontent: "",
      },
      options: [],
      id: this.$route.query.id,
      currentArticle: {},
    };
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      this.img_file[pos] = $file;
      this.$http({
        url: "/api/edit/uploadimg",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        let _res = res.data;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    open3() {
      this.$message({
        message: "表单任何一项不能为空",
        type: "warning",
      });
    },
    async rsubmit() {
      this.nform.content = this.$refs.md.d_render;
      this.nform.mcontent = this.$refs.md.d_value;
      this.nform.ctime = new Date();
      this.nform.title = this.currentArticle.title;
      this.nform.id = this.currentArticle._id

      if (
        this.nform.content.trim().length <= 0 ||
        this.nform.title.trim().length <= 0
      )
        return this.open3();
      const { data } = await this.$http.post("/api/admin/updateArticle", this.nform);
      if (data.status === 0) {
        this.$message({
          message: "发布成功，快去看看吧！",
          type: "success",
        });
        // 发布文章之后 重定向到文章列表
        this.$router.push({
          path: "/admin/articleList",
        });
      }
    },

    async getArticleDetails() {
      await this.$http
        .get("/api/admin/getArticleById/" + this.id)
        .then((res) => {
          if (res.data.status == 0) {
            this.currentArticle = res.data.article;
          }
        });
    },
  },
  created() {
    this.getArticleDetails();
  },
};
</script>
<style lang="less" scoped>
.titlebox {
  width: 500px;
}
</style>