<template>
  <div class="schedule_container">
  
    <div class="schedule_wrap">
      <el-table :data="tableData" border stripe style="width: 100%;" class="table">
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
   
  },
};
</script>
<style lang="less" scoped>
.schedule_container {

  .schedule_wrap {
    margin-top: 20px;
    .table {
      padding: 10px;
    
    }
  }
}
</style>