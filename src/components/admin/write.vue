<template>
  <div id="container">
    <el-form ref="form" :model="form">
      <el-form-item label="发布标题:">
        <el-col :span="6">
          <el-input clearable class="titlebox" v-model="form.title"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="发布内容">
        <mavon-editor
          ref="md"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
        ></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">发布文章</el-button>
      </el-form-item>
    </el-form>

    <!-- <article v-html="myhtml"></article> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: "这是一篇测试文章",
        ctime: new Date(),
        content: "",
        mcontent: "",
      },
      options: [],
      //校检规则
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
    // handle(value, render) {
    //   this.myhtml = render;
    //   console.log(value, render);
    // },
    open3() {
      this.$message({
        message: "表单任何一项不能为空",
        type: "warning",
      });
    },
    open2() {
      this.$message({
        message: "发布成功，快去看看吧！",
        type: "success",
      });
    },
    async submit() {
      this.form.content = this.$refs.md.d_render;
      this.form.mcontent = this.$refs.md.d_value;

      if (
        this.form.content.trim().length <= 0 ||
        this.form.title.trim().length <= 0
      )
        return this.open3();
      console.log(this.form);
      const { data } = await this.$http.post("/api/admin/write", this.form);
      if (data.status === 0) {
        this.open2();
        // 发布文章之后 重定向到文章列表
        this.$router.push({
          path: "/admin/articleList",
        });
      }
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
.titlebox {
  width: 500px;
}
</style>