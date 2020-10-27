<template>
  <div class="container">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      style="height: 100%"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文章模块</span>
        </template>
        <router-link to="/admin/articleList">
          <el-menu-item index="1-1">文章列表</el-menu-item>
        </router-link>
        <router-link to="/admin/write">
          <el-menu-item index="1-2">发布文章</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>课程管理</span>
        </template>
        <router-link to="/admin/courseList">
          <el-menu-item index="2-1">课程列表</el-menu-item>
        </router-link>
        <router-link to="/admin/addCourse">
          <el-menu-item index="2-2">添加课程</el-menu-item>
        </router-link>
        <router-link to="/admin/addManyCourse">
          <el-menu-item index="2-3">批量导入</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>分类管理</span>
        </template>
        <router-link to="/admin/classify">
          <el-menu-item index="3-1">分类管理</el-menu-item>
        </router-link>
        <router-link to="/admin/module">
          <el-menu-item index="3-2">模块管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>学生管理</span>
        </template>
        <router-link to="/admin/studentList">
          <el-menu-item index="4-1">学生列表</el-menu-item>
        </router-link>
        <router-link to="/admin/addStudent">
          <el-menu-item index="4-2">添加学生</el-menu-item>
        </router-link>
        <router-link to="/admin/addManyStudent">
          <el-menu-item index="4-3">批量导入</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统管理</span>
        </template>
        <router-link to="/admin/dataBackUp">
          <el-menu-item index="5-1">数据备份</el-menu-item>
        </router-link>
        <router-link to="/admin/dataExport">
          <el-menu-item index="5-2">数据导出</el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
a {
  text-decoration: none;
}
</style>