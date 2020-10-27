<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :auto-upload="false"
      :limit="1"
      :http-request="submitUpload"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
    </el-upload>
    
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {};
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitUpload() {
      const formData = new FormData();
      const file = this.$refs.upload.uploadFiles[0];
      const headerConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      if (!file) {
        // 若未选择文件
        this.$message.error("请选择文件!");
        return;
      }
      formData.append("file", file.raw);
      this.$http
        .post("/api/upload/uploadStudent", formData, headerConfig)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.reload();
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>

</style>