
<template>
  <div>
    <!-- 导出按钮 -->
    <el-button type="primary" @click="exportCourse">导出课程</el-button>
    <el-button type="primary" @click="exportStudent">导出学生</el-button>
    <el-button type="primary">导出已选课程</el-button>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },

  methods: {
    exportCourse() {
      window.location.href = "/api/upload/exportCourse";
    },
    exportStudent() {
      window.location.href = "/api/upload/exportStudent";
    },
  },
  created() {},
};
</script>


<style scoped>
</style>
