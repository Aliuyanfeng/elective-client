<template>
  <div class="home_container">
    <Aside style="float:left"></Aside>
    <div class="course_container" style="float:right">
      <h3>已选课程</h3>
      <el-table :data="selectedcourse" style="width: 100%" max-height="250">
        <el-table-column fixed prop="cid" label="#" width="50"></el-table-column>
        <el-table-column prop="classify" label="课程类别" width="200"></el-table-column>
        <el-table-column prop="cname" label="课程名称" width="200"></el-table-column>
        <el-table-column prop="teacher" label="任课老师" width="100"></el-table-column>
        <el-table-column prop="period" label="学时" width="50"></el-table-column>
        <el-table-column prop="credit" label="学分" width="50"></el-table-column>
        <el-table-column prop="address" label="时间地点" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="del(scope.row._id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <hr />
      <h3>搜索</h3>
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="课程名称">
          <el-input v-model="formSearch.cname" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchByName">查询</el-button>
        </el-form-item>
        <el-form-item label="任课教师">
          <el-input v-model="formSearch.teacher" placeholder="请输入任课教师"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchByTeacher">查询</el-button>
        </el-form-item>
      </el-form>
      <hr />
      <h3>所有课程</h3>
      <el-table :data="selectedcourse" style="width: 100%" max-height="250">
        <el-table-column fixed prop="cid" label="#" width="50"></el-table-column>
        <el-table-column prop="classify" label="课程类别" width="200"></el-table-column>
        <el-table-column prop="cname" label="课程名称" width="200"></el-table-column>
        <el-table-column prop="teacher" label="任课老师" width="100"></el-table-column>
        <el-table-column prop="period" label="学时" width="50"></el-table-column>
        <el-table-column prop="credit" label="学分" width="50"></el-table-column>
        <el-table-column prop="address" label="时间地点" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="check(scope.row._id)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Aside from "../public/aside.vue";
export default {
  data() {
    return {
      formSearch: {
        cname: "",
        teacher: "",
      },
      selectedcourse: [
        {
          cid: "100",
          classify: "艺术与文化",
          cname: "音乐鉴赏",
          teacher: "刘艳峰",
          period: "12",
          credit: "3",
          address: "A座211 周一56节",
        },
      ],
    };
  },
  components: {
    Aside,
  },
  methods:{
    del(id){
      console.log('del')
    },
    searchByName(name){
      console.log('chaxun')
    },
    searchByTeacher(name){
      console.log('chaxun2')
    },
    check(id){
      console.log('check')
    }
  }
};
</script>
<style lang="less" scoped>
.home_container {
  // border: 1px solid blue;
  overflow: hidden;
  .course_container {
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    width: 70%;
    
  }
}
</style>