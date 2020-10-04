<template>
  <div class="record_container">
    <div class="record_wrap">
      <h3>选课记录</h3>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        class="table"
      >
        <el-table-column prop="cname" label="#" width="180"></el-table-column>
        <el-table-column
          prop="teacher"
          label="课程名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="time" label="操作过程"></el-table-column>
        <el-table-column prop="address" label="操作IP"></el-table-column>
        <el-table-column prop="class" label="操作时间"></el-table-column>
        <el-table-column prop="remarks" label="详情"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        
      ],
    };
  },
  methods: {
    getIp() {
      const cip = returnCitySN["cip"];
      this.ip = cip;
    },
  },
  components: {},
  mounted() {
    this.getIp();
  },
};
</script>
<style lang="less" scoped>
</style>