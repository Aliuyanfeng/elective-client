<template>
  <div class="schedule_container">
    <Aside style="float:left"></Aside>
    <div class="schedule_wrap">
      <el-table :data="tableData" border stripe style="width: 70%;" class="table">
        <el-table-column prop="cname" label="课程" width="180"></el-table-column>
        <el-table-column prop="teacher" label="教师" width="180"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Aside from "../public/aside.vue";

export default {
  data() {
    return {
      tableData: [
        {
          cname: "音乐赏析",
          teacher: "梅久芳",
          time: "第一周56节",
          address: "A101",
          class: "软件17h01-软件17h03",
          remarks: "抽查",
        },
        {
          cname: "音乐赏析",
          teacher: "梅久芳",
          time: "第一周56节",
          address: "A101",
          class: "软件17h01-软件17h03",
          remarks: "抽查",
        },
        {
          cname: "音乐赏析",
          teacher: "梅久芳",
          time: "第一周56节",
          address: "A101",
          class: "软件17h01-软件17h03",
          remarks: "抽查",
        },
        {
          cname: "音乐赏析",
          teacher: "梅久芳",
          time: "第一周56节",
          address: "A101",
          class: "软件17h01-软件17h03",
          remarks: "抽查",
        },
        {
          cname: "音乐赏析",
          teacher: "梅久芳",
          time: "第一周56节",
          address: "A101",
          class: "软件17h01-软件17h03",
          remarks: "抽查",
        },
        {
          cname: "音乐赏析",
          teacher: "梅久芳",
          time: "第一周56节",
          address: "A101",
          class: "软件17h01-软件17h03",
          remarks: "抽查",
        },
      ],
    };
  },
  components: {
    Aside,
  },
};
</script>
<style lang="less" scoped>
.schedule_container {
  overflow: hidden;
  .schedule_wrap {
    .table {
      padding: 10px;
      float: right;
    }
  }
}
</style>