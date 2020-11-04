<template>
  <div class="step_contianer">
    <el-button @click="backUp">一键备份</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    backUp() {
      this.$http.get("/api/upload/dataBackup").then((res) => {
        if (res.data.status == 0) {
          this.$message({
            message: "已成功备份至D:\\mongodump",
            type: "success",
          });
        }
      });
    },
  },
  created() {
    // this.auto();
  },
};
</script>
<style lang="less" scoped>
.step_contianer {
  position: relative;
  .step {
    position: absolute;
    width: 50%;
    transform: translate(50%);
  }
}
</style>